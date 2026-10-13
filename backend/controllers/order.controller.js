import mongoose from "mongoose";
import crypto from "crypto"
import Order from "../models/order.model.js"
import Product from "../models/product.model.js";
import User from "../models/customer.model.js";
import Razorpay from "razorpay"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const createPaymentOrder = async (req, res) => {
    try {
        const { shippingAddress } = req.body
        const cart = req.user.cart

        if (!cart || cart.length == 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            })
        }
        const orderItems = []
        let totalAmount = 0

        for (const cartItem of cart) {

            const product = await Product.findById(cartItem.product);

            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: "Product in cart no longer exists"
                });
            }

            if (cartItem.quantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`
                });
            }

            orderItems.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: cartItem.quantity,
                image: product.image
            });

            totalAmount += product.price * cartItem.quantity;
        }

        if (
            !shippingAddress ||
            !shippingAddress.fullName ||
            !shippingAddress.phone ||
            !shippingAddress.addressLine1 ||
            !shippingAddress.city ||
            !shippingAddress.state ||
            !shippingAddress.pincode
        ) {
            return res.status(400).json({
                success: false,
                message: "All shipping address fields are required"
            });
        }

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            shippingAddress,
            totalAmount,
            paymentStatus: "PENDING",
            status: "PENDING_PAYMENT"
        });

        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(totalAmount * 100),
            currency: "INR",
            receipt: order._id.toString()
        });

        order.razorpayOrderId = razorpayOrder.id;
        await order.save();

        return res.status(201).json({
            success: true,
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            keyId: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Crashed" })
    }
};

export const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment verification details are missing"
            });
        }

        const order = await Order.findOne({
            razorpayOrderId: razorpay_order_id,
            user: req.user._id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            order.paymentStatus = "FAILED";
            await order.save();

            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });
        }

        order.paymentStatus = "PAID";
        order.status = "PLACED";
        order.razorpayPaymentId = razorpay_payment_id;

        await order.save();

        req.user.cart = [];
        await req.user.save();

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            orderId: order._id
        });

    } catch (error) {
        console.log("Payment verification error:", error);

        return res.status(500).json({
            success: false,
            message: "Payment verification failed"
        });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.log("Get orders error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders"
        });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.log("Get order by ID error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch order"
        });
    }
};
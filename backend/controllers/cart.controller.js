import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
    try {
        const { productId } = req.params
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid Product Id" })
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        if (product.stock < 1) {
            return res.status(400).json({ message: "Product is out of stock" })
        }
        const cartItem = req.user.cart.find(
            item => item.product.toString() === productId
        )
        if (cartItem) {
            if (cartItem.quantity >= product.stock) {
                return res.status(400).json({ message: "Cannot add more than available stock" })
            }
        } else {
            req.user.cart.push({
                product: productId,
                quantity: 1
            })
        }

        await req.user.save()
        return res.status(201).json({ message: "Product added to cart" })
    } catch (error) {
        res.status(500).json({ message: "Internal server crashed" })
    }
}

export const getCart = async (req, res) => {
    try {
        const user = await req.user.populate("cart.product")
        return res.status(200).json({
            success: true,
            cart: user.cart
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server crashed" })
    }
}

export const updateCartQuantity = async (req, res) => {
    try {
        const { productId } = req.params
        const { quantity } = req.body

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid Product Id" })
        }
        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({ message: "Quantity must be atleast 1" })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        if (quantity > product.stock) {
            return res.status(400).json({ message: "Quantity exceeds available stock" })
        }

        const cartItem = req.user.cart.find(
            item => item.product.toString() === productId
        )

        if (!cartItem) {
            return res.status(404).json({ message: "Product not found in the cart" })
        }
        cartItem.quantity = quantity
        await req.user.save()

        res.status(200).json({ message: "Cart quantity updated" })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server crashed"
        });
    }
}

export const removeFromCart = async (req, res) => {
    try {

        const { productId } = req.params;

        // Check product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: "Invalid Product ID"
            });
        }

        // Find product in cart
        const cartItem = req.user.cart.find(
            item => item.product.toString() === productId
        );

        if (!cartItem) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        // Remove product from cart
        req.user.cart.pull(cartItem._id);

        await req.user.save();

        return res.status(200).json({
            message: "Product removed from cart"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server crashed"
        });
    }
};
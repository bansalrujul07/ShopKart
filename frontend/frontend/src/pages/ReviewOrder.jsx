import { useLocation, useNavigate } from "react-router-dom"
import { createPaymentOrder } from "../services/orderService"
import { useState } from "react"
import api from "../services/api.js"
import { useDispatch } from "react-redux"
import { clearCart } from "../store/cartSlice"

function ReviewOrder() {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const shippingAddress = location.state?.shippingAddress
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {

            const script = document.createElement("script")

            script.src = "https://checkout.razorpay.com/v1/checkout.js"

            script.onload = () => {
                resolve(true)
            }

            script.onerror = () => {
                resolve(false)
            }

            document.body.appendChild(script)
        })
    }
    const handlePlaceOrder = async () => {
        try {
            setLoading(true)

            const scriptLoaded = await loadRazorpayScript()

            if (!scriptLoaded) {
                alert("Unable to load Razorpay")
                return
            }

            const data = await createPaymentOrder(shippingAddress)

            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,

                name: "ShopKart",
                description: "ShopKart Order",

                order_id: data.razorpayOrderId,

                handler: async function (response) {
                    try {

                        console.log("Razorpay payment response:", response)

                        const verifyResponse = await api.post(
                            "/orders/verify-payment",
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            }
                        )

                        console.log(
                            "Payment verification response:",
                            verifyResponse.data
                        )
                        dispatch(clearCart())
                        navigate("/order-confirm")

                    } catch (error) {

                        console.log(
                            "Payment verification error:",
                            error.response?.data
                        )

                        alert(
                            error.response?.data?.message ||
                            "Payment verification failed"
                        )
                    }
                },

                "payment.failed": function (response) {
                    console.log(
                        "Razorpay payment failed:",
                        response.error
                    )

                    alert(
                        response.error?.description ||
                        "Payment failed. Your cart has not been cleared."
                    )
                },

                theme: {
                    color: "#ec4899"
                }
            }

            const razorpay = new window.Razorpay(options)

            razorpay.open()

        } catch (error) {

            console.log(
                "Create order error:",
                error.response?.data
            )

            alert(
                error.response?.data?.message ||
                "Unable to create order"
            )

        } finally {
            setLoading(false)
        }
    }

    if (!shippingAddress) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-pink-50">
                <div className="text-center">
                    <p className="text-gray-500">
                        Shipping details not found.
                    </p>

                    <button
                        onClick={() => navigate("/checkout")}
                        className="mt-4 rounded-xl bg-pink-400 px-5 py-3 font-semibold text-white"
                    >
                        Back to Checkout
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-pink-50 px-6 py-10">

            <div className="mx-auto max-w-3xl">

                <h1 className="text-3xl font-bold text-gray-800">
                    Review Order
                </h1>

                <p className="mt-2 text-gray-500">
                    Review your shipping details before placing the order.
                </p>

                <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Shipping Address
                    </h2>

                    <div className="mt-4 space-y-2 text-gray-600">

                        <p>
                            <span className="font-semibold">Name:</span>{" "}
                            {shippingAddress.fullName}
                        </p>

                        <p>
                            <span className="font-semibold">Phone:</span>{" "}
                            {shippingAddress.phone}
                        </p>

                        <p>
                            <span className="font-semibold">Address:</span>{" "}
                            {shippingAddress.addressLine1}
                        </p>

                        <p>
                            <span className="font-semibold">City:</span>{" "}
                            {shippingAddress.city}
                        </p>

                        <p>
                            <span className="font-semibold">State:</span>{" "}
                            {shippingAddress.state}
                        </p>

                        <p>
                            <span className="font-semibold">Pincode:</span>{" "}
                            {shippingAddress.pincode}
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/checkout")}
                        className="mt-6 rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700"
                    >
                        Edit Shipping Details
                    </button>
                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="mt-4 w-full rounded-xl bg-pink-400 px-5 py-3 font-semibold text-white transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Creating Order..." : "Place Order"}
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ReviewOrder;
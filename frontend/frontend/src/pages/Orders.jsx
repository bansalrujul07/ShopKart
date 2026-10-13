import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function Orders() {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("/orders")
                setOrders(response.data.orders)
            } catch (error) {
                console.log("Fetch orders error:", error.response?.data)
                setError(
                    error.response?.data?.message || "Failed to fetch orders"
                )
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-pink-50 flex items-center justify-center">
                <p className="text-gray-600">Loading orders...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-pink-50 flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-pink-50 px-6 py-10">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                        <p className="text-gray-600">
                            You have no orders yet.
                        </p>

                        <button
                            onClick={() => navigate("/products")}
                            className="mt-5 rounded-xl bg-pink-400 px-5 py-3 font-semibold text-white hover:bg-pink-500"
                        >
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">

                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white rounded-2xl shadow-md p-6"
                            >

                                <div className="flex justify-between items-center mb-5">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Order ID
                                        </p>

                                        <p className="font-semibold text-gray-800">
                                            {order._id}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">
                                            Status
                                        </p>

                                        <p className="font-semibold text-pink-500">
                                            {order.status}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">

                                    {order.items.map((item) => (
                                        <div
                                            key={item.product}
                                            className="flex items-center gap-4 border-t pt-4"
                                        >

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-xl"
                                            />

                                            <div className="flex-1">
                                                <h2 className="font-semibold text-gray-800">
                                                    {item.name}
                                                </h2>

                                                <p className="text-sm text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="font-semibold text-gray-800">
                                                ₹{item.price * item.quantity}
                                            </p>

                                        </div>
                                    ))}

                                </div>

                                <div className="border-t mt-5 pt-5 flex justify-between">

                                    <span className="font-semibold text-gray-700">
                                        Payment: {order.paymentStatus}
                                    </span>

                                    <span className="text-xl font-bold text-gray-800">
                                        Total: ₹{order.totalAmount}
                                    </span>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    )
}

export default Orders;
import { useNavigate } from "react-router-dom"

function OrderConfirmation() {

    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 text-center">

                <div className="text-5xl mb-4">
                    ✅
                </div>

                <h1 className="text-2xl font-bold text-gray-800">
                    Order Placed Successfully!
                </h1>

                <p className="mt-3 text-gray-600">
                    Your payment was successful and your order has been placed.
                </p>

                <button
                    onClick={() => navigate("/orders")}
                    className="mt-6 w-full rounded-xl bg-pink-400 px-5 py-3 font-semibold text-white transition hover:bg-pink-500"
                >
                    View My Orders
                </button>

                <button
                    onClick={() => navigate("/home")}
                    className="mt-3 w-full rounded-xl border border-pink-300 px-5 py-3 font-semibold text-pink-500 transition hover:bg-pink-50"
                >
                    Continue Shopping
                </button>

            </div>

        </div>
    )
}

export default OrderConfirmation;
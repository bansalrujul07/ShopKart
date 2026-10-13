import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function Wishlist() {

    const navigate = useNavigate()

    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getWishlist()
    }, [])

    const getWishlist = async () => {
        try {
            const response = await api.get("/wishlist")

            setWishlist(response.data.wishlist)

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to load wishlist"
            )
        } finally {
            setLoading(false)
        }
    }

    const removeFromWishlist = async (productId) => {
        try {
            await api.delete(`/wishlist/${productId}`)

            setWishlist(
                wishlist.filter(
                    (product) => product._id !== productId
                )
            )

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to remove product from wishlist"
            )
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-pink-50">
                <p className="text-gray-500">
                    Loading wishlist...
                </p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-pink-50">
                <div className="rounded-2xl bg-white p-8 text-center shadow-sm">

                    <p className="text-red-500">
                        {error}
                    </p>

                    <button
                        onClick={() => {
                            setError("")
                            setLoading(true)
                            getWishlist()
                        }}
                        className="mt-5 rounded-xl bg-pink-100 px-5 py-2 font-semibold text-pink-600 transition hover:bg-pink-200"
                    >
                        Try Again
                    </button>

                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-pink-50 px-6 py-10">

            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-8">
                    <p className="font-semibold text-pink-500">
                        ShopKart
                    </p>

                    <h1 className="mt-1 text-3xl font-bold text-gray-800">
                        My Wishlist
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Products you saved for later.
                    </p>
                </div>

                {/* Empty Wishlist */}
                {wishlist.length === 0 ? (

                    <div className="rounded-2xl bg-white py-16 text-center shadow-sm">

                        <p className="text-5xl">
                            ♡
                        </p>

                        <h2 className="mt-4 text-xl font-semibold text-gray-800">
                            Your wishlist is empty
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Save products you love and find them here later.
                        </p>

                        <button
                            onClick={() => navigate("/products")}
                            className="mt-6 rounded-xl bg-pink-400 px-6 py-3 font-semibold text-white transition hover:bg-pink-500"
                        >
                            Continue Shopping
                        </button>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {wishlist.map((product) => (

                            <div
                                key={product._id}
                                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >

                                {/* Product Image */}
                                <div className="h-56 bg-gray-50">

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-contain"
                                    />

                                </div>

                                {/* Product Information */}
                                <div className="p-5">

                                    {/* Category + Delete */}
                                    <div className="flex items-center justify-between">

                                        <p className="text-sm font-medium text-pink-500">
                                            {product.category}
                                        </p>

                                        <button
                                            onClick={() =>
                                                removeFromWishlist(product._id)
                                            }
                                            className="text-xl text-gray-400 transition hover:text-red-500"
                                            title="Remove from wishlist"
                                        >
                                            🗑️
                                        </button>

                                    </div>

                                    {/* Product Name */}
                                    <h2 className="mt-1 text-xl font-semibold text-gray-800">
                                        {product.name}
                                    </h2>

                                    {/* Price */}
                                    <p className="mt-3 text-2xl font-bold text-gray-800">
                                        ₹{product.price}
                                    </p>

                                    {/* Stock */}
                                    <p className="mt-2 text-sm text-gray-500">
                                        {product.stock} units left
                                    </p>

                                    {/* View Details */}
                                    <button
                                        onClick={() =>
                                            navigate(`/products/${product._id}`)
                                        }
                                        className="mt-5 w-full rounded-xl bg-pink-100 px-4 py-3 font-semibold text-pink-600 transition hover:bg-pink-200"
                                    >
                                        View Details
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    )
}

export default Wishlist
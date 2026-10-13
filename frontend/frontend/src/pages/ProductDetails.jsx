import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/api"
import { addToCart } from "../services/cartService.js"
import { useDispatch } from "react-redux"
import { fetchCart } from "../store/cartSlice.js"

function ProductDetails() {

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState("")
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [saving, setSaving] = useState(false)
    const [addingToCart, setAddingToCart] = useState(false)

    useEffect(() => {
        getProduct()
        checkWishlist()
    }, [id])

    const getProduct = async () => {
        try {
            const response = await api.get(`/products/${id}`)
            setProduct(response.data)
        } catch (error) {
            setError(
                error.response?.data?.message || "Unable to load product"
            )
        }
    }
    const checkWishlist = async () => {
        try {
            const response = await api.get("/wishlist")

            const exists = response.data.wishlist.some(
                (item) => item._id === id
            )

            setIsWishlisted(exists)

        } catch (error) {
            console.log(error)
        }
    }
    const toggleWishlist = async () => {
        try {
            setSaving(true)

            if (isWishlisted) {

                await api.delete(`/wishlist/${id}`)

                setIsWishlisted(false)

            } else {

                await api.post(`/wishlist/${id}`)

                setIsWishlisted(true)

            }

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to update wishlist"
            )
        } finally {
            setSaving(false)
        }
    }

    const handleAddToCart = async () => {
        try {
            setAddingToCart(true)

            await addToCart(product._id)
            await dispatch(fetchCart()).unwrap()

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to add product to cart"
            )
        } finally {
            setAddingToCart(false)
        }
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-pink-50">
                <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                    <p className="text-red-500">{error}</p>

                    <button
                        onClick={() => navigate("/products")}
                        className="mt-5 rounded-xl bg-pink-100 px-5 py-2 font-semibold text-pink-600 hover:bg-pink-200"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-pink-50">
                <p className="text-gray-500">
                    Loading product...
                </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-pink-50 px-6 py-10">

            <div className="mx-auto max-w-6xl">

                {/* Back button */}
                <button
                    onClick={() => navigate("/products")}
                    className="mb-6 text-sm font-semibold text-pink-500 hover:text-pink-600"
                >
                    ← Back to Products
                </button>

                <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm md:p-10">

                    <div className="grid gap-10 md:grid-cols-2">

                        {/* Product Image */}
                        <div className="flex h-96 items-center justify-center rounded-2xl bg-gray-50 p-6">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-contain"
                            />
                        </div>

                        {/* Product Information */}
                        <div className="flex flex-col justify-center">

                            <div className="flex items-center justify-between">

                                <p className="font-semibold text-pink-500">
                                    {product.category}
                                </p>

                                <button
                                    onClick={toggleWishlist}
                                    disabled={saving}
                                    className={`text-3xl font-semibold transition ${isWishlisted
                                        ? "text-pink-500"
                                        : "text-gray-400 hover:text-pink-400"
                                        }`}
                                    title={
                                        isWishlisted
                                            ? "Added to Wishlist"
                                            : "Add to Wishlist"
                                    }
                                >
                                    {saving ? "..." : isWishlisted ? "♥" : "♡"}
                                </button>

                            </div>

                            <h1 className="mt-2 text-3xl font-bold text-gray-800 md:text-4xl">
                                {product.name}
                            </h1>

                            <p className="mt-5 text-3xl font-bold text-gray-800">
                                ₹{product.price}
                            </p>

                            <p className="mt-6 leading-7 text-gray-600">
                                {product.description}
                            </p>

                            <div className="mt-6 rounded-xl bg-pink-50 p-4">
                                <p className="text-gray-700">
                                    <span className="font-semibold">
                                        Stock:
                                    </span>{" "}
                                    {product.stock} units available
                                </p>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={addingToCart || product.stock < 1}
                                className="mt-6 rounded-xl bg-pink-400 px-6 py-3 font-semibold text-white transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {addingToCart
                                    ? "Adding..."
                                    : product.stock < 1
                                        ? "Out of Stock"
                                        : "Add to Cart"}
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ProductDetails;
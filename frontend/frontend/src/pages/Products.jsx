import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api.js"
import { addToCart } from "../services/cartService.js"

function Products() {

    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [wishlist, setWishlist] = useState([])
    const [savingProductId, setSavingProductId] = useState(null)

    useEffect(() => {
        getProducts()
    }, [search, category])

    useEffect(() => {
        getWishlist()
    }, [])

    const getProducts = async () => {
        try {
            const response = await api.get("/products", {
                params: {
                    search: search,
                    category: category
                }
            })

            setProducts(response.data.products)
        } catch (error) {
            console.log(error)
        }
    }

    const getWishlist = async () => {
        try {
            const response = await api.get("/wishlist")

            const wishlistIds = response.data.wishlist.map(
                (product) => product._id
            )

            setWishlist(wishlistIds)

        } catch (error) {
            console.log(error)
        }
    }

    const addToWishlist = async (productId) => {
        try {
            setSavingProductId(productId)
            const response = await api.post(`/wishlist/${productId}`)

            setWishlist((prevWishlist) => [
                ...prevWishlist,
                productId
            ])

            // alert(response.data.message)

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to add product to wishlist"
            )
        } finally {
            setSavingProductId(null)
        }
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
                        Explore Products
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Find something you'll love.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row">

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-300"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-pink-300"
                    >
                        <option value="">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Books">Books</option>
                        <option value="Home">Home</option>
                    </select>

                </div>

                {/* Products */}
                {products.length === 0 ? (
                    <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
                        <p className="text-gray-500">
                            No products found.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {products.map((product) => (

                            <div
                                key={product._id}
                                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >

                                <div className="h-56 bg-gray-50">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                <div className="p-5">

                                    <div className="flex items-center justify-between">

                                        <p className="text-sm font-medium text-pink-500">
                                            {product.category}
                                        </p>

                                        <button
                                            onClick={() => addToWishlist(product._id)}
                                            disabled={
                                                savingProductId === product._id ||
                                                wishlist.includes(product._id)
                                            }
                                            className={`text-2xl font-semibold transition ${wishlist.includes(product._id)
                                                ? "text-pink-500"
                                                : "text-gray-400 hover:text-pink-400"
                                                }`}
                                            title={
                                                wishlist.includes(product._id)
                                                    ? "Added to Wishlist"
                                                    : "Add to Wishlist"
                                            }
                                        >
                                            {savingProductId === product._id
                                                ? "..."
                                                : wishlist.includes(product._id)
                                                    ? "♥"
                                                    : "♡"}
                                        </button>

                                    </div>

                                    <h2 className="mt-1 text-xl font-semibold text-gray-800">
                                        {product.name}
                                    </h2>

                                    <p className="mt-3 text-2xl font-bold text-gray-800">
                                        ₹{product.price}
                                    </p>

                                    <p className="mt-2 text-sm text-gray-500">
                                        {product.stock} units left
                                    </p>

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

export default Products;
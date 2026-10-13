import { useDispatch, useSelector } from "react-redux"
import { updateCartQuantity, removeFromCart } from "../services/cartService.js"
import { fetchCart } from "../store/cartSlice.js"
import { Link } from "react-router-dom"

function Cart() {

    const dispatch = useDispatch()

    const { items, loading, error } = useSelector(
        (state) => state.cart
    )


    // Change quantity
    const changeQuantity = async (productId, newQuantity) => {
        try {
            await updateCartQuantity(productId, newQuantity)

            dispatch(fetchCart())

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to update quantity"
            )
        }
    }


    // Remove product
    const handleRemove = async (productId) => {
        try {
            await removeFromCart(productId)

            dispatch(fetchCart())

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to remove product"
            )
        }
    }


    // Total number of products
    const totalItems = items.reduce(
        (total, item) => total + item.quantity,
        0
    )


    // Total cart price
    const totalPrice = items.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    )


    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-pink-50">

                <p className="text-gray-500">
                    Loading cart...
                </p>

            </div>
        )
    }


    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-pink-50">

                <p className="text-red-500">
                    {error}
                </p>

            </div>
        )
    }


    return (
        <div className="min-h-screen bg-pink-50 px-6 py-10">

            <div className="mx-auto max-w-6xl">

                {/* Heading */}

                <h1 className="text-3xl font-bold text-gray-800">
                    Your Cart
                </h1>

                <p className="mt-2 text-gray-500">
                    Review the products you've added.
                </p>


                {/* Empty cart */}

                {items.length === 0 ? (
                    <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
                        <p className="text-gray-500">
                            Your cart is empty.
                        </p>

                        <Link
                            to="/products"
                            className="mt-5 inline-block rounded-xl bg-pink-400 px-5 py-3 font-semibold text-white transition hover:bg-pink-500"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (

                    <>

                        {/* Cart Items */}

                        <div className="mt-8 space-y-4">

                            {items.map((item) => (

                                <div
                                    key={item._id}
                                    className="flex items-center gap-5 rounded-2xl bg-white p-5 shadow-sm"
                                >

                                    {/* Product Image */}

                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="h-24 w-24 rounded-xl bg-gray-50 object-contain"
                                    />


                                    {/* Product Details */}

                                    <div className="flex-1">

                                        <p className="text-sm text-pink-500">
                                            {item.product.category}
                                        </p>

                                        <h2 className="mt-1 text-xl font-semibold text-gray-800">
                                            {item.product.name}
                                        </h2>

                                        <p className="mt-2 text-gray-600">
                                            ₹{item.product.price}
                                        </p>


                                        {/* Quantity Controls */}

                                        <div className="mt-3 flex items-center gap-3">

                                            <button
                                                onClick={() =>
                                                    changeQuantity(
                                                        item.product._id,
                                                        item.quantity - 1
                                                    )
                                                }
                                                disabled={item.quantity === 1}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-lg font-bold text-pink-600 hover:bg-pink-200 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                −
                                            </button>


                                            <span className="font-semibold text-gray-700">
                                                {item.quantity}
                                            </span>


                                            <button
                                                onClick={() =>
                                                    changeQuantity(
                                                        item.product._id,
                                                        item.quantity + 1
                                                    )
                                                }
                                                disabled={
                                                    item.quantity >=
                                                    item.product.stock
                                                }
                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-lg font-bold text-pink-600 hover:bg-pink-200 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>


                                    {/* Price + Remove */}

                                    <div className="flex flex-col items-end gap-3">

                                        <p className="font-bold text-gray-800">
                                            ₹
                                            {item.product.price *
                                                item.quantity}
                                        </p>


                                        <button
                                            onClick={() =>
                                                handleRemove(
                                                    item.product._id
                                                )
                                            }
                                            className="text-sm font-semibold text-red-400 hover:text-red-500"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>


                        {/* Cart Summary */}

                        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

                            <div className="flex items-center justify-between">

                                <p className="text-gray-600">
                                    Total Items
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {totalItems}
                                </p>

                            </div>


                            <div className="mt-3 flex items-center justify-between border-t pt-3">

                                <p className="text-lg font-semibold text-gray-800">
                                    Total Price
                                </p>

                                <p className="text-xl font-bold text-pink-500">
                                    ₹{totalPrice}
                                </p>

                            </div>
                            <Link
                                to="/checkout"
                                className="mt-6 block w-full rounded-xl bg-pink-400 px-5 py-3 text-center font-semibold text-white transition hover:bg-pink-500"
                            >
                                Proceed to Checkout
                            </Link>

                        </div>

                    </>

                )}

            </div>

        </div>
    )
}

export default Cart;
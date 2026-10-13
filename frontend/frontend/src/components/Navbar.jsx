import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useSelector } from "react-redux"

function Navbar() {

    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }
    const cartItems = useSelector((state) => state.cart.items)
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity, 0
    )

    return (
        <nav className="border-b border-pink-100 bg-white px-6 py-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between">

                <Link
                    to="/home"
                    className="text-2xl font-bold text-pink-500"
                >
                    ShopKart
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        to="/home"
                        className="text-gray-600 hover:text-pink-500"
                    >
                        Home
                    </Link>

                    <Link
                        to="/products"
                        className="text-gray-600 hover:text-pink-500"
                    >
                        Products
                    </Link>
                    <Link
                        to="/wishlist"
                        className="text-gray-600 hover:text-pink-500">
                        ♡
                    </Link>
                    <Link
                        to="/cart"
                        className="text-gray-600 hover:text-pink-500"
                    >
                        <span className="relative inline-flex">

                            <span className="text-lg">
                                🛒
                            </span>

                            {cartCount > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
                                    {cartCount}
                                </span>
                            )}

                        </span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-pink-100 px-4 py-2 text-pink-600 hover:bg-pink-200"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;
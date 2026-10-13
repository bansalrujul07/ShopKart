import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Product from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Wishlist from "./pages/Wishlist"
import Checkout from "./pages/Checkout"
import ReviewOrder from "./pages/ReviewOrder"
import Cart from "./pages/Cart"
import OrderConfirmation from "./pages/OrderConfirmation"
import Orders from "./pages/Orders"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import { AuthProvider } from "./context/AuthContext"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchCart } from "./store/cartSlice"
import { useAuth } from "./context/AuthContext"

function CartLoader() {

    const dispatch = useDispatch()
    const { user, loading } = useAuth()

    useEffect(() => {
        if (!loading && user) {
            dispatch(fetchCart())
        }
    }, [loading, user, dispatch])

    return null
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
            <Routes>
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/products" element={<ProtectedRoute><Product /></ProtectedRoute>} />
                <Route path="/products/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
                <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/review-order" element={<ProtectedRoute><ReviewOrder /></ProtectedRoute>} />
                <Route path="/order-confirm" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    )
}

export default App
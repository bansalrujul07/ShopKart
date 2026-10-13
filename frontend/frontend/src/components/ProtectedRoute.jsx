import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Navbar from "./Navbar"

function ProtectedRoute({children}) {

    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            <Navbar /> 
            {children}
        </>
    )
}

export default ProtectedRoute
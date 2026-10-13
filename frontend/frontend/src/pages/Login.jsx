import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Login() {

    const navigate = useNavigate()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        setError("")
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        // Basic validation
        if (!formData.email || !formData.password) {
            setError("Invalid Credentials")
            return
        }

        try {

            setLoading(true)

            await login(formData)

            // Login successful
            navigate("/home")

        } catch (error) {

            console.error("Login error:", error)

            setError("Invalid Credentials")

        } finally {

            setLoading(false)

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Heading */}

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to your ShopKart account
                    </p>

                </div>


                {/* Error */}

                {error && (
                    <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}


                {/* Login Form */}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}

                    <div>

                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            autoComplete="email"
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />

                    </div>


                    {/* Password */}

                    <div>

                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            autoComplete="new-password"
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />

                    </div>


                    {/* Login Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>


                {/* Register */}

                <p className="mt-6 text-center text-sm text-gray-600">

                    Don't have an account?{" "}

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Create Account
                    </button>

                </p>

            </div>

        </div>
    )
}

export default Login
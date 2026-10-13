import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../services/api"

function Register() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: ""
    })

    const [errors, setErrors] = useState({})
    const [apiError, setApiError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        // Remove the error for this field while typing
        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }))

        setApiError("")
    }

    const validateForm = () => {

        const newErrors = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length <= 6) {
            newErrors.password = "Password must be greater than 6 characters"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid 10-digit phone number"
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        setApiError("")

        const isValid = validateForm()

        if (!isValid) {
            return
        }

        try {

            setLoading(true)

            const response = await axiosInstance.post(
                "/customers/register",
                formData
            )

            console.log("Registration successful:", response.data)

            // Registration successful → Login page
            navigate("/login")

        } catch (error) {

            console.error("Registration error:", error)

            setApiError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            )

        } finally {

            setLoading(false)

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Join ShopKart today
                    </p>

                </div>

                {apiError && (
                    <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                        {apiError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Full Name */}
                    <div>

                        <label
                            htmlFor="fullName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Full Name
                        </label>

                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Eg:Aisha Singh"
                            className={`w-full rounded-lg border px-4 py-3 outline-none transition ${errors.fullName
                                ? "border-red-500"
                                : "border-gray-300 focus:border-blue-500"
                                }`}
                        />

                        {errors.fullName && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.fullName}
                            </p>
                        )}

                    </div>


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
                            placeholder="you@gmail.com"
                            className={`w-full rounded-lg border px-4 py-3 outline-none transition ${errors.email
                                ? "border-red-500"
                                : "border-gray-300 focus:border-blue-500"
                                }`}
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}

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
                            placeholder="*****"
                            className={`w-full rounded-lg border px-4 py-3 outline-none transition ${errors.password
                                ? "border-red-500"
                                : "border-gray-300 focus:border-blue-500"
                                }`}
                        />

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}

                    </div>


                    {/* Phone Number */}
                    <div>

                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Phone Number
                        </label>

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Eg:9872345768"
                            className={`w-full rounded-lg border px-4 py-3 outline-none transition ${errors.phone
                                ? "border-red-500"
                                : "border-gray-300 focus:border-blue-500"
                                }`}
                        />

                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.phone}
                            </p>
                        )}

                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-600">

                    Already have an account?{" "}

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Login
                    </button>

                </p>

            </div>

        </div>
    )
}

export default Register

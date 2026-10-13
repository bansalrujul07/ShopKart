import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Checkout() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        addressLine1: "",
        city: "",
        state: "",
        pincode: ""
    })

    const [error, setError] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setError("")

        if (
            !formData.fullName ||
            !formData.phone ||
            !formData.addressLine1 ||
            !formData.city ||
            !formData.state ||
            !formData.pincode
        ) {
            setError("Please fill in all shipping details")
            return
        }

        navigate("/review-order", {
            state: {
                shippingAddress: formData
            }
        })
    }

    return (
        <div className="min-h-screen bg-pink-50 px-6 py-10">

            <div className="mx-auto max-w-3xl">

                <h1 className="text-3xl font-bold text-gray-800">
                    Checkout
                </h1>

                <p className="mt-2 text-gray-500">
                    Enter your shipping details.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
                >

                    {error && (
                        <p className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">
                                Address Line 1
                            </label>

                            <input
                                type="text"
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                City
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                State
                            </label>

                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                Pincode
                            </label>

                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full rounded-xl bg-pink-400 px-5 py-3 font-semibold text-white transition hover:bg-pink-500"
                    >
                        Continue to Review
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Checkout;
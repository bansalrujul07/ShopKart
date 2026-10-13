import api from "./api"

export const createPaymentOrder = async (shippingAddress) => {
    const response = await api.post(
        "/orders/create-payment-order",
        { shippingAddress }
    )

    return response.data
}
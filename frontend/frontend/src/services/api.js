import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://shopkart-backend-7n6n.onrender.com",
    withCredentials: true,
    // headers: {
    //     "Content-Type": "application/json"
    // }
})

export default axiosInstance
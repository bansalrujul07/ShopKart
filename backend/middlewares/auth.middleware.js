import jwt from "jsonwebtoken"
import User from '../models/customer.model.js'

const isAuthenticated = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(404).json({message: "Customer not found"})
        }
        const decode = jwt.verify(token, process.env.jwt_secret)
        const user = await User.findById(decode.userId)

        if(!user){
            return res.status(400).json({message: "User not found"})
        }
        req.user = user
        next()
    }
    catch{
        res.status(500).json({message: "Internal server error"})
    }
}

export default isAuthenticated;
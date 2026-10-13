import User from "../models/customer.model.js";
import genToken from "../utils/genToken.js"
import bcrypt from "bcrypt"

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
}

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, phone } = req.body
        if (!fullName || !email || !password || !phone) {
            return res.status(422).json({ message: "All fields are required" })
        }
        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.status(400).json({ message: "Email already exists" })
        }
        if (password.length <= 6) {
            return res.status(400).json({ message: "Password length must be greater than 6" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ fullName, email, password: hashedPassword, phone })

        const token = genToken(newUser._id)
        res.cookie("token", token, cookieOptions)

        const customer = {
            _id: newUser._id,
            fullName: newUser.fullName,
            password: newUser.password,
            phone: newUser.phone
        }
        res.status(200).json({
            success: true,
            message: "Customer registered successfully",
            customer
        })
    }
    catch (error) {
        console.error("REGISTER ERROR:", error)

        res.status(500).json({
            message: "Internal server crashed"
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(422).json({ message: "All fields are required" })
        }
        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.status(404).json({ message: "Customer does not exists" })
        }
        const correctPassword = await bcrypt.compare(password, userExists.password)
        if (!correctPassword) {
            return res.status(401).json({ message: "Invalid Password" })
        }
        const token = genToken(userExists._id)
        res.cookie("token", token, cookieOptions)

        res.status(200).json({
            success: true,
            message: "Login Successful"
        })
    }
    catch {
        res.status(500).json({ message: "Invalid server crashed" })
    }
}

export const getUser = async (req, res) => {
    res.status(200).json({
        user: req.user
    })
}

export const logoutUser = async (req, res) => {
    res.clearCookie("token", cookieOptions)
    res.status(200).json({
        success: true,
        message: "Logout successful"
    })
}

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Old Password and new Password are required." })
        }
        const customer = req.user;
        const isPassword = await bcrypt.compare(oldPassword, customer.password)
        if (!isPassword) {
            return res.status(400).json({ message: "Old password is incorrect" })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        customer.password = hashedPassword
        await customer.save()
        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })
    }
    catch {
        res.status(500).json({ message: "Internal Server crashed " })
    }
}
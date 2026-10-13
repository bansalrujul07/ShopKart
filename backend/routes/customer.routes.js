import express from "express"
import { changePassword, getUser, loginUser, logoutUser, registerUser } from "../controllers/customer.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const userRoutes = express.Router()

userRoutes.post("/register", registerUser)
userRoutes.post("/login", loginUser)
userRoutes.get("/me", isAuthenticated,getUser)
userRoutes.post("/logout", isAuthenticated,logoutUser)
userRoutes.patch("/change-password", isAuthenticated, changePassword)

export default userRoutes;
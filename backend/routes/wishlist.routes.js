import express from "express";
import { addToWishlist, getWishlist, removeWishlist } from "../controllers/wishlist.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/:productId", isAuthenticated, addToWishlist)
wishlistRouter.get("/", isAuthenticated, getWishlist)
wishlistRouter.delete("/:productId", isAuthenticated, removeWishlist)

export default wishlistRouter;
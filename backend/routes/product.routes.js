import express from "express"
import { createProduct, getAllProducts, getSingleProduct } from "../controllers/product.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const productRoutes = express.Router();

productRoutes.post('/', createProduct)
productRoutes.get('/', getAllProducts)
productRoutes.get('/:id', getSingleProduct)

export default productRoutes;
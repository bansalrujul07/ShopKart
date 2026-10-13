import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/customer.routes.js";
import productRoutes from "./routes/product.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cors from "cors";

const port = process.env.PORT || 8082;
const app = express()
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.dbUrl)
.then(() => {
    console.log("DB connected");
})
.catch((err) => {
    console.log("Database connection failed:", err);
});

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://shop-kart-inky-one.vercel.app"
    ],
    credentials: true
}));

app.use('/customers', userRoutes)
app.use('/products', productRoutes)
app.use('/wishlist', wishlistRouter)
app.use('/cart', cartRoutes)
app.use('/orders', orderRoutes)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


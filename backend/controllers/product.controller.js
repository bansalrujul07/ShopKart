import mongoose, { mongo } from "mongoose";
import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body;

        if (!name || !description || !category || !image) {
            return res.status(400).json({ message: "This is required." })
        }
        if (price <= 0) {
            return res.status(400).json({ message: "Price must be greater than 0" })
        }
        if (stock < 0) {
            return res.status(400).json({ message: "Stocks cannot be negative" })
        }

        const product = await Product.create({
            name, description, price, category, image, stock
        })

        return res.status(201).json(product)

    } catch (error) {
        res.status(500).json({ message: "Internal Server Crashed" })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const { category, search } = req.query

        const query = {} 
        if(search){
            query.name = {
                $regex : search, 
                $options : "i"
            }
        }
        if(category){
            query.category = category
        }
        const products = await Product.find(query).select("name price category image stock")
        return res.status(200).json({
            success: true,
            count: products.length,
            products
        })
    } catch {
        return res.status(500).json({message : "Internal Server crashed"})
    }
}

export const getSingleProduct = async(req , res) => {
    try{
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message : "Invalid ProductId"
            })
        }

        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({message : "Product not found"})
        }

        res.status(200).json(product)

    } catch{
        res.status(500).json({message : "Internal Server Crashed"})
    }
}
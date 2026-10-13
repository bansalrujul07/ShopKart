import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const addToWishlist = async(req, res) => {
    try{
        const { productId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).json({ message : "Invalid Product ID"})
        }
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message : "Product not found"})
        }
        if(req.user.wishlist.includes(productId)){
            return res.status(409).json({ message: "Product already exists in wishlist"})
        }

        req.user.wishlist.push(productId)
        await req.user.save();
        return res.status(201).json({ message :"Product added to wishlist"})
    }
    catch(error){
        return res.status(500).json({message : "Internal Server Crahsed"})
    }
}

export const getWishlist = async(req,res) => {
    try{
        const user = await req.user.populate("wishlist")
        return res.status(200).json({
            success : true, 
            wishlist: user.wishlist
        })
    } catch(error){
        return res.status(500).json({
            message : "Internal Server crashed"
        })
    }
}

export const removeWishlist = async(req,res) => {
    try{
        const {productId} = req.params;
        if(!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).json({message : "Invalid Product Id"})
        }
        if(!req.user.wishlist.includes(productId)){
            return res.status(404).json({ message : "Product not found in wishlist"})
        }
        req.user.wishlist.pull(productId)
        await req.user.save();

        return res.status(200).json({
            message : "Product remove from wishlist"
        })
    } catch(error){
        return res.status(500).json({message : "Internal server crashed"})
    }
}
import mongoose from 'mongoose'

// Collection name
const productsCollection = 'products'


// Schema definition
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: String,
        unique: true
    },
    stock: Number,
})


// Model creation. Collection + Schema
export const productModel = mongoose.model(productsCollection, productSchema)
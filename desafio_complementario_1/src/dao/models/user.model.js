import mongoose from "mongoose";

// Collection name
const usersCollection = "users";

// Schema definition

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
    email: {
        type: String,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

// Model creation. Collection + Schema
export const userModel = mongoose.model(usersCollection, userSchema);
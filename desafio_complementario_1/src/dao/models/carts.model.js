import mongoose from "mongoose";

// Collection name
const cartsCollection = "carts";

// Schema definition

const productCartSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  shippingInfo: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cellphone: {
      type: String,
      required: true,
    },
  },
  paymentInfo: {
    method: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  cart: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: Number,
      },
    ],
    required: true,
    default: undefined,
    _id: false,
  },
});

// Model creation. Collection + Schema
export const cartModel = mongoose.model(cartsCollection, cartSchema);

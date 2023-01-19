import { cartModel } from "../dao/models/carts.model.js";
  export const getAllCarts = async (req, res) => {
    try {
      const response = await cartModel.find();
      res.json(response);
    } catch (error) {
      res.json(error);
    }
  }
  
  export const getCartById = async (req, res) => {
    try {
      const id = req.params.id;
      const response = await cartModel.findById(id);
      if (!response) {
        res.status(404).json({ message: "Cart not found" });
        return;
      }
      res.json({ cart: response, status: "success" });
    } catch (error) {
      res.status(404).json({ message: "Cart not found" });
    }
  }
  
  export const addCart = async (req, res) => {
    console.log(req.body);
    try {
      const response = await cartModel.create(req.body);
      res.json({ cart: response, status: "success" });
    } catch (error) {
      res.status(404).json({ message: "Error creating cart", error: error });
    }
  }
  
  export const updateCart = async (req, res) => {
    // to update nested objects: use "object.title": "new title"  
    try {
      const id = req.params.id;
      const obj = req.body;
      const response = await cartModel.findByIdAndUpdate({ _id: id }, {$set: obj});
      res.json({ cart: response, status: "success" });
    } catch (error) {
      res.status(404).json({ message: "Error updating cart", error: error });
    }
  }
  
  export const deleteCartById = async (req, res) => {
    try {
      const id = req.params.id;
      const response = await cartModel.findByIdAndDelete(id);
      res.json({ cart: response, status: "success" });
    } catch (error) {
      res.status(404).json({ message: "Error deleting cart", error: error });
    }
  }
  
  export const deleteall = async (req, res) => {
    try {
      const response = await cartModel.deleteMany({});
      res.json({ cart: response, status: "success" });
    } catch (error) {
      res.status(404).json({ message: "Error deleting carts", error: error });
    }
  }

  export const addProductToCart = async(req,res)=>{
    try {
        const cid = Number(req.params.cid)
        const pid = Number(req.params.pid)
        const cart = await manager.getById(cid)
        const product = await prodManager.getProductById(pid)
        if(!cart){
            res.json('Cart ID does not exists')
            return
        }
        if(!product){
            res.json('Product ID does not exists')
            return
        }
        const response = await manager.addProductToCart(cid, pid)
        res.json(response)
    } catch (error) {
     res.json(error)   
    }
}
  











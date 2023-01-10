import { Router } from "express";
import {
    indexView,
    productsView,
    productsViewWithSocket,
    productView,
} from '../controllers/views.controller.js'
import {getAllMessages} from '../controllers/messages.controller.js'

const router = Router();

router.get("/", indexView)
router.get("/products-socket", productsViewWithSocket)
router.get("/products", productsView)
router.get("/products/:id", productView)
router.get("/messages", getAllMessages)
router.get("/cart" , (req,res)=>{
    res.render('cart', {})
})
router.get("/shippinginfo" , (req,res)=>{
    res.render('shippinginfo', {})
})


export default router;

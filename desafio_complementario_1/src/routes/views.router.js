import { Router } from "express";
import {
    indexView,
    productsView,
    productsViewWithSocket,
    productView,
    loginView,
    registerView,
    privateView,
    adminView,
    lastPurchasesView,
    lastPurchasesInfoView,
    changePasswordView
} from '../controllers/views.controller.js'
import {getAllMessages} from '../controllers/messages.controller.js'
import __dirname, {passportCall} from "../utils.js";


const router = Router();


router.get("/", indexView)
router.get("/products-socket", productsViewWithSocket)
router.get("/products", productsView)
router.get("/products/:id", productView)
router.get("/messages",  getAllMessages)
router.get("/login", loginView)
router.get("/register", registerView)
router.get("/private", passportCall('jwt'), privateView)
router.get("/private/lastpurchases",passportCall('jwt'), lastPurchasesView)
router.get("/private/lastpurchases/:id",passportCall('jwt'), lastPurchasesInfoView)
router.get("/private/password",passportCall('jwt'), changePasswordView)
router.get("/admin",passportCall('jwt-admin'), adminView)
router.get("/error", (req,res)=>{
  res.render('errors/base')
})
router.get("/cart",passportCall('jwt'), (req,res)=>{
    res.render('cart', {user: req.user.user._doc})
})
router.get("/shippinginfo" ,passportCall('jwt'), (req,res)=>{
    res.render('shippinginfo', {})
})


export default router;

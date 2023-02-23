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
import passport from "passport";


const router = Router();

export const auth = (req,res,next) => {
    if(req.session?.user){
      return next()
    }
    return res.status(401).render(__dirname + '/views/errors/base', {error: 'No auth'} )
  }
export const adminAuth = (req,res,next) => {
    if(req.session?.user){
      if (req.session?.user.admin === true) {
        return next()
      }
    }
    return res.status(401).render(__dirname + '/views/errors/base', {error: 'No auth'} )
  }

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
router.get("/admin",adminAuth, adminView)
router.get("/error", (req,res)=>{
  res.render('errors/base')
})
router.get("/cart",passportCall('jwt'), (req,res)=>{
    res.render('cart', {user: req.user.user._doc})
})
router.get("/shippinginfo" , (req,res)=>{
    res.render('shippinginfo', {})
})


export default router;

import { Router } from "express";
import {
    indexView,
    productsView,
    productsViewWithSocket,
    productView,
    loginView,
    registerView,
    privateView,
    adminView
} from '../controllers/views.controller.js'
import {getAllMessages} from '../controllers/messages.controller.js'
import __dirname from "../utils.js";


const router = Router();

export const auth = (req,res,next) => {
    if(req.session?.user){
      return next()
    }
    return res.status(401).render(__dirname + '/views/errors/base', {error: 'No auth'} )
  }
export const adminAuth = (req,res,next) => {
  console.log(req.session.user);
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
router.get("/products/:id", auth, productView)
router.get("/messages",  getAllMessages)
router.get("/login", loginView)
router.get("/register", registerView)
router.get("/private",auth, privateView)
router.get("/admin",adminAuth, adminView)
router.get("/cart" , (req,res)=>{
    res.render('cart', {})
})
router.get("/shippinginfo" , (req,res)=>{
    res.render('shippinginfo', {})
})


export default router;

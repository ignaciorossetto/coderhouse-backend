import { Router } from "express";
import cartManager from '../managers/cartManager.js'
import productManager from "../managers/productManager.js";
import __dirname from "../utils.js";


const prodManager = new productManager(__dirname + "/managers/db/products.json");
const manager = new cartManager(__dirname + "/managers/db/carts.json")
const router = Router()



router.get('/', async(req,res)=>{
    const response = await manager.getAll()
    return res.send(response)
})

router.delete('/', async(req,res)=>{
    const response = await manager.deleteAll()
    return res.send(response)
})

router.post('/', async(req,res)=>{
    const response = await manager.createCart()
    return res.send(response)
})

router.get('/:cid', async(req,res)=>{
    const id = Number(req.params.cid)
    const cart = await manager.getById(Number(id))
    if(!cart){
        return res.send('Cart ID does not exists')
    }
    return res.send(cart)  
})

router.delete('/:cid', async(req,res)=>{
    const id = Number(req.params.cid)
    const cart = await manager.deleteById(id)
    console.log(cart);
    if(!cart){
        return res.send('Cart ID does not exists')     
    }
    return res.send(cart)
})

router.post('/:cid/product/:pid', async(req,res)=>{
        const cid = Number(req.params.cid)
        const pid = Number(req.params.pid)
        const cart = await manager.getById(cid)
        const product = await prodManager.getProductById(pid)
        if(!cart){
            res.send('Cart ID does not exists')
            return
        }
        if(!product){
            res.send('Product ID does not exists')
            return
        }
        const response = await manager.addProductToCart(cid, pid)
        res.send(response)

})


export default router

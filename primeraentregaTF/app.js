import express from 'express'
const app = express()
import productsRouter from './routers/products.routers.js'
import cartsRouter from './routers/carts.routers.js'

const PORT = 5000


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)



// console.log(await cartmanager.createCart())
// console.log(await cartmanager.addProductToCart(1,3))
// console.log(await cartmanager.getAll())



app.listen(PORT, ()=>{
    console.log(`Listening server on port ${PORT}`);
})
const express = require('express')
const app = express()
const productManager = require('./src/productManager')
const CartManager = require('./src/cartManager')
const PORT = 5000

const manager = new productManager('./src/products.txt')
const cartManager = new CartManager('./src/carts.txt')

app.use(express.urlencoded({extended: true}))

app.get('/products', async(req,res)=>{
    const products = await manager.getAll()
    if(req.query.limit){
        return res.send(products.products.slice(0, req.query.limit))
    }
    return res.send(products.products)

})
app.get('/products/:pid', async(req,res)=>{
    const id = Number(req.params.pid)
    const product = await manager.getProductById(Number(id))
    if(!product){
        return res.send(`<h2 style='text-align: center'> No se encontro el producto con id: ${id}</h2>`)
    }
    res.send(`
            <div style='display:flex; flex-direction:column; align-items: center'>
                <h1>Producto ${id}</h1>
                <ul>
                    <li>id: ${product.id}</li>
                    <li>title: ${product.title}</li>
                    <li>description: ${product.description}</li>
                    <li>price: $${(product.price).toLocaleString()}</li>
                    <li>thumbnail: ${product.thumbnail}</li>
                    <li>code: ${product.code}</li>
                    <li>stock: ${product.stock}</li>
                </ul>   
            </div>    
    `)
})

app.listen(PORT, ()=>{
    console.log(`Listening server on port ${PORT}`);
})
import express from 'express'
import __dirname from './utils.js'
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import productManager from './managers/productManager.js'

const manager = new productManager(__dirname + "/managers/db/products.json");


// configuracion server http
const app = express()
const httpServer = app.listen(8080, ()=> {
    console.log('Server listening on port 8080');
})


// seteo de middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// creacion server socket
const io = new Server(httpServer)

// seteo de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// seteo de statics
app.use(express.static(__dirname + '/public'))

// organizacion de rutas
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

// abro conexion con el front


io.on('connection', (socket)=> {

  socket.on('authenticated', async() => {
    const products = await manager.getAll()
      console.log(`New client connected`);
      socket.emit('products', products)
  })

  socket.on('productsModified', async(data) => {
    const products = await manager.getAll()
    io.emit('products', products)
  })

  socket.on('deleteProduct', async(data)=>{
    const response = await manager.deleteProductById(parseInt(data))
    const products = await manager.getAll()
    io.emit('products', products)
  })

})



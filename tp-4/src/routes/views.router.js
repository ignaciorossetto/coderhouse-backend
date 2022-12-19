import express from 'express'
const routers = express.Router()

routers.get('/', (req, res)=>{
    res.render('home', {})
})
routers.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts', {})
})

export default routers
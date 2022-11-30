const express = require('express')

const app = express()
app.use(express.urlencoded({extended: true}))


app.get('/ejemploquery', (req, res)=> {

    console.log(req.query);

    res.send(req.query)
})

app.get('/bienvenida', (req, res, next)=> {
    res.send('<h1 style="color: blue;"> Bienvenido!</h1>')
})

app.get('/bienvenida/:nombre', (req, res, next)=> {
    res.send(`<h1 style="color: blue;"> Bienvenido ${req.params.nombre}!</h1>`)
})


app.get('/usuario', (req, res, next)=> {
    res.json({usuario: 'adasd'})
})



app.listen(3300, ()=> {
    console.log('server listening on port 3300...');
})
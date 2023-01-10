import { productModel } from "../dao/models/product.model.js";

export const indexView = async (req, res) => {
  res.render("home", {});
};


export const productsViewWithSocket = async (req, res) => {
    const response = await productModel.find();
    const io = req.app.get('io')
    io.on('connection',(socket)=> {
        console.log('new socket connected', socket.id);
        socket.emit('products', response)
        socket.on('productsModified', async(data) => {
            await productModel.create(data);
            const products = await productModel.find();
            io.emit('products', products)
          })
        socket.on('deleteProduct', async(data) => {
            const id = data
            await productModel.findByIdAndDelete(id.trim());
            const products = await productModel.find();
            io.emit('products', products)
          })
        
    })

     res.render("realTimePRoducts", {});

};


export const productsView = async (req, res) => {
  res.render("products", {});
};
export const productView = async (req, res) => {
  res.render("product", {});
};

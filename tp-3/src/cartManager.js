import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
    this.init();
  }

  init() {
    if (fs.existsSync(this.path)) {
      return;
    } else {
      fs.writeFileSync(this.path, JSON.stringify({ counter: 0, carts: [] }));
    }
  }

  createCart = async() => {
    const carts = await this.getAll()
    const newCart = {
        id: carts.counter++,
        cartsProducts: []
    }
    carts.carts.push(newCart)
    await fs.promises.writeFile(this.path, JSON.stringify(carts))
    return newCart
  }

  getAll = async () => {
    try {
      const objs = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      if (error.message.includes("no such file or directory")) return [];
      else console.log(error);
    }
  }

  getById = async (_id) => {
    try {
      const objs = await this.getAll();
      const { carts } = await JSON.parse(objs);
      const obj = carts.find(({ id }) => id === _id);
      return obj;
    } catch (error) {
      return error
    }
  };

  addProductToCart = async(cartId, productId) => {
    const allCarts = await this.getAll()
    const cart = allCarts.find(({ id }) => id === cartId)
    if (!cart){
        return 'Cart Id doesnt exists, create cart first.'
    }
    const cartIndex = allCarts.id.findIndex((id)=> id === cartId)
    const obj = cart.find(({ id }) => id === _id);
    if (!obj){
        cart.cartsProducts.push({
            productId: productId,
            quantity: 1
        })
        allCarts[cartIndex] = cart
        await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, 2))
        return 'Product added to Cart'
    }
    const prodIndex = cart.cartsProducts.findIndex((_obj)=> _obj === obj)
    cart.cartsProducts[prodIndex].quantity++ 
    allCarts[cartIndex] = cart
    await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, 2))
    return 'Product added to cart'
    
  }
}

module.exports = CartManager

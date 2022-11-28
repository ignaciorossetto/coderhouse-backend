const productManager = require('./tp2.js');

const manager = new productManager('products.txt');

const test = async () => {

    // const getall = await manager.getAll();
    // console.log(getall.counter);

    // const save = manager.addProduct("producto 8", "444", 1000, "http://xxxx", "454", 10)
    // console.log(save);

    // const getbyid = await manager.getProductById(2);
    // console.log(getbyid);

    // const deletebyid = await manager.deleteProductById(2);
    // console.log(deletebyid);

    // const deleteall = await manager.deleteAll();
    // console.log(deleteall);

    // const updateProduct = await manager.updateProduct(1, {titulo: 'asdsad'})
    // console.log(updateProduct);

};

test();
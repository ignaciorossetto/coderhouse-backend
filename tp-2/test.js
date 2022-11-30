const productManager = require("./tp2.js");

const manager = new productManager("products.txt");

const test = async () => {
  // const getall = await manager.getAll();
  // console.log(getall);

  // const save = await manager.addProduct("producto 8", "444", 1000, "http://xxxx", "887", 10)
  // console.log(save);

  // const getbyid = await manager.getProductById(2);
  // console.log(getbyid);

  // const deletebyid = await manager.deleteProductById(2);
  // console.log(deletebyid);

  // const deleteall = await manager.deleteAll();
  // console.log(deleteall);

  const updateProduct = await manager.updateProduct(8, {
    title: 87987,
    manager: "asds",
    id: 77,
  });
  console.log(updateProduct);
};

test();

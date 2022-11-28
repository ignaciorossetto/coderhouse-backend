const fs = require("fs");

class productManager {
  constructor(path) {
    this.path = path;
    this.init();
  }

  init = () => {
    if (fs.existsSync(this.path)) {
      return;
    } else {
      return fs.writeFileSync(
        this.path,
        JSON.stringify({ counter: 0, products: [] })
      );
    }
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const objs = await this.getAll();
    try {
      if (this.checkCode(objs.products, code)) {
        return console.log(
          "Ya se registro un producto con el mismo codigo! Usar otro!"
        );
      }
      const newObj = {
        id: objs.counter++,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };
      objs.products.push(newObj);
      await fs.promises.writeFile(this.path, JSON.stringify(objs, null, 2));
    } catch (error) {
      return console.log(error);
    }
  };

  getAll = async () => {
    try {
      const objs = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      if (error.message.includes("no such file or directory")) return [];
      else console.log(error);
    }
  };

  deleteAll = async () => {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify({ counter: 0, products: [] })
      );
      return;
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (_id) => {
    try {
      const objs = await fs.promises.readFile(this.path, "utf-8");
      const { products } = await JSON.parse(objs);
      const obj = products.find(({ id }) => id === _id);
      return obj;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProductById = async (_id) => {
    try {
      const objs = await this.getAll();
      const newObjs = objs.products.filter(({ id }) => id !== _id);
      objs.products = newObjs;
      await fs.promises.writeFile(this.path, JSON.stringify(objs, null, 2));
      return;
    } catch (error) {
      return console.log(error);
    }
  };

  checkCode = (array, code_) => {
    try {
      if (array.find(({ code }) => code === code_) === undefined) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return console.log(error);
    }
  };

  updateProduct = async (id, param) => {
    const product = await this.getProductById(id);
    const productParams = Object.keys(product);
    const objs = await this.getAll();
    const index = objs.products.findIndex((element) => element.id === id);
    if (param) {
      const keys = Object.keys(param);
      keys.forEach((element) => {
        if (productParams.includes(element)) {
          if (element === "id" && param[element] !== product[element]) {
            return console.log("No se puede alterar el ID de producto");
          } else if (
            element === "code" &&
            param[element] !== product[element]
          ) {
            if (this.checkCode(objs.products, param[element])) {
              return console.log(
                "Ya se registro un producto con el mismo codigo! Usar otro!"
              );
            } else {
              return (product[element] = param[element] || product.element);
            }
          } else {
            return (product[element] = param[element] || product.element);
          }
        } else {
          return console.log(`El parametro: ${element} no esxiste.`);
        }
      });

      objs.products[index] = product;

      await fs.promises.writeFile(this.path, JSON.stringify(objs, null, 2));

      return console.log("Producto actualizado");
    } else {
      return console.log("Erorr, debe pasar al menos un parametro!");
    }
  };
}

/// esta combinacion me tira error!
// manager = new productManager('products1.txt')
// manager.addProduct("producto 8", "444", 1000, "http://xxxx", "454", 10);
// manager.getProductById(0).then(val => console.log(val))
// manager.deleteAll()


module.exports =  productManager 

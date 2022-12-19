import fs from "fs";

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

  addProduct = async (title, description, price, thumbnail, code, stock, status) => {
    const objs = await this.getAll();
    try {
      if (this.checkCode(objs.products, code)) {
        return "Ya se registro un producto con el mismo codigo! Usar otro!";
      }
      const newObj = {
        id: objs.counter++,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        status: status,
      };
      objs.products.push(newObj);
      await fs.promises.writeFile(this.path, JSON.stringify(objs, null, 2));
      return 'Producto creado!';
    } catch (error) {
      return error;
    }
  };

  getAll = async () => {
    try {
      const objs = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      if (error.message.includes("no such file or directory")) return [];
      else error;
    }
  };

  deleteAll = async () => {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify({ counter: 0, products: [] })
      );
      return "All products have been deleted";
    } catch (error) {
      error;
    }
  };

  getProductById = async (_id) => {
    try {
      const objs = await fs.promises.readFile(this.path, "utf-8");
      const { products } = await JSON.parse(objs);
      const obj = products.find(({ id }) => id === _id);
      return obj;
    } catch (error) {
      return error
    }
  };

  deleteProductById = async (_id) => {
    try {
      const objs = await this.getAll();
      const obj = objs.products.find((item) => item.id === _id);
      if (!obj) {
        return "Product does not exists";
      }
      const newObjs = objs.products.filter(({ id }) => id !== _id);
      objs.products = newObjs;
      await fs.promises.writeFile(this.path, JSON.stringify(objs, null, 2));
      return `Product ${_id} deleted`;
    } catch (error) {
      return error;
    }
  };

  checkCode = (array, code_) => {
    try {
      const bool = array.find(({ code }) => code === code_);
      if (!bool) {
        return false;
      }
      return true;
    } catch (error) {
      return error;
    }
  };

  updateProduct = async (id, param) => {
    try {
      if (!param) {
        return "Erorr, debe pasar al menos un parametro!";
      }
      if (param.id) {
        return "No se puede alterar el ID";
      }
      if (param.code) {
        if (this.checkCode(objs.products, param.code)) {
          return "Ya se registro un producto con el mismo codigo! Usar otro!";
        }
      }
      const product = await this.getProductById(id);
      const productParams = Object.keys(product);
      const objs = await this.getAll();
      const index = objs.products.findIndex((element) => element.id === id);
      const keys = Object.keys(param);
      keys.forEach((element) => {
        if (!productParams.includes(element)) {
          return `El parametro: ${element} no existe.`;
        }
        product[element] = param[element] || product.element;
      });

      objs.products[index] = product;

      await fs.promises.writeFile(this.path, JSON.stringify(objs, null, 2));

      return objs.products[index];
    } catch (error) {
      return error;
    }
  };
}

export default productManager;

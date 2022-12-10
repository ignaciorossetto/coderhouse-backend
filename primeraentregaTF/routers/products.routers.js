import { Router } from "express";
import productManager from "../src/productManager.js";

const manager = new productManager("./src/products.txt");

const router = Router();

router.get("/", async (req, res) => {
  const products = await manager.getAll();
  if (req.query.limit) {
    return res.send(products.products.slice(0, req.query.limit));
  }
  return res.send(products.products);
});

router.get("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const product = await manager.getProductById(Number(id));
  if (!product) {
    return res.send(
      `<h2 style='text-align: center'> No se encontro el producto con id: ${id}</h2>`
    );
  }
  res.send(`
            <div style='display:flex; flex-direction:column; align-items: center'>
                <h1>Producto ${id}</h1>
                <ul>
                    <li>id: ${product.id}</li>
                    <li>title: ${product.title}</li>
                    <li>description: ${product.description}</li>
                    <li>price: $${product.price.toLocaleString()}</li>
                    <li>thumbnail: ${product.thumbnail}</li>
                    <li>code: ${product.code}</li>
                    <li>stock: ${product.stock}</li>
                    <li>status: ${product.status}</li>
                </ul>   
            </div>    
    `);
});

router.post('/',async (req, res) => {
  try {
    await manager.addProduct(
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.thumbnail,
      req.body.code,
      req.body.stock
    );
    res.status(200).send('product created!')
  } catch (error) {}
});

router.put('/:id',async (req, res) => {
  try {
    const id = Number(req.params.pid);
    const response = await manager.updateProduct(
        id,
        req.body
    );
    res.send(response)
  } catch (error) {
    res.send(error)
  }
});


router.delete('/:id', async (req,res)=> {
    try {
        const id = Number(req.params.id);
        const response = await manager.deleteProductById(id)
        res.send(response)
    } catch (error) {
    res.send(error)
        
    }
})
router.delete('/', async (req,res)=> {
    try {
        const response = await manager.deleteAll()
        res.send(response)
    } catch (error) {
    res.send(error)
        
    }
})

export default router;

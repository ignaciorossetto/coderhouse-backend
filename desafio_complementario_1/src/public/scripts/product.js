const productTitle = document.getElementById("productTitle");
const productContainer = document.getElementById("productContainer");



window.onload = async () => {
  const value = document.URL.split("/")[4];
  const response = await fetch(`http://localhost:5000/api/products/${value}`);
  const { product } = await response.json();
  productTitle.innerText = `${product.title}`;
  productContainer.innerHTML = `
          <div style="width: 33%;
                      height: auto;">
              <img src="${product.image}" alt="Avatar" style="width:50%">
              <div class="container">
                  <h4 id='productTitle'><b>${product.title}</b></h4>
                  <p  id='productId'>${product._id}</p>
                  <p  id='productPrice'>$${product.price}</p>
              </div>
              <button id='addCartButton' >Agregar al carrito</button>
          </div>
          `;
const addCartButton = document.getElementById("addCartButton");

  addCartButton.addEventListener("click", async(e) => {
    const response = await fetch('http://localhost:5000/api/carts')
    const data = await response.json()
    console.log(data);
    const id = document.getElementById('productId').innerText
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Agregaste un producto al carrito!!`,
      showConfirmButton: false,
      timer: 1500,
      toast: true
    })
    // No existe carrito . Un carrito por usuario.
    if (data.length === 0) {
      await axios.post('http://localhost:5000/api/carts', {
        cart:[{
          product: id,
          quantity: 1
        }]
      })
      return
    }
    const cartId = data[0]._id
    const {shopCart} = data[0]
    console.log(shopCart);
    if(!shopCart.some(({product})=> product === id)){
        const obj={
            product: id,
            quantity: 1
        }
        shopCart.push(obj)
        await axios.put(`http://localhost:5000/api/carts/${cartId}`, {shopCart : shopCart})
    } else {
        const index = shopCart.findIndex(({product})=> product === id)
        shopCart[index].quantity += 1
        await axios.put(`http://localhost:5000/api/carts/${cartId}`, {shopCart : shopCart})
    }

  });
};

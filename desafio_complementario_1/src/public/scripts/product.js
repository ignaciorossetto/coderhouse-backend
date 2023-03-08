const productTitle = document.getElementById("productTitle");
const productContainer = document.getElementById("productContainer");



window.onload = async () => {
  try {
  const user = await fetch('http://localhost:5000/api/users/check')
  const userData = await user.json()
  const {currentCart} = userData.user
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
    const id = document.getElementById('productId').innerText
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Agregaste un producto al carrito!!`,
      showConfirmButton: false,
      timer: 1500,
      toast: true
    })
    const {shopCart} = currentCart.cart
    if(!shopCart.some((aa)=>{
      return aa.product === id})){
        const obj={
            product: id,
            quantity: 1
        }
        shopCart.push(obj)
        await axios.put(`http://localhost:5000/api/carts/${currentCart.cart._id}`, {shopCart : shopCart})
    } else {
        const index = shopCart.findIndex((aa)=> aa.product === id)
        shopCart[index].quantity += 1
        await axios.put(`http://localhost:5000/api/carts/${currentCart.cart._id}`, {shopCart : shopCart})
    }

  });
  } catch (error) {
    productTitle.innerText = `DEBES INICIAR SESION PARA VER EL PRODUCTO`;
  }
}

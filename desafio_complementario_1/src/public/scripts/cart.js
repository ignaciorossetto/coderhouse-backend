let currentCart
let userCartId

const deleteHandler = async(id) => {
  const {cart : {shopCart}} = currentCart
  const index = shopCart.findIndex(({ product }) => product === id);
  shopCart[index].quantity -= 1;
  if (shopCart[index].quantity <= 0){
    shopCart.splice(index, 1)
  }
  await axios.put(`http://localhost:5000/api/carts/${userCartId}`, {shopCart: shopCart})
  renderCart(userCartId)
};



const renderCart = async(cartID) => {
  const response = await axios.get(`http://localhost:5000/api/carts/${cartID}`)
  const {cart : {shopCart}} = response.data
  let cartContainer = document.getElementById("cartContainer");
  let total = 0;
  cartContainer.innerHTML = ''
  shopCart.forEach((element) => {
    cartContainer.innerHTML += `
        <div>
          <img src='${element.product.image}' alt='x' style='width: auto;
          height: 200px;'>
        <h4>ID: ${element.product._id}</h4>
        <h5>PRECIO: $${element.product.price}</h5>
        <h5>CANTIDAD: ${element.quantity}</h5>
        <button id='deleteItemBtn' onclick="deleteHandler('${element.product._id}')">Eliminar del carrito </button>
        </div>
        <hr>
        `;
    total += element.product.price * element.quantity;
  });

  cartContainer.innerHTML += `
<hr>
<div>TOTAL: $${total} </div>
<br>
<a style="background-color: red; padding: 3px; border: black solid 2px;" href="/shippinginfo">Continuar </a>
`;
};



window.onload = async() => {
  const response = await fetch('http://localhost:5000/api/users/check')
  const data = await response.json()
  currentCart = data.user.currentCart
  userCartId = currentCart.cart._id
  renderCart(userCartId)
}

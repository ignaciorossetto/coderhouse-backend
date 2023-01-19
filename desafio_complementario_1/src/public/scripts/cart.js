const userCartId = '63c93ca99aa5414d9ef74eb9'

const deleteHandler = async(id) => {
  const response = await axios.get(`http://localhost:5000/api/carts/${userCartId}`)
  const {cart : {shopCart}} = response.data
  const index = shopCart.findIndex(({ product: {_id} }) => _id === id);
  shopCart[index].quantity -= 1;
  if (shopCart[index].quantity <= 0){
    shopCart.splice(index, 1)
  }
  await axios.put(`http://localhost:5000/api/carts/${userCartId}`, {shopCart: shopCart})
  renderCart()
};

const renderCart = async() => {
  const response = await axios.get(`http://localhost:5000/api/carts/${userCartId}`)
  const {cart : {shopCart}} = response.data
  let cartContainer = document.getElementById("cartContainer");
  let total = 0;
  cartContainer.innerHTML = ''
  console.log(shopCart);
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


renderCart()

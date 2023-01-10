const deleteHandler = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart_1"));
  const index = cart.findIndex(({ _id }) => _id === id);
  cart[index].quantity -= 1;
  if (cart[index].quantity <= 0){
    cart.splice(index, 1)
  }
  localStorage.setItem("cart_1", JSON.stringify(cart));
  renderCart();
};

const renderCart = () => {
  const items = JSON.parse(localStorage.getItem("cart_1"));
  let cartContainer = document.getElementById("cartContainer");
  let total = 0;
  cartContainer.innerHTML = ''
  items.forEach((element) => {
    cartContainer.innerHTML += `
        <div>
        <h4>ID: ${element._id}</h4>
        <h5>PRECIO: $${element.price}</h5>
        <h5>CANTIDAD: ${element.quantity}</h5>
        <button id='deleteItemBtn' onclick="deleteHandler('${element._id}')">Eliminar del carrito </button>
        </div>
        <hr>
        `;
    total += element.price * element.quantity;
  });

  cartContainer.innerHTML += `
<hr>
<div>TOTAL: $${total} </div>
<br>
<a style="background-color: red; padding: 3px; border: black solid 2px;" href="/shippinginfo">Continuar </a>
`;
};


renderCart()

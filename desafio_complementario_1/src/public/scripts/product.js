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

  addCartButton.addEventListener("click", (e) => {
    const products = JSON.parse(localStorage.getItem('cart_1')) || []
    const id = document.getElementById('productId').innerText
    const price = document.getElementById('productPrice').innerText.split('$')[1]
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Agregaste un producto al carrito!!`,
        showConfirmButton: false,
        timer: 1500,
        toast: true
      })
    if(!products.some(({_id})=> _id === id)){
        const obj={
            _id: id,
            price: price,
            quantity: 1
        }
        products.push(obj)
        return localStorage.setItem('cart_1', JSON.stringify(products))
    } else {
        const index = products.findIndex(({_id})=> _id === id)
        products[index].quantity += 1
        return localStorage.setItem('cart_1', JSON.stringify(products))
    }

  });
};

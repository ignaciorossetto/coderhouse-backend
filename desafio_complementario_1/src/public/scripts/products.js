const productsGrid = document.getElementById("productsGrid");

window.onload = async () => {
  const response = await fetch("http://localhost:5000/api/products");
  const data = await response.json();
  console.log(data);
  data.forEach((element) => {
    productsGrid.innerHTML += `
        <div style="width: 33%;
                    height: auto;">
            <img src="${element.image}" alt="Avatar" style="width:100%">
            <div class="container">
                <h4><b>${element.title}</b></h4>
                <p>$${element.price}</p>
                <a href="http://localhost:5000/products/${element._id}" >ver producto</a>
            </div>
        </div>
        `
  });
};

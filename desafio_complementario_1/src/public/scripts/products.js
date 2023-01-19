const productsGrid = document.getElementById("productsGrid");
const selectCategories = document.getElementById("selectCategories");
const selectPriceSort = document.getElementById("selectPriceSort");
const selectQuantityDisplayed = document.getElementById(
  "selectQuantityDisplayed"
);
const paginationContainer = document.getElementById("paginationContainer");
const nextPageBtn = document.getElementById('nextPageBtn')
const prevPageBtn = document.getElementById('prevPageBtn')
const currentPage = document.getElementById('currentPage')

const handleSelect = async (e) => {
  const sort =
    selectPriceSort.value === "-" ? "" : `sort=${selectPriceSort.value}&`;
  const category =
    selectCategories.value === "-" ? "" : `category=${selectCategories.value}&`;
  const limit =
    selectQuantityDisplayed.value === "-"
      ? `limit=1000`
      : `limit=${selectQuantityDisplayed.value}&`;
  console.log(`http://localhost:5000/api/products?${sort}${category}${limit}`);
  const response = await fetch(
    `http://localhost:5000/api/products?${sort}${category}${limit}`
  );
  const data = await response.json();
  console.log(data);
  display(data.payload, data);
};

const handlePaginate = async (url) => {
  let url1 = url.replace("-", "'")
  const response = await fetch(url1);
  const data = await response.json();
  console.log(data);
  display(data.payload, data);
};

const display = async (productsArray,data) => {
  console.log(data);
  productsGrid.innerHTML = ``;
  productsArray.forEach((element) => {
    productsGrid.innerHTML += `
        <div style="width: 33%;
                    height: auto;
                    flex: 1;">
            <img src="${element.image}" alt="Avatar" style="width:100%">
            <div class="container">
                <h4><b>${element.title}</b></h4>
                <p>$${element.price}</p>
                <a href="http://localhost:5000/products/${element._id}" >ver producto</a>
            </div>
        </div>
        `;

        prevPageBtn.innerHTML = data.hasPrevPage ? `<button onclick='handlePaginate("${data.prevLink}")'> <- </button>` : `<button disabled> <- </button>`
        currentPage.innerText = data.page
        nextPageBtn.innerHTML = data.hasNextPage ? `<button onclick='handlePaginate("${data.nextLink}")'> -> </button>` : `<button disabled> -> </button>`
        // NO PUEDO HACER FUNCIONAR LOS BTNS CON LAS CATEGORIAS QUE TIENE UN ' ADENTRO POR EJEMPLO men's clothing. 
  });


};

window.onload = async () => {
  const categories_resp = await fetch(
    "http://localhost:5000/api/products/categories"
  );
  const categories = await categories_resp.json();
  selectCategories.innerHTML = `<option value ="-">Todos los productos</option>`;
  categories.forEach((element) => {
    selectCategories.innerHTML += `<option value="${element}" >${element}</option>`;
  });
  const response = await fetch(`http://localhost:5000/api/products?`);
  const data = await response.json();
  await display(data.payload, data);
};

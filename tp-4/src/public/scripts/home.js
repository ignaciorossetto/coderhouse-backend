
const homeList = document.getElementById('httpList')

const products = async() => {
    const response = await fetch('http://localhost:8080/api/products')
    const data = await response.json()
    return data
}

const renderProducts = async()=>{
    const prods = await products()
    if (prods.products.length === 0) {
        homeList.innerHTML = '<h2>No hay items en la lista</h2>'
        return
    }
    let items = ''
    prods.products.forEach((prod)=>{
        console.log(prod);
        items += `
        <li>
            <h5>Nombre:${prod.title}</h5>
            <p>Precio: $${(prod.price).toLocaleString()}</p>
        </li>`
    })
    homeList.innerHTML = items
}

window.onload = async() =>{
    await renderProducts()
}

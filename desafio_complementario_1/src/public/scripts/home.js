
const homeList = document.getElementById('httpList')
const socket = io();

console.log(document.cookie);


const products = async() => {
    const response = await fetch('http://localhost:5000/api/products')
    const data = await response.json()
    return data
}

const renderProducts = async()=>{
    const prods = await products()
    console.log(prods);
    if (prods.length === 0) {
        homeList.innerHTML = '<h2>No hay items en la lista</h2>'
        return
    }
    let items = ''
    prods.forEach((prod)=>{
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

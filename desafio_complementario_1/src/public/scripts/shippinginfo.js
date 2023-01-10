const createProductButton = document.getElementById('createProductButton')

createProductButton.addEventListener('click', async(e)=> {
    const cart = JSON.parse(localStorage.getItem('cart_1'))
    e.preventDefault()
    const ship = {
        name: e.target.form[0].value,
        address: e.target.form[1].value,
        id: e.target.form[2].value,
        email: e.target.form[3].value,
        cellphone: e.target.form[4].value,
    }
    const payment= {
        method: e.target.form[5].value,
        status: 'pendiente',
    }
    try {
        const response = await axios.post('http://localhost:5000/api/carts', {shippingInfo: ship, paymentInfo: payment, cart: cart})
        const resetBtn = document.getElementById("resetButton");
        resetBtn.click();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Felicitaciones por tu compra!!`,
            showConfirmButton: false,
            timer: 1500,
            toast: true
          })
          return
        
    } catch (error) {
        return
    }
})


const items = JSON.parse(localStorage.getItem('cart_1'))
let cartResume = document.getElementById('cartResume')
let total = 0
items.forEach(element => {
    cartResume.innerHTML += `
        <div>
            <h4>ID: ${element._id}</h4>
            <h5>PRECIO: $${element.price}</h5>
            <h5>CANTIDAD: ${element.quantity}</h5>
        </div>
        <hr>
    `
    total += element.price*element.quantity
});

cartResume.innerHTML += `
<hr>
    <div>TOTAL: $${total} </div>
    <br>
`
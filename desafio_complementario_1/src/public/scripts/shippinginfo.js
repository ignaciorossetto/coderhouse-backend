const createProductButton = document.getElementById('createProductButton')
const userCartId = '63c93ca99aa5414d9ef74eb9'

createProductButton.addEventListener('click', async(e)=> {
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
        const response = await axios.put(`http://localhost:5000/api/carts/${userCartId}`, {shippingInfo: ship, paymentInfo: payment})
        window.location.href('/products')
        return 
        
    } catch (error) {
        return
    }
})

const display = async() => {
    const response = await axios.get(`http://localhost:5000/api/carts/${userCartId}`)
      const {cart : {shopCart}} = response.data
      console.log(shopCart);
    let cartResume = document.getElementById('cartResume')
    let total = 0
    shopCart.forEach(element => {
        cartResume.innerHTML += `
            <div>
                <h4>ID: ${element.product._id}</h4>
                <h5>PRECIO: $${element.product.price}</h5>
                <h5>CANTIDAD: ${element.quantity}</h5>
            </div>
            <hr>
        `
        total += element.product.price*element.quantity
    });
    
    cartResume.innerHTML += `
    <hr>
        <div>TOTAL: $${total} </div>
        <br>
    `

}

display()
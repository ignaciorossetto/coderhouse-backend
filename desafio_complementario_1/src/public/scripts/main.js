const socket1 = io();
const logoutBtn = document.getElementById('logoutBtn')
const loginBtn = document.getElementById('loginBtn')
const privateBtn = document.getElementById('privateBtn')
const adminBtn = document.getElementById('adminBtn')
const cartQuantity = document.getElementById('cartQuantity')
const registerBtn = document.getElementById('registerBtn')
const cartBtn = document.getElementById('cartBtn')
const addProductBtn = document.getElementById('addProductBtn')

const handleClick = async() => {
    try {
        await fetch('http://localhost:5000/api/users/logout')
        document.cookie = "coderCookieToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.replace('http://localhost:5000/login?logout_status=success')
          displayLogOut()
    } catch (error) {
        console.log(error);
    }
}

socket1.on('totalQuantityInCart', data => {
    if (data.length > 0) {
        let total = 0
        data.forEach(e => {
            total += e.quantity                
        });
        cartQuantity.innerText = total
    } else cartQuantity.style.display = 'none'
    
})

logoutBtn.addEventListener('click', handleClick)
const displayLogOut = async() => {

    try {
        const response = await fetch('http://localhost:5000/api/users/check')
        const data = await response.json()
        if (!data.user.admin) {
            adminBtn.style.display = 'none'
        }
        loginBtn.style.display = 'none'
        registerBtn.style.display = 'none'
        if (data.user.type === 'user'){
            addProductBtn.style.display = 'none'
        }
        if (data.user.currentCart.cart.shopCart.length > 0) {
            let total = 0
            data.user.currentCart.cart.shopCart.forEach(e => {
                total += e.quantity                
            })
            cartQuantity.innerText = total
        } else cartQuantity.style.display = 'none'
            
        
        return
    } catch (error) {
        cartBtn.style.display = 'none'
        logoutBtn.style.display = 'none'
        privateBtn.style.display = 'none'
        addProductBtn.style.display = 'none'
        adminBtn.style.display = 'none'
        registerBtn.style.display = ''
        loginBtn.style.display = ''
        return
    }
}

displayLogOut()


const logoutBtn = document.getElementById('logoutBtn')
const loginBtn = document.getElementById('loginBtn')
const registerBtn = document.getElementById('registerBtn')
const cartBtn = document.getElementById('cartBtn')

const handleClick = async() => {
    try {
        await fetch('http://localhost:5000/api/users/logout')
        document.cookie = "coderCookieToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.replace('http://localhost:5000/login?logout_status=success')
          displayLogOut()
    } catch (error) {
        
    }
}

logoutBtn.addEventListener('click', handleClick)
const displayLogOut = async() => {

    try {
        const response = await fetch('http://localhost:5000/api/users/check')
        const data = await response.json()
        loginBtn.style.display = 'none'
        registerBtn.style.display = 'none'
        return
    } catch (error) {
        cartBtn.style.display = 'none'
        logoutBtn.style.display = 'none'
        registerBtn.style.display = ''
        loginBtn.style.display = ''
        return
    }
}

displayLogOut()


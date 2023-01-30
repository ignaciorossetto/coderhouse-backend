const logoutBtn = document.getElementById('logoutBtn')
const loginBtn = document.getElementById('loginBtn')
const registerBtn = document.getElementById('registerBtn')

const handleClick = async() => {
    try {
        await fetch('http://localhost:5000/api/users/logout')
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
        logoutBtn.style.display = 'none'
        registerBtn.style.display = ''
        loginBtn.style.display = ''
        return
    }
}

displayLogOut()


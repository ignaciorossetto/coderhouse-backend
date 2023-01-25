const logoutBtn = document.getElementById('logoutBtn')
const loginBtn = document.getElementById('loginBtn')

const handleClick = async() => {
    try {
        const response = await fetch('http://localhost:5000/api/users/logout')
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Cerraste sesion correctamente!`,
            showConfirmButton: false,
            timer: 1500,
            toast: true
          })
          loginBtn.style.display = ''
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
        return
    } catch (error) {
        logoutBtn.style.display = 'none'
        return
    }
}

displayLogOut()


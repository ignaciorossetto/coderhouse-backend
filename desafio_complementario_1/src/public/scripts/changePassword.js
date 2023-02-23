const changePassForm = document.getElementById('changePassForm')
const confirmBtn = document.getElementById('confirmBtn')
const currentPass = document.getElementById('currentPass')
const newPass = document.getElementById('newPass')

confirmBtn.addEventListener('click', async(e)=> {
    const obj = {
        currentPass: currentPass.value,
        newPass: newPass.value
    }   
    currentPass.value = ''
    newPass.value = ''
    
    response = await axios.put('http://localhost:5000/api/users/changePassword', obj)
    console.log(response.data.errorCode);
    if (response.data.errorCode === 0) {
        return window.location.href = '/error?type=usernotfound' 
    }
    if (response.data.errorCode === 2) {
        return window.location.href = '/error?type=changepass_2' 
    }
    if (response.data.errorCode === 3) {
        return window.location.href = '/error?type=changepass_3' 
    }
})
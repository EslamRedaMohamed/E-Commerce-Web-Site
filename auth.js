import login from './login.js'
let loginBtn = document.getElementById('login-btn')

loginBtn.addEventListener('click', () => {
    
    let user = document.getElementById("user-name").value
    let pass = document.getElementById('password').value
    let result=login(user,pass)
    console.log(result);
    if(result==undefined){
        alert('user or pass invalid')
    }else{
        alert(`hello ${result.name}`)
    }
    
})
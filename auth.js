import login,{getLogged,logout} from './login.js'
let loginBtn = document.getElementById('login-btn')

loginBtn.addEventListener('click', () => {
    
    let user = document.getElementById("user-name").value
    let pass = document.getElementById('password').value
    let loginNow=login(user,pass)
    // if user or pass invalid set label to error message
    loginBtn.previousSibling.textContent=loginNow
})
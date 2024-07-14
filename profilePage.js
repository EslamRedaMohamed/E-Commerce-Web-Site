import { getLogged, logout } from "./login.js";


// Select elements
var logo = document.querySelector(".logo");
var userName = document.querySelector(".username");
var fullName = document.querySelector(".fullname");
var userGender = document.querySelector(".gender");
var userEmail = document.querySelector(".email");
var userPhone = document.querySelector(".phone");
var logoutButton=document.getElementById('logout')

logoutButton.addEventListener('click',()=>{
    logout()
    window.location='index.html'
})

// get user from cookie
var user=getLogged()

// Redirect to cat.html when logo is clicked
logo.addEventListener("click", function() {
    window.location.href = 'cat.html';
});

fullName.innerHTML=user['full_name']
userName.innerHTML=user['user_name']
userEmail.innerHTML=user['email']
userPhone.innerHTML=user['phone']
userGender.innerHTML=user['gender']
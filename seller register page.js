

window.onload = function(){
    fullName.focus()
}


var formInputs = document.getElementsByTagName(`input`)

var fullName = formInputs[0]
var userName = formInputs[1]
var userbth  = formInputs[2]
var userCountry = formInputs[3]
var userState = formInputs[4]
var userAddress = formInputs[5]
var userEmail = formInputs[6]
var userPhoneNumber = formInputs[7]
var userPasswd = formInputs[8]
var userPasswdConfirm = formInputs[9]
var userId = formInputs[10]
var userGeneder;
var radios = document.querySelectorAll(`input[type="radio"]`)
radios.forEach((radio) => {
    radio.addEventListener("change", function(){
        if(radio.checked){
            userGeneder = radio.value
        } 
      })
    })
var registerBtn = formInputs[13]
var invalidInputs = document.getElementById("invalid")
var warning = document.querySelectorAll(`span[class="warning"]`)



var nameRegx = /^[a-zA-Z0-9 ]{4,20}$/
var passRegx = /^.{8,12}$/
var mailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
var phoneRegx = /^(010|011|012|013|014|015)\d{8}$/

var fullNameVal;
var userNameVal;
var userbthVal
var userEmailVal;
var userPhoneNumberVal;
var userPasswdVal;
var userPasswdConfirmVal;
var userData;




fullName.addEventListener("blur", function(){
    if(!nameRegx.test(fullName.value)){
        fullName.style.background = "#f3f3f3"
        fullName.style.transform = "scale(1.02)"
        fullNameVal = false
        warning[0].innerText = "Invalid : use characters and space only"
        warning[0].style.color = "red"
        warning[0].style.fontSize = "14px"
    }
    else{   
        fullName.style.background = "initial"
        fullName.style.transform = "initial"   
        fullNameVal = true
        warning[0].innerText = ""
    }
})



userName.addEventListener("blur", function(){
    if(!nameRegx.test(userName.value)){
        userName.style.background = "#f3f3f3"
        userName.style.transform = "scale(1.02)"
        userNameVal = false
        warning[1].innerText = "Invalid : use characters and space only"
        warning[1].style.color = "red"
        warning[1].style.fontSize = "14px"
    }
    else{   
        userName.style.background = "initial"
        userName.style.transform = "initial"   
        userNameVal = true
        warning[1].innerText = ""
    }
})

userbth.addEventListener("blur", function(){
    
    var bthdate = new Date(userbth.value)
    var today = new Date()

    var cutoff = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())

    if(bthdate <= cutoff){
        userbth.style.background = "initial"
        userbth.style.transform = "initial"   
        userbthVal = true
        warning[2].innerText = ""
    }
    else{
        userbth.style.background = "#f3f3f3"
        userbth.style.transform = "scale(1.02)"
        userbthVal = false
        warning[2].innerText = "To be seller, you need to be older than 18"
        warning[2].style.color = "red"
        warning[2].style.fontSize = "14px"
    }
})


userEmail.addEventListener("blur", function(){
    if(!mailRegx.test(userEmail.value)){
        userEmail.style.background = "#f3f3f3"
        userEmail.style.transform = "scale(1.02)"
        userEmailVal = false
        warning[6].innerText = "Invalid : ---@--.--"
        warning[6].style.color = "red"
        warning[6].style.fontSize = "14px"
    }
    else{   
        userEmail.style.background = "initial"
        userEmail.style.transform = "initial"   
        userEmailVal = true
        warning[6].innerText = ""
    }
})




userPhoneNumber.addEventListener("blur", function(){
    if(!phoneRegx.test(userPhoneNumber.value)){
        userPhoneNumber.style.background = "#f3f3f3"
        userPhoneNumber.style.transform = "scale(1.02)"
        userPhoneNumberVal = false
        warning[7].innerText = "Invalid phone number"
        warning[7].style.color = "red"
        warning[7].style.fontSize = "14px"
    }
    else{   
        userPhoneNumber.style.background = "initial"
        userPhoneNumber.style.transform = "initial"   
        userPhoneNumberVal = true
        warning[7].innerText = ""
    }
})



userPasswd.addEventListener("blur", function(){
    if(!passRegx.test(userPasswd.value)){
        userPasswd.style.background = "#f3f3f3"
        userPasswd.style.transform = "scale(1.02)"
        userPasswdVal = false
        warning[8].innerText = "Invalid : Not less 8 length "
        warning[8].style.color = "red"
        warning[8].style.fontSize = "14px"
    }
    else{   
        userPasswd.style.background = "initial"
        userPasswd.style.transform = "initial"   
        userPasswdVal = true
        warning[8].innerText = ""
    }
})



userPasswdConfirm.addEventListener("blur", function(){
    if(userPasswdConfirm.value !== userPasswd.value){
        userPasswdConfirm.style.background = "#f3f3f3"
        userPasswdConfirm.style.transform = "scale(1.02)"
        userPasswdConfirmVal = false
        warning[9].innerText = "Invalid : Not match "
        warning[9].style.color = "red"
        warning[9].style.fontSize = "14px"
    }
    else{   
        userPasswdConfirm.style.background = "initial"
        userPasswdConfirm.style.transform = "initial"   
        userPasswdConfirmVal = true
        warning[9].innerText = ""
    }
})



registerBtn.addEventListener("click", function(event){
    if(!(fullNameVal && userNameVal && userEmailVal && userPhoneNumberVal && userPasswdVal && userPasswdConfirmVal && userGeneder)){
        event.preventDefault()      
        invalidInputs.innerText = "Missing Inputs"
        invalidInputs.style.color = "red"
    }   
    else{
        userData = {
            "full_name" : userName.value,
            "user_name" : userName.value,
            "password"  : userPasswd.value,
            "email"     : userEmail.value,
            "phone"     : userPhoneNumber.value
        }
        console.log("submitted succesfully")
    }
})





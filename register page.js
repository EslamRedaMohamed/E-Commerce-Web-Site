

window.onload = function(){
    fullName.focus()
}


var formInputs = document.getElementsByTagName(`input`)

var fullName = formInputs[0]
var userName = formInputs[1]
var userEmail = formInputs[2]
var userPhoneNumber = formInputs[3]
var userPasswd = formInputs[4]
var userPasswdConfirm = formInputs[5]
var userGeneder;
var radios = document.querySelectorAll(`input[type="radio"]`)
radios.forEach((radio) => {
    radio.addEventListener("change", function(){
        if(radio.checked){
            userGeneder = radio.value
        } 
    })
    })
var registerBtn = formInputs[8]
var invalidInputs = document.getElementById("invalid")
var warning = document.querySelectorAll(`span[class="warning"]`)



var nameRegx = /^[a-zA-Z0-9 ]{4,20}$/
var passRegx = /^.{8,12}$/
var mailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
var phoneRegx = /^(010|011|012|013|014|015)\d{8}$/

var fullNameVal;
var userNameVal;
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



userEmail.addEventListener("blur", function(){
    if(!mailRegx.test(userEmail.value)){
        userEmail.style.background = "#f3f3f3"
        userEmail.style.transform = "scale(1.02)"
        userEmailVal = false
        warning[2].innerText = "Invalid : ---@--.--"
        warning[2].style.color = "red"
        warning[2].style.fontSize = "14px"
    }
    else{   
        userEmail.style.background = "initial"
        userEmail.style.transform = "initial"   
        userEmailVal = true
        warning[2].innerText = ""
    }
})




userPhoneNumber.addEventListener("blur", function(){
    if(!phoneRegx.test(userPhoneNumber.value)){
        userPhoneNumber.style.background = "#f3f3f3"
        userPhoneNumber.style.transform = "scale(1.02)"
        userPhoneNumberVal = false
        warning[3].innerText = "Invalid phone number"
        warning[3].style.color = "red"
        warning[3].style.fontSize = "14px"
    }
    else{   
        userPhoneNumber.style.background = "initial"
        userPhoneNumber.style.transform = "initial"   
        userPhoneNumberVal = true
        warning[3].innerText = ""
    }
})



userPasswd.addEventListener("blur", function(){
    if(!passRegx.test(userPasswd.value)){
        userPasswd.style.background = "#f3f3f3"
        userPasswd.style.transform = "scale(1.02)"
        userPasswdVal = false
        warning[4].innerText = "Invalid : Not less 8 length "
        warning[4].style.color = "red"
        warning[4].style.fontSize = "14px"
    }
    else{   
        userPasswd.style.background = "initial"
        userPasswd.style.transform = "initial"   
        userPasswdVal = true
        warning[4].innerText = ""
    }
})



userPasswdConfirm.addEventListener("blur", function(){
    if(userPasswdConfirm.value !== userPasswd.value){
        userPasswdConfirm.style.background = "#f3f3f3"
        userPasswdConfirm.style.transform = "scale(1.02)"
        userPasswdConfirmVal = false
        warning[5].innerText = "Invalid : Not match "
        warning[5].style.color = "red"
        warning[5].style.fontSize = "14px"
    }
    else{   
        userPasswdConfirm.style.background = "initial"
        userPasswdConfirm.style.transform = "initial"   
        userPasswdConfirmVal = true
        warning[5].innerText = ""
    }
})



registerBtn.addEventListener("click", function(event) {
    event.preventDefault();

    if (!(fullNameVal && userNameVal && userEmailVal && userPhoneNumberVal && userPasswdVal && userPasswdConfirmVal && userGeneder)) {
        invalidInputs.innerText = "Missing Inputs";
        invalidInputs.style.color = "red";
    } else {
        let userData = {
            full_name: fullName.value,
            user_name: userName.value,
            password: userPasswd.value,
            email: userEmail.value,
            phone: userPhoneNumber.value,
            gender: userGeneder
        };

        fetch('https://my-json-server.typicode.com/EslamRedaMohamed/Elsouq-json-server/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Optionally reset form fields or show a success message
            window.location.replace('login.html');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
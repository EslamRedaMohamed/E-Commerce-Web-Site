import login from './login.js';

let loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', () => {
    let user = document.getElementById("user-name").value;
    let pass = document.getElementById('password').value;
    let result = login(user, pass);
    
    if (result === undefined) {
        alert('Invalid username or password');
    } else {
        alert(`Hello ${result.user_name}`);// Assuming 'name' is a property of the user object
        // Redirect or perform other actions after successful login
    }
});
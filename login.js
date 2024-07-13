import allUsers from './users.js';
console.log("inlogin",allUsers)
const login = function(user, pass) {
    return allUsers.find((userf) => userf.user_name === user && userf.password === pass);
}

export default login;

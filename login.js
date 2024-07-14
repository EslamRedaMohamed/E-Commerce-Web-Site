console.log('from login');
import allUsers from './users.js';
const d = new Date();
const login=function(username,pass){
	// check user credentials
	let user=allUsers.find((userf) => userf.user_name == username && userf.password == pass);
	// calculate expire time
	
    d.setTime(d.getTime() + (5* 60 * 1000));//expire after 5 minutes(logout after 5 minutes)
    let expires = "expires="+d.toUTCString();

	if(user!=undefined){
		// setting user object in cookie
		document.cookie = `user=${JSON.stringify(user)};${expires};path=/`;
		window.location='index.html'
	}
	else{
		return "invalid user or pass"
	}
	
}
// clear cookie for logout
const logout=function(){
	sessionStorage.clear();
	// set expire date to past to clear cookie
	document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const getLogged=function () {
    let name = "user=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
        c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
        return JSON.parse(c.substring(name.length, c.length));
    }
    }
    return null;
}
export default login
export {logout,getLogged}

console.log('from login');
import users from './users.js' 
const d = new Date();
const login=function(username,pass){
	// check user credentials
	let user=users.find((userf)=>userf.name==username && userf.pass==pass)
	// calculate expire time
	
    d.setTime(d.getTime() + (2* 60 * 1000));//expire after 2 minutes
    let expires = "expires="+d.toUTCString();

	if(user!=undefined){
		document.cookie = `user=${JSON.stringify(user)};${expires};path=/`;
		console.log(user+" logged in");
		console.log(document.cookie);
		window.location='./home.html'
	}
	else{
		return "invalid user or pass"
	}
	
}
const logout=function(){
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















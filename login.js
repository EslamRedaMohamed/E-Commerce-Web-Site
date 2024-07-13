
console.log('from login');
import users from './users.js' 

const login=function(user,pass){
	console.log(users);
	return users.find((userf)=>userf.name==user && userf.pass==pass)
	
}
export default login















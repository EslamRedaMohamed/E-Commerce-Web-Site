/*
commands for start json server:

sudo npm install -g json-server

then
creat file json db.json
{
users:[]
}

json-server --watch db.json --port 3000
now server is runnig ^_^
*/

const allUsers =await fetchUsers(); 

async function fetchUsers() {
    try {
        var response = await fetch('https://my-json-server.typicode.com/EslamRedaMohamed/Elsouq-json-server/users');
        var data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        console.log("Users Fetched");
    }
}
console.log(allUsers)
export default allUsers;
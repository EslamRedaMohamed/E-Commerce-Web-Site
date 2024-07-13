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
        var response = await fetch('http://localhost:3000/users');
        var data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    finally{
        console.log("users Fetched");
    }
}

export default allUsers;
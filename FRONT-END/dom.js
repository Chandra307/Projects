const form = document.getElementById('user-form');

const ul = document.querySelector('#item-list');


async function deleteUser(id){
    try{
        await axios.get(`http://localhost:3000/user/delete-user/${id}`);
        document.getElementById(id).remove();
    }
    catch{
        console.log('Error - delete request');
    }
}

function displayDetails(obj){
    let li = document.createElement('li');
    li.id = obj.id;
    li.innerHTML = `${obj.username} - ${obj.email} <button onclick='deleteUser(${obj.id})'>Delete</button> <button onclick='editUser(${obj.id})'>Edit</button>`;
    ul.appendChild(li);
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    let username = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('mail').value;
    let obj = {
        username,
        phone,
        email
    }

    let id = document.querySelector('#hidden');
    if(id){
        try {
            obj.id = id.value;                    
            console.log(obj,'id.val');
            let result = await axios.post(`http://localhost:3000/edit-user/`,obj);
            console.log(result);
            displayDetails(result);
            document.getElementById('user-form').reset();
        }
        catch {
            console.log('Error - edit request');
        }
    }
    else {
        try {                    
            console.log(obj,'not-id');
            let result = await axios.post(`http://localhost:3000/add-user`,obj);
            displayDetails(result.data);
            document.getElementById('user-form').reset();
        }
        catch {
            console.log('Error - post request');
        }
    }
})

window.addEventListener('DOMContentLoaded', async() => {
    try {

        let result = await axios.get('http://localhost:3000/get-users');
        result.data.forEach(user => {
            displayDetails(user);
        })
    }
    catch {
        console.log('Error - get request');
    }
});


async function editUser(id){
    try{

        let result = await axios.get(`http://localhost:3000/edit-user/${id}`);
        document.getElementById('user-form').setAttribute('action',`http://localhost:3000/edit-user`);
        document.getElementById('submit').textContent = 'Update';
        console.log(result.data,'wait');
        form.innerHTML += `<input type='hidden'id='hidden' name='id' value='${id}'> `;
        console.log(document.querySelector('#hidden'));

        document.getElementById('name').value = result.data.username;
        document.getElementById('mail').value = result.data.email;
        document.getElementById('phone').value = result.data.phone;
        document.getElementById(id).remove();
    }
    catch {
        console.log('Error');
    }
}
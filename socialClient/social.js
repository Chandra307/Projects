const createBtn = document.getElementById('create');
const ul = document.getElementById('posts');

createBtn.onclick = async(e) => {
    e.preventDefault();
    const link = document.getElementById('link').value;
    const desc = document.getElementById('desc').value;
    let obj = {
        link,
        desc
    }
    result = await axios.post('http://localhost:7000/add-post',obj);
    console.log(result.data);
    displayPosts(obj);
}

// window.addEventListener('DOMContentLoaded',async() => {
//     try{
//         result = axios.get('http://localhost:6000/get-posts');
//         console.log(result.data);
//     }
//     catch(err){
//         console.log(err);
//     }
// })

function displayPosts(obj){
    const li = document.createElement('li');
    ul.innerHTML += `<li id='${obj.desc}'><img src='${obj.link}' alt='image' width='150px' height='150px'>
    <p>${obj.desc}</p><button onclick='displayComment("${obj.desc}")'>Comment</button><br></li>`
    
}

function displayComment(id){
    console.log(id);
    document.getElementById(id).innerHTML += `<div class='comment' id='div-${id}'><input type='text' name='comment' placeholder='Comment here'>
    <button id='comment' onclick='addComment("div-${id}",event)'>Send</button></div>`
}

function addComment(id,e){
    e.preventDefault();
    console.log(document.getElementById(id).firstElementChild.value);
    let comment = document.getElementById(id).firstElementChild.value;
    document.getElementById(id).innerHTML += `<p><sup>Anonymous:</sup> ${comment}</p>`;
}

export const apiUrl = `https://jsonplaceholder.typicode.com/users`;
let userList = [];
let currentUserId = null;

export async function getuserlist() {

    const response = await fetch(apiUrl);
    userList = await response.json();
    console.log("response", response, userList);
    rerender()
}
export async function rerender() {
    const userdisplay = document.getElementById("useres");
    userdisplay.innerHTML = "";
    userList.forEach(element => {
        const li = document.createElement('li');
        li.innerHTML = `${element.name},(${element.email})
        <button onClick="editUser(${element.id},'${element.name}','${element.email}')">Edit</button><button onClick="handleDelete(${element.id})">Delete</button>`;
        userdisplay.appendChild(li);
    });

}
getuserlist();

export async function handlesubmit(e) {
    e.preventDefault();
    console.log("wellcome..");
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    console.log(name, email, 'add');
    const newUser = {
        id: userList.length + 1,
        name,
        email
    };
    userList.push(newUser);
    console.log(newUser, 'addnew')
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    });
    console.log(await response.json(), 'addres');
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    rerender();
    console.log(userList, 'afteraddres')
}

export function editUser(id, name, email) {
    currentUserId = id;
    console.log(id, name, email, 'edit');
    document.getElementById("edit-name").value = name;
    document.getElementById("edit-email").value = email;
}
export async function handleupdate(e) {
    e.preventDefault();
    const updatedName = document.getElementById('edit-name').value;
    const updatedEmail = document.getElementById('edit-email').value;

    const response = await fetch(`${apiUrl}/${currentUserId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: currentUserId, name: updatedName, email: updatedEmail })
    });
    //const newUser = await response.json();
    const updatedUser = {
        id: currentUserId,
        name: updatedName,
        email: updatedEmail
    };
    userList = userList.map(user => user.id === currentUserId ? updatedUser : user);
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    rerender();
}
export async function handleDelete(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    console.log(userList, 'BEfDele');
    userList = userList.filter(user => user.id !== id);
    rerender();
    console.log(userList, 'afterDele');
}
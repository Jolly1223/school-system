const content = document.querySelector('#content');
const submit = document.querySelector('#submit');
const update = document.querySelector('#updateBtn');
window.addEventListener('load', () => {

    getUsers();

});

submit.addEventListener('click', () => {
    let fullname = document.querySelector('#fullName').value;
    let email = document.querySelector('#email').value;

    console.log(fullname);
    let formData = { fullname, email };

    fetch('http://localhost:5000/student/add', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    fullname.value = "";
    email.value = "";
})

function getUsers() {
    let html = "";


    fetch('http://localhost:5000/student/')
        .then(response => {
            console.log(response);
            return response.json();
        }).then(data => {
            data.forEach(element => {
                html += `<li>${element.fullname} ${element.email} <a href="javascript:void(0)" onclick="deleteMember('${element._id}')">Delete</a> <a href="javascript:void(0)" onclick="editMember('${element._id}')">Edit</a></li>`;
            })
            content.innerHTML = html;


        }).catch(error => {
            console.log(error);
        });
}

function deleteMember(_id) {
    let formData = { _id };
    fetch('http://localhost:5000/student/' + _id, {
            method: 'DELETE',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.text())
        .then(response => console.log(response))
        .catch(error => console.log(error));
}

function editMember(_id) {
    console.log("update");
    fetch(`http://localhost:5000/student/${_id}`)
        .then(res => res.json())
        .then((data) => {
            document.querySelector('#fullName').value = data.fullname;
            document.querySelector('#email').value = data.email;
            document.querySelector('#ID').value = data._id;

        });
}

update.addEventListener('click', () => {
    let fullname = document.querySelector('#fullName').value;
    let email = document.querySelector('#email').value;
    let id = document.querySelector('#ID').value;

    console.log(fullname);
    let formData = { fullname, email };

    fetch(`http://localhost:5000/student/update/${id}`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
})
function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', getPhonebook);
    document.getElementById('btnCreate').addEventListener('click', appendContact);

    getPhonebook();
}

attachEvents();

async function appendContact(){
    const person = document.getElementById('person').value;
    const phone = document.getElementById('phone').value;
    await postContact({'person': person, 'phone': phone});
    document.getElementById('person').value = '';
    document.getElementById('phone').value = '';
}
async function postContact(person){
    await fetch('https://localhost:3030/jsonstore/phonebook', {
        method: 'POST',
        body: JSON.stringify(person),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
async function getPhonebook(){
    const res = await fetch('https://localhost:3030/jsonstore/phonebook');
    const data = await res.json();
    document.getElementById('phonebook').innerHTML = '';
    Object.values(data).map(appendPhonebook);
}
async function deleteContact(id){
    const url = `https://localhost:3030/jsonstore/phonebook/${id}`;
    await fetch(url, {method: 'DELETE'});
}
function appendPhonebook(){
    const phonebook = document.getElementById('phonebook');
    const liEl = document.createElement('li');
    liEl.textContent = `${person.person}: ${person.phone}`;
    const button = document.createElement('button');
    button.id = person._id;
    button.textContent = 'Delete';
    liEl.appendChild(button);

    button.addEventListener('click', (e) => {
        deleteContact(e.target.id);
        liEl.remove();
    })
    phonebook.appendChild(liEl);
}
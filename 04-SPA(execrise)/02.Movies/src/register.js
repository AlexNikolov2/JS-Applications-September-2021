import { showHome } from './home.js';

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('repeatPassword');

    if(email == '' || password == '') {
        return alert('All fields are required!');
    } else if(password != repass) {
        return alert('Passwords don\'t match!');
    }
    const url = `http://localhost:3030/users/register`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    }
    const response = await fetch(url, options);

    if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('email', data.email);

        document.getElementById('welcome-msg').textContent = `Welcome, ${email}`;
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'block');
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'none');

        showHome();
    } else {
        const error = await response.json();
        alert(error.message);
        event.target.reset();
    }
}

let main;
let section;

export function setupRegister(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    const form = section.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

export async function showRegister() {
    main.innerHTML = '';
    main.appendChild(section);
}
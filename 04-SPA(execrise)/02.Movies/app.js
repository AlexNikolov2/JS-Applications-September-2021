
import { setupHome, showHome } from './src/home.js';
import { setupDetails } from './src/details.js';
import { setupLogin, showLogin } from './src/login.js';
import { setupRegister, showRegister } from './src/register.js';
import { setupCreate, showCreate } from './src/create.js';
import { setupEdit } from './src/edit.js';

const main = document.querySelector('main');

const links = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
    'createLink': showCreate
}

setupSection('home-page', setupHome);
setupSection('add-movie', setupCreate);
setupSection('movie-details', setupDetails);
setupSection('edit-movie', setupEdit);
setupSection('form-login', setupLogin);
setupSection('form-sign-up', setupRegister);

setupNavigation();

showHome();

function setupSection(sectionId, setup) {
    const section = document.getElementById(sectionId);
    setup(main, section);
}

function setupNavigation() {
    const email = sessionStorage.getItem('email');
    if (email != null) {
        document.getElementById('welcome-msg').textContent = `Welcome, ${email}`;
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'block');
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'none');
    } else {
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'block');
    }


    document.querySelector('nav').addEventListener('click', (event) => {
        if (event.target.tagName == 'A') {
            const view = links[event.target.id];
            if (typeof view == 'function') {
                event.preventDefault();
                view();
            }
        }
    });
    document.getElementById('createLink').addEventListener('click', (event) => {
        event.preventDefault();
        showCreate();
    });
    document.getElementById('logoutBtn').addEventListener('click', logout);
}

async function logout() {
    const token = sessionStorage.getItem('authToken');
    const url = `http://localhost:3030/users/logout`;
    const options = {
        method: 'get',
        headers: {
            'X-Authorization': token
        }
    }
    const response = await fetch(url, options);

    if (response.ok) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('email');

        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'block');

        showHome();
    } else {
        const error = await response.json();
        alert(error.message);
    }
}
import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout as apiLogout } from './api/data.js';
import { getUserData } from './api/session.js';

import * as api from './api/data.js';
window.api = api;

import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { homePage } from './views/home.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';

const main = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();


page(decorateContext);
page('/login', loginPage);
page('/register', registerPage);
page('/', homePage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    ctx.user = getUserData();
    next();
}

function setUserNav() {
    const user = getUserData();
    if (user) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        document.getElementById('user-greeting').style.display = '';
        document.getElementById('logoutBtn').style.display = '';
        document.getElementById('greeting').textContent = `Welcome ${user.email}`;
    } else {
        document.getElementById('login').style.display = '';
        document.getElementById('register').style.display = '';
        document.getElementById('user-greeting').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none';
    }
}

function logout() {
    apiLogout();
    setUserNav();
    page.redirect('/');
}
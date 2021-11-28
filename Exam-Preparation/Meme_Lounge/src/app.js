import {render} from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'

import { logout as apiLogout } from './api/data.js'

import { renderCatalog } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';

const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();

page('/', renderMiddleware, homePage);
page('/register', renderMiddleware, registerPage);
page('/login', renderMiddleware, loginPage);
page('/catalog', renderMiddleware, renderCatalog);
page('/create', renderMiddleware, createPage);
page('/details/:id', renderMiddleware, detailsPage);
page('/edit/:id', renderMiddleware, editPage);
page('/profile', renderMiddleware, profilePage);

page.start();

function renderMiddleware(ctx, next) {
    ctx.render = (view) => render(view, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav(){
    const email = sessionStorage.getItem('email');

    if(email){
        document.querySelector('.user').style.display = '';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('div .profile > span').textContent = `Welcome ${email}`;
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = '';
    }

}
async function logout(){
    await apiLogout();
    setUserNav();
    page.redirect('/');

}

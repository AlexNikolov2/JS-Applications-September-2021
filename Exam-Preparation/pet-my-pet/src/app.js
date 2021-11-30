import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { registerPage } from './views/register.js';
import * as api from './api/data.js';
import { dashboardPage } from './views/dashboard.js';
import { loginPage } from './views/login.js';
import {logout} from './api/api.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myProfilePage } from './views/profile.js';

window.api = api;

const main = document.getElementsByTagName('main')[0];


page('/', decorateContext, dashboardPage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/create',decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/myProfile',decorateContext, myProfilePage);


setUserNav();
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const email = sessionStorage.getItem('email');
    if (email != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('welcomeEmail').textContent = `Welcome, ${sessionStorage.email}`

    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

document.getElementById('logout').addEventListener('click',async function(){

    if (sessionStorage.length !== 0) {
        await logout();
        setUserNav();
        page.redirect('/');
    }
});
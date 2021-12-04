import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs'
import { logout as apiLogout } from './api/api.js';
import { getUserData } from './api/session.js';
import { loginPage } from './views/login.js';
import {registerPage } from './views/register.js';
import {homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { searchPage } from './views/search.js';
import { editPage } from './views/edit.js';

import * as api from './api/data.js';
window.api = api;

const main = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();

page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/search', decorateContext, searchPage);
page('/edit/:id', decorateContext, editPage);

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
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

function logout() {
    apiLogout();
    setUserNav();
    page.redirect('/');
}
import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { homePage } from './views/home.js'
import * as api from './api/data.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import {editPage} from './views/edit.js';
import { searchPage } from './views/search.js';


window.api = api;

const main = document.getElementById('main-content');

page('/', decorateContext, homePage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage);
page('/login', decorateContext, loginPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/search',decorateContext, searchPage);


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

    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

document.getElementById('logout').addEventListener('click', async function () {

    if (sessionStorage.length !== 0) {
        await api.logout();
        setUserNav();
        page.redirect('/');
    }
});
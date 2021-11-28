import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { homePage } from './views/home.js'
import * as api from './api/data.js';
import { catalogPage } from './views/catalog.js';
import {loginPage} from './views/login.js';
import {registerPage} from './views/register.js';
import { createPage } from './views/create.js';
import {detailsPage} from './views/details.js';
import {editPage} from './views/edit.js';
import {profilePage} from './views/profile.js'
import { searchPage } from './views/search.js';


window.api = api;

const main = document.getElementById('site-content');

page('/', decorateContext, homePage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage);
page('/login', decorateContext, loginPage);
page('/create',decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/profile',decorateContext, profilePage);
page('/search',decorateContext, searchPage);

setUserNav();
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const username = sessionStorage.getItem('username');
    if (username != null) {
        document.getElementById('profile').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('welcomeUsername').textContent = `Welcome, ${sessionStorage.username}`

    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

document.getElementById('logout').addEventListener('click',async function(){

    if (sessionStorage.length !== 0) {
        await api.logout();
        setUserNav();
        page.redirect('/');
    }
});
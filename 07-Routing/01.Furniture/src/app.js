import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout } from './api/data.js'
import { edit } from './views/edit.js';
import { createFurnitureView } from './views/create.js';
import { catalog } from './views/catalog.js';
import { details } from './views/details.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { myProfile } from './views/profile.js';

const main = document.querySelector('main');

page('/',decorateContext,catalog);
page('/dashboard',decorateContext,catalog);
page('/details/:id',decorateContext,details);
page('/create',decorateContext,createFurnitureView);
page('/edit/:id',decorateContext,edit);
page('/register',decorateContext,registerPage);
page('/login',decorateContext,loginPage);
page('/my-furniture',decorateContext,myProfile);

document.getElementById('logoutBtn').addEventListener('click',async() =>{
    await logout();
    setUserNav();
    page.redirect('/');
})

setUserNav();
//Start application
page.start();


function decorateContext(ctx,next) {
    ctx.render = (content) => render(content,main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');

    if(userId != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}
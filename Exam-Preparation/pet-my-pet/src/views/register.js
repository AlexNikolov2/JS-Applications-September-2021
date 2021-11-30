import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js'

const registerTemplate = (onSubmit) => html`
<section id="register-page" class="register">
    <form @submit = ${onSubmit} id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>
`;

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit))
    async function onSubmit(e) {
        e.preventDefault();
        const createForm = document.getElementById('register-form');
        let formData = new FormData(createForm);

        
        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('confirm-pass');
        
        if (email === '' || password === '' || rePass === '') {
           return window.alert(`all fields must be filled`)
        } 
        if(password != rePass) {
            return window.alert('passwords do not match')
        }
            await register(email, password, rePass)
            ctx.setUserNav();
            ctx.page.redirect('/');
        
    }

}
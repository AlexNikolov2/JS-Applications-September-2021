import { html } from '../../node_modules/lit-html/lit-html.js'
import { getMyPets } from '../api/data.js'
import { itemTemplate } from '../item.js';

const myProfileTemplate = (data) => html`
    <section id="my-pets-page" class="my-pets">
        <h1>My Pets</h1>
        <ul class="my-pets-list">
        ${(data.length === 0)? html`<p class="no-pets">No pets in database!</p>`
        :
        html`${data.map(itemTemplate)}`
        }
        </ul> 
    </section>
`;

export async function myProfilePage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const data = await getMyPets(userId)
    ctx.render(myProfileTemplate(data));
}
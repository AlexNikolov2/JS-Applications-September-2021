import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllPets } from '../api/data.js';
import { itemTemplate } from '../item.js'


const dashboardTemplate = (data) => html`
<section id="home-page" class="content">
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        
        
        ${data.length === 0 ? html`
        <p class="no-pets">No pets in database!</p>`
        : 
        html`<ul class="other-pets-list">
            ${data.map(itemTemplate)}
        </ul>`
        }
    </section>
</section>
`;

export async function dashboardPage(ctx) {
    const data = await getAllPets()
    ctx.setUserNav();
    ctx.render(dashboardTemplate(data))
}
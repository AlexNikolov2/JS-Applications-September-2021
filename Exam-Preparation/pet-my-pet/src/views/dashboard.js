import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllPets } from '../api/data.js';

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

const itemTemplate = (item) => html`
<li class="otherPet">
    <h3>Name: ${item.name}</h3>
    <p>Type: ${item.type}</p>
    <p class="img"><img src="${item.imageUrl}"></p>
    <a class="button" href="/details/${item._id}">Details</a>
</li>
`;
export async function dashboardPage(ctx) {
    const data = await getAllPets()
    console.log(data)
    ctx.setUserNav();
    ctx.render(dashboardTemplate(data))
}
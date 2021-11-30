import { html } from '../../node_modules/lit-html/lit-html.js'
import { getMyPets } from '../api/data.js'


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

const itemTemplate = (item) => html`
<li class="otherPet">
    <h3>Name: ${item.name}</h3>
    <p>Type: ${item.type}</p>
    <p class="img"><img src=${item.imageUrl}></p>
    <a class="button" href="/details/${item._id}">Details</a>
</li>
`;

export async function myProfilePage(ctx) {
    const userId = sessionStorage.getItem('userId');

    const data = await getMyPets(userId)
    ctx.render(myProfileTemplate(data));
}
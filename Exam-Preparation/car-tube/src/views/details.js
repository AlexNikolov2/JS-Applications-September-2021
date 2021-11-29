import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteCar, getCarById } from '../api/data.js';



const detailsTemplate = (details,onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${details.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${details.brand}</li>
            <li><span>Model:</span>${details.model}</li>
            <li><span>Year:</span>${details.year}</li>
            <li><span>Price:</span>${details.price}$</li>
        </ul>
        <p class="description-para">${details.description}</p>
        <div class="listings-buttons">
            ${(details._ownerId === sessionStorage.getItem('userId'))
            ? html`<a href="/edit/${details._id}" class="button-list">Edit</a><a @click = ${onDelete} href="javascript:void(0)" class="button-list">Delete</a>`
            : html``
            }
        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const details = await getCarById(ctx.params.id)
    ctx.render(detailsTemplate(details,onDelete))

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete the item?');
        if (confirmed) {
            await deleteCar(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}
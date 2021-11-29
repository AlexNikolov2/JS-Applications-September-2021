import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllCars } from '../api/data.js';

const allListingsTemplate = (data) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
    </div>
    ${(data.length != 0)
        ? html`${data.map(itemTemplate)}`
        : html`
    <p class="no-cars">No cars in database.</p>
    `
    }
`;

const itemTemplate = (item) => html`
    <div class="listing">
        <div class="preview">
            <img src=${item.imageUrl}>
        </div>
        
        <h2>${item.brandModel}</h2>
        <div class="info">
            <div class="data-info">
                <h3>${item.year}</h3>
                <h3>${item.price}$</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${item._id}" class="button-carDetails">Details</a>
            </div>
        </div>
        </div>
`;

export async function catalogPage(ctx) {
    const data = await getAllCars();
    data.forEach(element => {
        element.brandModel = `${element.brand} ${element.model}`;   
    });
    ctx.render(allListingsTemplate(data));
   

    
}
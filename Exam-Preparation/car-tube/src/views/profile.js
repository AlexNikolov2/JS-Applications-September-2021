import { html } from '../../node_modules/lit-html/lit-html.js'
import { getMyCars } from '../api/data.js'


const myListingsTemplate = (data) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
      ${
          (data.length!==0)
          ? html`${data.map(itemTemplate)}`
          
          : html`<p class="no-cars"> You haven't listed any cars yet.</p>`
      }   
    </div>
</section>
`;

let itemTemplate = (car) => html`
<div class="listing">
            <div class="preview">
                <img src=${car.imageUrl}>
            </div>
            <h2>${car.brandModel}</h2>
            <div class="info">
                <div class="data-info">
                    <h3>Year: ${car.year}</h3>
                    <h3>Price: ${car.price}</h3>
                </div>
                <div class="data-buttons">
                    <a href="/details/${car._id}" class="button-carDetails">Details</a>
                </div>
            </div>
        </div>
`;

export async function profilePage(ctx) {
    const userId = sessionStorage.getItem('userId');
    
    const data = await getMyCars(userId)

    data.forEach(c => {
        c.brandModel = `${c.brand} ${c.model}`;   
    });
        ctx.render(myListingsTemplate(data));
   
}
import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllCars } from '../api/data.js';

const catalogTemplate = (cars) => html`
 <section id="car-listings">
            <h1>Car Listings</h1>
            <div class="listings">
                ${cars.length == 0 ?
                 html`<p class="no-cars">No cars in database.</p>`
                : cars.map(carTemplate)}         
            </div>
        </section>`

export async function catalogPage(ctx){
    const cars = await getAllCars();
    cars.forEach(car => {
        car.brandModel = `${car.brand} ${car.model}`;   
    });
    ctx.render(catalogTemplate(cars));
}

const carTemplate = (car) => html`
<div class="listing">
                    <div class="preview">
                        <img src=${car.imageUrl}>
                    </div>
                    <h2>${car.brandModel}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>${car.year}</h3>
                            <h3>${car.price}</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/details/${car._id}" class="button-carDetails">Details</a>
                        </div>
                    </div>
                </div>
                `;

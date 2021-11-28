import { html } from '../../node_modules/lit-html/lit-html.js';
import { createCar } from '../api/data.js';

const createTemplate = (onSubmit) => html`
<section id="create-listing">
    <div class="container">
        <form @submit = ${onSubmit} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>
            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">
            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">
            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">
            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">
            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">
            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">
            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`;

export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit))


    async function onSubmit(event) {
        event.preventDefault();
        const createForm = document.getElementById('create-form');
        let formData = new FormData(createForm);

        let brand = formData.get('brand');
        let model = formData.get('model');
        let description = formData.get('description');
        let year = Number(formData.get('year'));
        let imageUrl = formData.get('imageUrl');
        let price = Number(formData.get('price'));
        
        if(price === ''||imageUrl ===''|| year === ''||description === ''||model ===''|| brand === ''){
           return window.alert('all fields must be filled')
        }
        const car = {
            brand,
            model,
            description,
            year,
            imageUrl,
            price
        }

        await createCar(car);
        ctx.setUserNav();
        ctx.page.redirect('/allListings');
    }
}
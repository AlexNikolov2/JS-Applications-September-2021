import {html} from '../../node_modules/lit-html/lit-html.js';
import {getAllFurniture} from '../api/data.js';
import { itemTemplate } from '../util.js';

export const catalogTemplate = (data) => html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
            ${data.map(itemTemplate)}
        </div>
`

export async function catalog(ctx) {
    const catalog = await getAllFurniture();
    ctx.render(catalogTemplate(catalog));
}
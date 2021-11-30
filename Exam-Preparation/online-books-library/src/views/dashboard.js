import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../api/data.js';
import {itemTemplate} from '../temp/item.js';

const dashboardTemplate = (data) => html`
<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
    <ul class="other-books-list">
        ${data.length == 0 ? 
        html`<p class="no-books">No books in database!</p>` 
        : data.map(itemTemplate)}
    </ul>
</section>`

export async function dashboardPage(ctx) {
    const data = await getAllBooks();
    ctx.render(dashboardTemplate(data));
}
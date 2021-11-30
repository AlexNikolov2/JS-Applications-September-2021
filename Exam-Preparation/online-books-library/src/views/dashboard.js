import {html} from '../../node_modules/lit-html/lit-html.js';

import {itemTemplate} from '../temp/item.js';

const dashboardTemplate = (data) => html`
<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
${data.length === 0 ? html`
        <p class="no-books">No books in database!</p>`
        : 
        html`<ul class="other-books-list">
            ${data.map(itemTemplate)}
        </ul>`
        }
</section>`
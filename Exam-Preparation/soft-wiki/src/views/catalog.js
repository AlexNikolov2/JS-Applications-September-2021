import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllArticles } from '../api/data.js';
import { itemTemplate } from '../temp/item.js';


const catalogTemplate = (data) => html`
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>
    ${(data.length!=0)
        ?html`${data.map(itemTemplate)}`
        :html`<h3 class="no-articles">No articles yet</h3>`
    }
    
</section>
`;

export async function catalogPage(ctx) {
    
    const data = await getAllArticles();
    ctx.render(catalogTemplate(data));

    
}
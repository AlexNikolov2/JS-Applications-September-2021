import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllGames } from '../api/data.js';
import { itemTemplate} from '../temp/item.js';

const catalogTemplate = (games) => html`
<section id="catalog-page">
    <h1>All Games</h1>
    ${games.length == 0 ? html`<h3 class="no-articles">
        No articles yet
        </h3>` : games.map(itemTemplate)}
</section>`;

export async function catalogPage(ctx) {
    const games = await getAllGames();
    ctx.render(catalogTemplate(games));
}
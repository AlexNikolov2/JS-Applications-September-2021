import { html} from '../../node_modules/lit-html/lit-html.js';

export const itemTemplate = (item) => html`
<article>
    <h3>${item.title}</h3>
    <p>${item.description}</p>
    <a href="/details/${item._id}" class="btn details-btn">Details</a>
</article>
`;
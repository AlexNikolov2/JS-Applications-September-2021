import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteArticle, getArticleById } from '../api/data.js';

const detailsTemplate = (details, onDelete) => html`
<section id="details-page" class="content details">
    <h1>${details.title}</h1>
    <div class="details-content">
        <strong>Published in category ${details.category}</strong>
        <p>${details.content}</p>
        
        <div class="buttons">
        ${
            (details._ownerId === sessionStorage.getItem('userId'))
            ? html`<a href="/edit/${details._id}" class="btn edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
                <a href='/' class="btn edit">Back</a>`
            : html`<a href='/' class="btn edit">Back</a>`
        }
            
            
        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const details = await getArticleById(ctx.params.id)
    ctx.render(detailsTemplate(details, onDelete))

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete the item?');
        if (confirmed) {
            await deleteArticle(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}
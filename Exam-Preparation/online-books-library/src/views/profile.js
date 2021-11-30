import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyBooks } from '../api/data.js';
import { itemTemplate } from '../temp/item.js';

const profileTemplate = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <ul class="my-books-list">
        ${books.length == 0 ? html`<p class="no-books">
            No books in database!
            </p>` : books.map(itemTemplate)}
    </ul>
</section>`;

export async function profilePage(ctx){
    const userId = ctx.user._id;
    const books = await getMyBooks(userId);
    ctx.render(profileTemplate(books));
}
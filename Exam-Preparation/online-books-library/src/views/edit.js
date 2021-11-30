import { html } from '../../node_modules/lit-html/lit-html.js';
import { getBookById, editBook } from '../api/data.js';

const editTemplate = (book, onSubmit) => html`
<section id="edit-page" class="edit">
    <form @submit=${onSubmit} id="edit-form" action="#" method="">
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" value=${book.title}>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description"
                        id="description">${book.description}</textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" value=${book.imageUrl}>
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" .value=${book.type}>
                        <option value="Fiction">Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>`;

export async function editPage(ctx) {
    const bookId = ctx.params.id;
    const book = await getBookById(bookId);
    ctx.render(editTemplate(book, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updatedBook = {
            title: formData.get('title').trim(),
            type: formData.get('type').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            description: formData.get('description').trim(),
        };

        if(updatedBook.title =='' || updatedBook.description == '' ||  updatedBook.imageUrl=='' || updatedBook.type ==''){
            return alert("All fields are required!");
        }

        await editBook(bookId, updatedBook);
        event.target.reset();
        ctx.page.redirect('/details/' + bookId);
    }
}
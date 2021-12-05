import { html } from '../../node_modules/lit-html/lit-html.js';
import { getArticleById, editArticle } from '../api/data.js';

const editTemplate = (onSubmit, data) => html`
<section id="edit-page" class="content">
    <h1>Edit Article</h1>
    <form @submit=${onSubmit} id="edit" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder=${data.title}>
            </p>
            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder=${data.category}>
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content"></textarea>
            </p>
            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>
        </fieldset>
    </form>
</section>
`;

export async function editPage(ctx){
    const data = await getArticleById(ctx.params.id);

    ctx.render(editTemplate(onSubmit, data));
    document.getElementById('content').textContent = data.content;
    document.getElementById('title').value = data.title;
    document.getElementById('category').value = data.category;

    async function onSubmit(e){
        e.preventDefault();

        const editForm = document.getElementById('edit');
        const formData = new FormData(editForm);

        const article = {
            title: formData.get('title'),
            category: formData.get('category'),
            content: formData.get('content')
        };

        if(article.title === '' || article.category === '' || article.content === ''){
            return window.alert('Please fill all fields!');
        }
        let contentCategory = ['Javascript', 'c#', 'Java', 'Python'];
        if(!contentCategory.includes(article.category)){
            return window.alert('Please choose a valid category!');
        }
        await editArticle(ctx.params.id, article);
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}
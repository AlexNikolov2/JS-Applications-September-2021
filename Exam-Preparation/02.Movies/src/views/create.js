import {html} from '../../node_modules/lit-html/lit-html.js';
import { createMovie } from '../api/data.js';

const createTemplate = (onSubmit) => html`
<section id="add-movie">
        <form class="text-center border border-light p-5" @submit=${onSubmit}>
            <h1>Add Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input id="title" type="text" class="form-control" placeholder="Title" name="title" value="">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Description" name="description"></textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </section>
`;

export async function createPage(ctx){
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const movie = {
            title: formData.get('title'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl')
        };

        if(movie.title == '' || movie.description == '' || movie.imageUrl == ''){
            alert('Please fill all fields!');
            return;
        }
        await createMovie(movie);
        e.target.reset();
        ctx.page.redirect('/')
    }
}
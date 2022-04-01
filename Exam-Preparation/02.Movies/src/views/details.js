import { html} from '../../node_modules/lit-html/lit-html.js';
import {getLikes, getLikeByUser, likeMovie} from '../../api/data.js'
import {getMovieById, deleteMovie} from '../api/data.js';

const detailsTemplate = (movie, isOwner, onDelete, isLoggedIn, totalLikesCount, onClickLike, didUserLike) => html`
<section id="movie-example">
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>
            <div class="col-md-8">
                <img class="img-thumbnail" src=${movie.img} alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movie.description}</p>
                ${isOwner ? html`<a @click=${onDelete} class="btn btn-danger" href="javascript:void(0)">Delete</a>
                <a class="btn btn-warning" href="/edit/${movie._id}">Edit</a>` : ''}
                
                ${(() => {
              if (didUserLike == 0) {
                  if (isLoggedIn && !isOwner){
                   return html`<a @click=${onClickLike} class="btn btn-primary" href="javascript:void(0)">Like</a>`;
                  }
                }
            })()}
                <span class="enrolled-span">Liked ${totalLikesCount}</span>
            </div>
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const movieId = ctx.params.id;
    const movie = await getMovieById(movieId);
    const user = ctx.user;

    let userId;
    let didUserLike;

    if (user != null) {
        userId = ctx.user._id;
        didUserLike = await getLikeByUser(movieId, userId);
    }

    const isOwner = user && movie._ownerId == user._id;
    const isLoggedIn = user != undefined;
    let totalLikesCount = await getLikes(movieId);
    update();

    async function onClickLike() {
        const like = {
            movieId: movieId
        };
        await likeMovie(like);
        totalLikesCount = await getLikes(movieId);
        didUserLike = await getLikeByUser(movieId, userId);
        update();
    }

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteMovie(movieId);
            ctx.page.redirect('/');
        }
    }

    async function update() {
        return ctx.render(detailsTemplate(movie, isOwner, onDelete, isLoggedIn, totalLikesCount, onClickLike, didUserLike));
    }

}
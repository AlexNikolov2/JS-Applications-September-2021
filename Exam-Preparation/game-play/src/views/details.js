import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteGame, getGameById, getComments, createComment } from '../api/data.js';

const detailsTemplate = (game, isOwner, onDelete, isLoggedIn, allComments, onClick) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>
        <p class="text">
            ${game.summary}
        </p>
        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            <ul>
                <!-- Display paragraph: If there are no games in the database -->
                <!-- list all comments for current game (If any) -->
                ${allComments.length == 0 ? html`<p class="no-comment">No comments.</p>` : allComments.map(commentTemplate)}
            </ul>
        </div>
        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${isOwner ? html`<div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>` : ''};
    </div>
    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${isLoggedIn && !isOwner ? html`<article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onClick} class="form">
            <textarea id="commentId" name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>` : ''};
</section>`;

const commentTemplate = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>`;

export async function detailsPage(ctx) {
    const gameId = ctx.params.id;
    const game = await getGameById(gameId);
    const isOwner = ctx.user && game._ownerId == ctx.user._id;

    let allComments = await getComments(gameId);
    const user = ctx.user;
    const isLoggedIn = user != undefined;
    let comment;
    ctx.render(detailsTemplate(game, isOwner, onDelete, isLoggedIn, allComments, onClick));

    async function onClick(event) {
        event.preventDefault();
        let textArea = document.getElementById("commentId");
        comment = textArea.value;
        textArea.value = '';

        if (comment == '') {
            return alert('Please enter a comment!');
        }

        const commentObj = {
            gameId: gameId, 
            comment: comment,
        };
        await createComment(commentObj);
        allComments = await getComments(gameId);
        
       ctx.render(detailsTemplate(game, isOwner, onDelete, isLoggedIn, allComments, onClick));
    }

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteGame(gameId);
            ctx.page.redirect('/');
        }
    }
}
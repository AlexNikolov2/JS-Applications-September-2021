import { html } from '../../node_modules/lit-html/lit-html.js';
import { getPetById, likePet, getLikes } from '../api/data.js';
import { deletePet } from '../api/data.js';

const detailsTemplate = (data, onDelete, onClick, count) => html`
<section id="details-page" class="details">
    <div class="pet-information">
        <h3>Name: ${data.name}</h3>
        <p class="type">Type: ${data.type}</p>
        <p class="img"><img src=${data.imageUrl}></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this pet )  -->
            ${(data._ownerId === sessionStorage.userId)
            ? html`<a class="button" href="/edit/${data._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
            :
            ''
        }
            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current pet ) -->
            ${(sessionStorage.length !== 0) ? html`
            ${(data._ownerId != sessionStorage.userId) ?
                html`<a @click=${onClick} id='likes' class="button" href="javascript:void(0)">Like</a>` : ''}
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${count}</span>
            </div>`
            : html``
            }
            ${(sessionStorage.length >0) ? html``:
            html`<div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${count||0}</span>
            </div>`
        }
            <!-- ( for Guests and Users )  -->
            <!-- Bonus -->
        </div>
    </div>
    <div class="pet-description">
        <h3>Description:</h3>
        <p>${data.description}</p>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const data = await getPetById(ctx.params.id);
    ctx.render(detailsTemplate(data, onDelete, onClick));

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete the item?');
        if (confirmed) {
            await deletePet(ctx.params.id);
            ctx.page.redirect('/dashboard');
        }
    }
    async function onClick(e) {
        let petId = ctx.params.id;
        document.getElementById('likes').style.display = 'none';
        await likePet({ petId })

        let count = await getLikes(petId)
        ctx.render(detailsTemplate(data, onDelete, onClick, count));

    }
}
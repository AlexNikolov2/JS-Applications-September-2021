import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAlbumById, deleteAlbum } from '../api/data.js';

const detailsTemplate = (album, isOwner, onDelete) => html`
    <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src="${album.imgUrl}">
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${album.name}</h1>
                        <h3>Artist: ${album.artist}</h3>
                        <h4>Genre: ${album.genre}</h4>
                        <h4>Price: ${album.price}</h4>
                        <h4>Date: ${album.releaseDate}</h4>
                        <p>Description: ${album.description}</p>
                    </div>

                    ${isOwner ? html`<div class="actionBtn">
                        <a href="/edit/${album._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                    </div>` : ''}
                    
                </div>
            </div>
        </section>
`
export async function detailsPage(ctx){
    const albumId = ctx.params.id;
    const album = await getAlbumById(albumId);
    const isOwner = ctx.user && album._ownerId == ctx.user._id
    ctx.render(detailsTemplate(album, isOwner, onDelete));
    async function onDelete(){
        const confirmed = confirm('Are you sure you want to delete this album?');
        if(confirmed){
            await deleteAlbum(albumId);
            ctx.page.redirect('/catalog');
        };
    ctx.render(detailsTemplate(album, isOwner, onDelete));
    }
}
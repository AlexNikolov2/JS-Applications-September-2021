import {html} from '../../node_modules/lit-html/lit-html.js';
import { searchAlbum } from '../api/data.js';

const searchTemplate = (data) => html`
<section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button id="searchBtn" class="button-list">Search</button>
            </div>

            <h2>Results:</h2>

            <!--Show after click Search button-->
            <div class="search-result">
                ${data 
                ? data.map(itemTemplate) 
                : html`<p class="no-result">No result.</p>`}
                
            </div>
        </section>
`

const itemTemplate = (album) => html`
    <div class="card-box">
                    <img src=${album.imgUrl}>
                    <div>
                        <div class="text-center">
                            <p class="name">Name: ${album.name}</p>
                            <p class="artist">Artist: ${album.artist}</p>
                            <p class="genre">Genre: ${album.genre}</p>
                            <p class="price">Price: ${album.price}</p>
                            <p class="date">Release Date: ${album.releaseDate}</p>
                        </div>
                        <div class="btn-group">
                            <a href="/details/${album._id}" id="details">Details</a>
                        </div>
                    </div>
                </div>
`

export async function searchPage(ctx){
    ctx.render(searchTemplate());

    const searchBtn = document.getElementById('searchBtn');
    const searchField = document.getElementById('search-input');
    searchBtn.addEventListener('click',async function(){
        const query = searchField.value;
        const data = await searchAlbum(query);
        ctx.render(searchTemplate(data));
    })
}


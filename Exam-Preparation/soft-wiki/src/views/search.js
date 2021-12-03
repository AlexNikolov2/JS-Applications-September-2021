import { html } from '../../node_modules/lit-html/lit-html.js'
import { searchArticle } from '../api/data.js';
import { itemTemplate } from '../temp/item.js';

const searchTemplate = (data)=> html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form id="search-form">
        <p class="field search">
            <input id = 'searchField' type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input id = 'searchBtn' class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">
        ${((data||[]).length!==0)
        ?html`${data.map(itemTemplate)}`
        :html`<h3 class="no-articles">No matching articles</h3>`
        }
    </div>
</section>
`;

export async function searchPage(ctx) {
    ctx.render(searchTemplate())

    const searchBtn = document.getElementById('searchBtn')
    const searchField = document.getElementById('searchField');
    searchBtn.addEventListener('click',async function(e){
        e.preventDefault();

        const query = searchField.value;
        const data = await searchArticle(query)
        console.log(data)
        ctx.render(searchTemplate(data));
    })

}
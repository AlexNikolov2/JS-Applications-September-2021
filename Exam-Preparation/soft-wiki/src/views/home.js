import {html} from '../../node_modules/lit-html/lit-html.js';
import { getRecentArticles } from '../api/data.js';
import {itemTemplate} from '../temp/item.js';



const homeTemplate = (data) =>html`
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        ${(data.filter(x=>x.category === 'JavaScript').length!==0)
        ?data.filter(x=>x.category === 'JavaScript').map(itemTemplate)
    :html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        ${(data.filter(x=>x.category === 'C#').length!==0)
        ?data.filter(x=>x.category === 'C#').map(itemTemplate)
    :html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
    <section class="recent java">
        <h2>Java</h2>
        ${(data.filter(x=>x.category === 'Java').length!==0)
        ?data.filter(x=>x.category === 'Java').map(itemTemplate)
    :html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
    <section class="recent python">
        <h2>Python</h2>
        ${(data.filter(x=>x.category === 'Python').length!==0)
        ?data.filter(x=>x.category === 'Python').map(itemTemplate)
    :html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
</section>
`;

export async function homePage(ctx){
    const data = await getRecentArticles()
    ctx.setUserNav();
    ctx.render(homeTemplate(data))
}
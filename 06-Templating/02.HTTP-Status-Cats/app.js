import { html, render } from "../node_modules/lit-html/lit-html.js";
import { cats as catData } from "./catSeeder.js";

const template = (cat) => html`
    <li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
<div class="info">
    <button class="showBtn">Show status code</button>
    <div class="status" style="display: none" id="${cat.id}">
        <h4 class="card-title">${cat.statusCode}</h4>
        <p class="card-text">${cat.statusMessage}</p>
    </div>
</div>
</li>
    </li>`;

const root = document.querySelector("#allCats");
render(html`<ul>
${catData.map(template)}
</ul>`, root);

root.addEventListener("click", (e) => {	
    if (e.target.tagName == "BUTTON"){
        const el = e.target.parentElement.querySelector(".status");
        if(el.style.display == "none"){
            el.style.display = "block";
            e.target.innerText = "Hide status code";
        }
        else{         
            el.style.display = "none";
            e.target.innerText = "Show status code";
        }
    }
});
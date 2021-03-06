import { html } from '../../node_modules/lit-html/lit-html.js';
import { getFurnitureByProfile } from '../api/data.js';
import { itemTemplate } from '../util.js';

const profileTemplate = (data) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${data.map(itemTemplate)}
</div>
`;

export async function myProfile(ctx) {
    const data = await getFurnitureByProfile();
    ctx.render(profileTemplate(data));
}
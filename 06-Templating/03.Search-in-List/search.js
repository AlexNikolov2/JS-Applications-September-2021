import {html, render} from '../node_modules/lit-html/lit-html.js'
import {towns} from './towns.js'

const listTemplate = (towns) => html`
   <ul>
      ${towns.map(town => html`<li>${town}</li>`)}
   </ul>
`;

const root = document.getElementById('towns');
const input = document.getElementById('searchText');
const output = document.getElementById('result');
document.querySelector('button').addEventListener('click', onSearch);

update();
function update(){
   render(listTemplate(towns), root);
}

function onSearch(){
   const match = input.value.trim().toLocaleLowerCase();
   const filtered = towns.filter(town => match && town.toLocaleLowerCase().includes(match)).length;
   output.textContent = `${filtered} matches found`;
}
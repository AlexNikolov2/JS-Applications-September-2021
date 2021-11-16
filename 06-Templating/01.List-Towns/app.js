import { html, render } from "../node_modules/lit-html/lit-html.js";

const template = (towns) => html`
  <ul>
    ${towns.map((town) => 
        html`<li>${town}</li>`)}
  </ul>
`;
document.getElementById("btnLoadTowns").addEventListener("click", async (event) => {
    event.preventDefault();
    const input = document.getElementById("towns").value;
    const towns = input.split(", ").map((x) => x.trim());
    render(template(towns), document.getElementById("root"));
  });

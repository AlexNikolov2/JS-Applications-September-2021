import { html, render } from "../node_modules/lit-html/lit-html.js";

const selectTemplate = (items) => html`
  <select>
    ${items.map(
      (item) => html` <option value="${item._id}">${item.text}</option> `
    )}
  </select>
`;
let items = [];
const main = document.querySelector("div");
const url = `http://localhost:3030/jsonstore/advanced/dropdown`;
const input = document.getElementById("itemText");
initialize();

async function initialize() {
  document
    .querySelector("form")
    .addEventListener("submit", (event) => addItem(event, items));

  const response = await fetch(url);
  const data = await response.json();
  items = Object.values(data);

  update(items);
}

function update(items) {
  const result = selectTemplate(items);
  render(result, main);
}

async function addItem(event, items) {
  event.preventDefault();
  const item = {
    text: input.value,
  };
  const options = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  };
  const response = await fetch(url, options);

  const result = await response.json();
  items.push(result);
  update(items);
}

import { showDetails } from "./details.js";

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const movie = {
    title: formData.get("title"),
    description: formData.get("description"),
    img: formData.get("imageUrl"),
  };
  if (movie.title == "" || movie.description == "" || movie.img == "") {
    alert("All fields are required!");
    return;
  }
  const url = `http://localhost:3030/data/movies`;
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": sessionStorage.getItem("authToken"),
    },
    body: JSON.stringify(movie),
  };
    const response = await fetch(url, options);
    if(response.ok){
        const data = await response.json();
        showDetails(data._id);
    }
    else{
        const error = await response.json();
        alert(error.message);
    }
}

let main;
let section;

export function setupCreate(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    const form = section.querySelector("form");
    form.addEventListener("submit", onSubmit);
}
export async function showCreate(){
    main.innerHTML = "";
    main.appendChild(section);

    const form = section.querySelector("form");
    form.querySelector('input[name="title"]').value = "";
    form.querySelector('input[name="description"]').value = "";
    form.querySelector('input[name="imageUrl"]').value = "";
}
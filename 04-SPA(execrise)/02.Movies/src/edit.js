import { showDetails } from './details.js';

async function onSubmit(event, id) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const movie = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageUrl')
    };

    if (movie.title == '' || movie.description == '' || movie.img == '') {
        return alert('All fields are required');
    }

    const url = `http://localhost:3030/data/movies/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken')
        },
        body: JSON.stringify(movie)
    };
    const response = await fetch(url, options);

    if (response.ok) {   
        showDetails(id);
    } else {
        const error = await response.json();
        alert(error.message);
    }
}

let main;
let section;

export function setupEdit(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    
}

export async function showEdit(id) {
    main.innerHTML = '';
    main.appendChild(section);

    const response = await fetch('http://localhost:3030/data/movies/' + id);
    const movie = await response.json();

    const form = section.querySelector('form');
    form.querySelector('[name="title"]').value = movie.title;
    form.querySelector('[name="description"]').value = movie.description;
    form.querySelector('[name="imageUrl"]').value = movie.img;

    form.addEventListener('submit', (e) => onSubmit(e, id));
}
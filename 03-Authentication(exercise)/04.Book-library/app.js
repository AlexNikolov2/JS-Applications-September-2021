function start(){
    document.getElementById('createForm').addEventListener('click', createBook);
    document.getElementById('editForm').addEventListener('click', updateBook);
    document.getElementById('loadBooks').addEventListener('click', getBooks);

    document.querySelector('#editForm [type="button"]').addEventListener('click', (event) => {
        document.getElementById('createForm').style.display = 'block';
        document.getElementById('editForm').style.display = 'none';
        
    });
    document.querySelector('table').addEventListener('click', editOrDelete);

    getBooks();
}

function editOrDelete(event){
    if (event.target.className == 'editBtn') {
        document.getElementById('createForm').style.display = 'none';
        document.getElementById('editForm').style.display = 'block';
        const bookId = event.target.parentNode.parentNode.dataset.id;
        await editBook(bookId);
    } else if (event.target.className == 'deleteBtn') {
        const confirmed = confirm('Are you sure you want to delete this book?');
        if (confirmed) {
            const bookId = event.target.parentNode.parentNode.dataset.id;
            await deleteBook(bookId);
        }
    }
}

async function getBooks(){
    const url = 'https://localhost:3030/jsonstore/collections/books';
    const books = await fetch(url);
    const booksData = await books.json();
    
    const rows = Object.entries(booksData).map(([id, book]) => {
        return `<tr data-id="${id}">
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>
                        <button class="editBtn">Edit</button>
                        <button class="deleteBtn">Delete</button>
                    </td>
                </tr>`;
    }).join('');
    document.querySelector('tbody').innerHTML = rows;
}
async function createBook(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const book = {author: formData.get('author'), title: formData.get('title')};
    const url = 'https://localhost:3030/jsonstore/collections/books';
    const options = {method: "POST", body: JSON.stringify(book)};
    await fetch(url, options);
    await getBooks();
}
function updateBook(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get('id');
    const book = {author: formData.get('author'), title: formData.get('title')};
    const url = `https://localhost:3030/jsonstore/collections/books/${id}`;
    const options = {method: "PUT",headers: {'Content-Type': 'application/json'},body: JSON.stringify(book)};
    await fetch(url, options);
    await getBooks();
}
async function editBook(id){
    const url = `https://localhost:3030/jsonstore/collections/books/${id}`
    const book = await fetch(url);

    document.querySelector('#editForm [name="id"]').value = id;
    document.querySelector('#editForm [name="title"]').value = book.title;
    document.querySelector('#editForm [name="author"]').value = book.author;
}
async function deleteBook(id){
    const url = `https://localhost:3030/jsonstore/collections/books/${id}`;
    const options = {method: "DELETE"};
    await fetch(url, options);
    await getBooks();
}
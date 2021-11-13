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

}
async function createBook(){

}
function updateBook(){

}
async function editBook(){

}
async function deleteBook(){
    
}
async function updateBook(){

}
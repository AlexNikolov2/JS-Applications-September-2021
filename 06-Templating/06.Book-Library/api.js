async function request(url,options){
    const response=await fetch(url,options);
    const data=response.json();
    return data;
}

const url=`http://localhost:3030/jsonstore/collections/books`;

async function getAllBooks()
{
    return Object
        .entries(await request(url))
        .map(([k,v])=>Object.assign(v,{_id: k}));
}

async function getBookById(id){
    return await request(`${url}/${id}`);
}

async function createBook(book){
    const options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    }
    return await request(url,options)
}

async function updateBook(id,book){
    return await request(`${url}/${id}`,{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    });
}

async function deleteBook(id){
    return await request(`${url}/${id}`,{
        method: 'delete'
    });
}

export{
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
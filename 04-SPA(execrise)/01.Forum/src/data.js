async function getPosts() {
    const url = `http://localhost:3030/jsonstore/collections/myboard/posts`;
    const res = await fetch(url);
    const data = await res.json();
    return Object.values(data);
}

async function getComments(){
    const url = `http://localhost:3030/jsonstore/collections/myboard/comments`;
    const res = await fetch(url);
    const data = await res.json();
    return Object.values(data);
}

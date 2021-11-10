import {createNewTopic} from './dom.js';
import {getPosts, getComments} from './data.js';

const topicsContainer = document.getElementById('topicsContainer');
const homeContainer = document.getElementById('homeContainer');
const createForm = document.getElementById('createForm');
const homeLink = document.getElementById('homeLink');

homeLink.addEventListener('click', (e) => loadTopics(e));
createForm.addEventListener('submit', onCreateSubmit);

topicsContainer.innerHTML = '';

async function loadTopics(e) {
    if (e) {
        e.preventDefault();
        document.querySelector('div.container').replaceWith(homeContainer);
    }

    topicsContainer.innerHTML = '';
    const topics = await getPosts();

    topics.forEach(t => {
        const topic = createNewTopic(t);
        topic.querySelector('a').addEventListener('click', loadSingleTopic);
        topicsContainer.appendChild(topic);
    });

}

async function loadSingleTopic(e) {
    e.preventDefault();

    const id = e.target.parentElement.href.split('/').pop();

    let topic = await getPosts();
    topic = topic.filter(t => t._id === id);

    let comments = await getComments();
    comments = comments.filter(t => t.topicId === id);

    const el = createCommentsSection(topic[0], comments);

    homeContainer.replaceWith(el);

}

async function onCreateSubmit(e) {
    e.preventDefault();

    if(e.submitter.className === 'cancel') {
        e.target.reset();
        return;
    }

    const formData = new FormData(e.target);
    const topicName = formData.get('topicName');
    const username = formData.get('username');
    const postText = formData.get('postText');

    if(topicName.trim() === '' || username.trim() === '' || postText.trim() ==='') {
        alert('All fields are required!');
        return;
    }

    const content = {
        title: topicName,
        username,
        content: postText,
        createdDate: Date.now()
    }

    const options = {method: "POST", body: JSON.stringify(content)};
    const url = `http://localhost:3030/jsonstore/collections/myboard/comments`;
    const res = await fetch(url, options);

    if (res.ok) {
        e.target.reset();
        loadTopics();
    } else {
        alert('Error: Couldn`t create comment');
        return;
    }
    
}

loadTopics();
export const createNewTopic = (ctx) => {
    const divEl = document.createElement('div');
    divEl.className = 'topic-container';
    divEl.innerHTML = `
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <a href="/${ctx._id}" class="normal">
                    <h2>${ctx.title}</h2>
                </a>
                <div class="columns">
                    <div>
                        <p>Date: <time>${new Date(Number(ctx.createdDate))}</time></p>
                        <div class="nick-name">
                            <p>Username: <span>${ctx.username}</span></p>
                        </div>
                    </div>
                    <div class="subscribers">
                        <!-- <button class="subscribe">Subscribe</button> -->
                        <p>Subscribers: <span>456</span></p>
                    </div>
                </div>
            </div>
        </div>`;
    return divEl;
} 

export const createCommentsSection = (topic, comments) => {
    const divEl = document.createElement('div');
    divEl.className = 'container';
    divEl.innerHTML = `
        <div class="topic-content">
        <!-- topic-title  -->
        <div class="topic-title">
            <div class="topic-name-wrapper">
                <div class="topic-name">
                    <h2>${topic.title}</h2>
                    <p>Date: <time>${new Date(Number(topic.createdDate))}</time></p>
                </div>
                <div class="subscribers">
                    <p>Subscribers: <span>456</span></p>
                    <!-- <button class="subscribe">Subscribe</button>
                    <button class="unsubscribe">Unsubscribe</button> -->
                </div>
            </div>
        </div>`;

    function createComment(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <header class="header">
                <p><span>${comment.currentUser}</span> posted on <time>${new Date(Number(comment.createdDate))}</time></p>
            </header>
            <div class="comment-main">
                <div class="userdetails">
                    <img src="./static/profile.png" alt="avatar">
                </div>
                <div class="post-content">
                    <p>${comment.content}</p>
                </div>
            </div>
            <div class="footer">
                <p><span>3</span> likes</p>
            </div>`;
        return commentDiv;
    }

    function createCommentForm() {
        const formDiv = document.createElement('div');
        formDiv.className = 'answer-comment';
        formDiv.innerHTML = `
            <p><span>currentUser</span> comment:</p>
            <div class="answer">
                <form>
                    <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                    <div>
                        <label for="username">Username <span class="red">*</span></label>
                        <input type="text" name="username" id="username">
                    </div>
                    <button>Post</button>
                </form>
            </div>`;
        formDiv.addEventListener('submit', createCommentTopic);
        return formDiv;
    }

    async function createCommentTopic(e){ 
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const text = formData.get('postText');

        if(username.trim() === '' || text.trim() === ''){ 
            alert('Username and comment are required!');
            return;
        }

        const content = {
            currentUser: username,
            content: text,
            createdDate: Date.now(),
            topicId: topic._id
        }
        const options = {method: "POST", body: JSON.stringify(content)};
        const url = `http://localhost:3030/jsonstore/collections/myboard/comments`;
        const res = await fetch(url, options);
        if(res.ok){
            topicContent.insertBefore(createComment(content), form)
        }

    }
    const topicContent = div.querySelector('.topic-content');

    comments.forEach(c => {
        const currentComment = createComment(c);
        topicContent.appendChild(currentComment);
    })
    const form = createCommentForm();
    topicContent.appendChild();
    return divEl;
}
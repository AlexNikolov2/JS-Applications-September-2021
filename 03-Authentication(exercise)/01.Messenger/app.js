function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const submitButton = document.getElementById('submit');
    const refreshButton = document.getElementById('refresh');
    const nameInput = document.querySelector('[name="author"]');
    const contentInput = document.getElementById('[name="content"]');
    const textArea = document.getElementById('messages');
    submitButton.addEventListener('click', postMessage);
    refreshButton.addEventListener('click', refreshMessages);

    async function postMessage() {
        if (nameInput.value.trim() === '' || contentInput.value.trim() === '') { return }
        const options =  {"method": "POST", "body": JSON.stringify
        ({ author: nameInput.value, content: contentInput.value })
        }
        let res = await fetch(url, options);
        nameInput.value = '';
        contentInput.value = '';
        return res;
    }

    async function refreshMessages() {
        let res = await fetch(url);
        let data = await res.json();
        textArea.value = Object.values(data).map(x => `${x.author}: ${x.message || x.content}`).join('\n');
    }
    refreshMessages();
}

attachEvents();
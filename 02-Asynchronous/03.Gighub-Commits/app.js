function loadCommits() {
    let username = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;

    let list = document.getElementById('commits');
    const url = `https://api.github.com/repos/${username}/${repo}/commits`
    fetch(url)
    .then(response =>{
		if(!response.ok){
			throw new Error(response.status + ': ' + response.statusText)
		}
		return response.json()} )
        .then(handleResponse).catch(handleError);

        function handleResponse(data){
            list.innerHTML = '';

            for (const segment of data) {
            const li = document.createElement('li');
            li.textContent = `${segment.commit.author.name}: ${segment.commit.message}`
            list.appendChild(li);
            }
        }
        function handleError(){
            list.innerHTML = '';
            list.innerHTML = '404 not found'
        }

    //
}
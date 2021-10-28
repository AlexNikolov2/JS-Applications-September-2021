function loadRepos() {
	const list = document.getElementById('repos');
	const username = document.getElementById('username').value;
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
	.then(response =>{
		if(!response.ok){
			throw new Error(response.status + ': ' + response.statusText)
		}
		return response.json()} )
	.then(handleResponse)
	.catch(handleError)
	
	function handleResponse(data){
		
		list.innerHTML = '';

		for (const repo of data) {
			const liEl = document.createElement('li');
			liEl.innerHTML = `<a href=${repo.html_url}>
			${repo.full_name}
		</a>`;
		list.appendChild(liEl);
		}
	};
	function handleError(){
		list.innerHTML = '';
		list.innerHTML = '404 not found'
	}
}
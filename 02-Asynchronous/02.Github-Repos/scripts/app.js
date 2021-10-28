function loadRepos() {
	const username = document.getElementById('username').value;
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
	.then(response =>{
		if(!response.ok){
			throw new Error(response.status + ': ' + response.statusText)
		}
		return response.json()} )
	.then(handleResponse)
	.catch(err => console.log(err))
	
	function handleResponse(data){
		const list = document.getElementById('repos');
		list.innerHTML = '';
		
		for (const repo of data) {
			const liEl = document.createElement('li');
			liEl.innerHTML = `<a href=${repo.html_url}>
			${repo.full_name}
		</a>`;
		list.appendChild(liEl);
		}
	};
}
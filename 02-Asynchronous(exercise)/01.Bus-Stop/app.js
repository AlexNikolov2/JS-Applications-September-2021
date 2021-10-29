function getInfo() {
    let stopIdEl = document.getElementById('stopId').value;
    let list = document.getElementById('buses');
    let stopNameEl = document.getElementById('stopName');
    
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopIdEl}`
    
    fetch(url).then(response =>{
		if(!response.ok){
			throw new Error(response.status + ': ' + response.statusText)
		}
		return response.json()} )
        .then(handleResponse).catch(handleError);

        function handleResponse(data){
            list.innerHTML = '';
           stopNameEl.textContent = data.name;
        
           let buses = Object.entries(data.buses)
           for (const bus of buses) {
            let [busName, busTime] = bus;
            const li = document.createElement('li');
            li.innerHTML = `Bus ${busName} arrives in ${busTime} minutes`;
            list.appendChild(li);
            
           }
        }
        function handleError(){
            list.innerHTML = '';
            stopNameEl.textContent = 'Error'
        }
}
function solve() {
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');
    const textSpan = document.querySelector('.info');
    let nextId = 'depot';
    let current;
    
    function depart() {

        let url = `http://localhost:3030/jsonstore/bus/schedule/${nextId}`;

        fetch(url).then(response =>{
            if(!response.ok){
                throw new Error(response.status + ': ' + response.statusText)
            }
            return response.json()} )
            .then(handleResponse).catch(handleError);

            function handleResponse(data){
                textSpan.innerHTML = `Next stop ${data.name}`
                nextId = data.next;
                current = data.name;
                departButton.disabled = true;
                arriveButton.disabled = false;
            }
            function handleError(){
                textSpan.textContent = `Error`;
                departButton.disabled = true;
                arriveButton.disabled = true;
            }
        //http://localhost:3030/jsonstore/bus/schedule
    }

    function arrive() {
        textSpan.innerHTML = `Arriving at ${current}`
        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
document.querySelectorAll('form')[0].addEventListener('submit', register);

async function register(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if (email == '' || password == '') {
        return alert('All field must be filled !');
    } else if (password != rePass) {
        return alert('Passwords don\'t match !');
    }

    const response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    });

    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();
    sessionStorage.setItem('accessToken', data.accessToken);
    sessionStorage.setItem('ownerId', data._id);
    alert('Registered successfully !');
    event.target.reset();
}
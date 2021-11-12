let tableBodyElement = document.getElementsByTagName('tbody')[0];
let submitButton = document.getElementById('submit');
let formEl = document.getElementById('form');
let collection = [];

window.onload = await getStudents();

async function getStudents(){
    const url = `http://localhost:3030/jsonstore/collections/students`;
    const response = await fetch(url);
    const data = await response.json();
    Object.entries(data).forEach(([key, value]) => {
        let firstName = value.firstName;
        let lastName = value.lastName;
        let facultyNumber = value.facultyNumber;
        let grade = value.grade;
        let student = {
            firstName, lastName, facultyNumber, grade
        }
        collection.push(student);
        let trElement = generateElements('tr', '');
        collection.forEach(s => {
            let tdElement = generateElements('th', s.firstName );
            trElement.appendChild(tdElement);
            tdElement = generateElements('th', s.lastName);
            trElement.appendChild(tdElement);
            tdElement = generateElements('th', s.facultyNumber);
            trElement.appendChild(tdElement);
            tdElement = generateElements('th', s.grade);
            trElement.appendChild(tdElement);
        });
        collection = [];
        tableBodyElement.appendChild(trElement);
    })
}
async function createStudent(e){
    e.preventDefault();
    let formData = new FormData(formElement);
    let firstName = formData.get('firstName');
    let lastName = formData.get('lastName');
    let facultyNumber = formData.get('facultyNumber');
    let grade = formData.get('grade');
    let student = { firstName, lastName, facultyNumber, grade };
    collection.push(student);

    let trElement = generateElements('tr', '');
    collection.forEach(s => {
        let tdElement = generateElements('th', s.firstName );
        trElement.appendChild(tdElement);
        tdElement = generateElements('th', s.lastName);
        trElement.appendChild(tdElement);
        tdElement = generateElements('th', s.facultyNumber);
        trElement.appendChild(tdElement);
        tdElement = generateElements('th', s.grade);
        trElement.appendChild(tdElement);
    });
    collection = [];

    if(!collection.includes('')){
        if(isNaN(grade) || isNaN(facultyNumber)){
            alert('Invalid input, Grade and Faculty Number must be numbers');
        }
        else{
            if(grade > 6 || grade < 2){
                alert('Invalid input, Grade must be between 2 and 6');
            }
            else{
                let data = {firstName, lastName, facultyNumber, grade};
                tableBodyElement.appendChild(trElement);
                const url = `http://localhost:3030/jsonstore/collections/students`;
                const options = {method: "POST", body: JSON.stringify(data)}
                fetch(url, options);
            }
        }
    }
    else{
        alert('Invalid input, all fields must be filled');
    }
    collection = [];
    form.reset();
}
function generateElements(type, content){
    const result = document.createElement(type);
    result.textContent = content;
    return result;
}
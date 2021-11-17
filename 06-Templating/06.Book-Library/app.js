import {render} from '../node_modules/lit-html/lit-html.js';
import * as api from './api.js';
import {layoutTemplate} from './templates.js';

const onSubmit=
{
    'add-form':(formData)=>onCreateSubmit(formData),
    'edit-form':(formData)=>onEditSubmit(formData),
}

const ctx={
    list: [],
    async load ()
    {
        ctx.list=await api.getAllBooks();
        update();
    },
    onEdit(id)
    {
        const book=ctx.list.find(b=>b._id==id);
        console.log(book);
        update(book);
    }
};

document.body.addEventListener('submit',(event)=>{
    event.preventDefault();
    const formData=new FormData(event.target);
    onSubmit[event.target.id](formData, event.target);
    event.target.reset();
});

start();

async function start()
{
    update();
}

function update(bookToEdit)
{
    const result=layoutTemplate(ctx,bookToEdit);
    render(result,document.body);   
}

async function onCreateSubmit(formData)
{
    const book={
        title: formData.get('title'),
        author: formData.get('author')
    };
    await api.createBook(book);
}
async function onEditSubmit(formData)
{
    const id=formData.get('id');
    const book={
        title: formData.get('title'),
        author: formData.get('author')
    };
    await api.updateBook(id,book);
    update()
}
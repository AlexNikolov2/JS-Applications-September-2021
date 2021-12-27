class ExpandingList extends HTMLUListElement{
    constructor(){
        self = super();

        const uls = Array.from(self.querySelectorAll('ul'));
        const lis = Array.from(self.querySelectorAll('li'));

        uls.forEach(ul => {
            ul.style.display = 'none';
        });

        lis.forEach(li => {

            if(li.querySelectorAll('ul').length > 0){
                li.setAttribute('class', 'closed');

                const childText = li.childNodes[0];
                const newSpan = document.createElement('span');

                newSpan.textContent = childText.textContent;
                newSpan.style.cursor = 'pointer';

                newSpan.onclick = self.showUl;

                childText.parentNode.insertBefore(newSpan, childText);
                childText.parentNode.removeChild(childText);
            }
        });
    }

    showUl(e){
        const nextUl = e.target.nextElementSibling;

        if(nextUl.style.display == 'block'){
            nextUl.style.display = 'none';
            e.target.setAttribute('class', 'closed');
        }
        else{
            nextUl.style.display = 'block';
            e.target.setAttribute('class', 'open');
        }
    };
}

customElements.define('expanding-list', ExpandingList, {extends: 'ul'});
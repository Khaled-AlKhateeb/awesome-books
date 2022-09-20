const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const addBook = document.getElementById('book');

const dataMod = [];

function addNewBook() {
    let book = {};
    book.title = titleInput.value;
    book.author = authorInput.value;
    dataMod.push(book);
    
    let stringVal = titleInput.value;
    let idString = stringVal.replace(/\s/g, '');
    window.localStorage.setItem(idString, JSON.stringify(book));

    let bookDiv = document.createElement('div');
    let bookTitle = document.createElement('h2');
    let bookAuthor = document.createElement('h2');
    let removeBtn = document.createElement('button');
    let divider = document.createElement('hr');
    removeBtn.innerHTML = 'Remove';
    removeBtn.setAttribute('onclick', 'removeBook(this.id)');
    bookTitle.innerHTML = titleInput.value;
    bookAuthor.innerHTML = authorInput.value;
    
    bookDiv.setAttribute('id', idString);
    removeBtn.setAttribute('id', idString + 'Rmv');

    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(removeBtn);
    bookDiv.appendChild(divider);
    addBook.appendChild(bookDiv);
}

function removeBook(id) {
    for (let i = 0; i < addBook.children.length; i++) {
        let selected = addBook.children[i]; 
        
        if (selected.id + 'Rmv' === id) {
            addBook.removeChild(selected);
            dataMod.splice(i,1);
            window.localStorage.removeItem(selected.id);
        }
    }
}
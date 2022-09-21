/* eslint-disable no-unused-vars */

let dataMod = [];
const addBook = document.getElementById('book');

function drawOnScreen(obj) {
    const stringVal = obj.title;
    const idString = stringVal.replace(/\s/g, '');
    const bookDiv = document.createElement('div');
    const bookTitle = document.createElement('p');
    const removeBtn = document.createElement('button');
    const rmv = 'Rmv';
    const rmvBtn = idString + rmv;

    bookDiv.classList.add('book-container');
    bookTitle.classList.add('book-title');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerHTML = 'Remove';
    removeBtn.setAttribute('onclick', 'removeBook(this.id)');
    bookTitle.innerHTML = '"' + obj.title + '" by ' + obj.author;

    bookDiv.setAttribute('id', idString);
    removeBtn.setAttribute('id', rmvBtn);

    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(removeBtn);
    addBook.appendChild(bookDiv);
}

function addNewBook() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const book = {};
    book.title = titleInput.value;
    book.author = authorInput.value;
    dataMod.push(book);

    titleInput.value = '';
    authorInput.value = '';

    window.localStorage.setItem('books', JSON.stringify(dataMod));

    drawOnScreen(book);
}

function removeBook(id) {
    const rmv = 'Rmv';
    for (let i = 0; i < addBook.children.length; i += 1) {
        const selected = addBook.children[i];
        if (selected.id + rmv === id) {
            addBook.removeChild(selected);
            dataMod.splice(i, 1);
            window.localStorage.setItem('books', JSON.stringify(dataMod));
        }
    }
}

window.addEventListener('load', () => {
    const localStorageItem = window.localStorage.getItem('books');
    if (localStorageItem) {
        dataMod = JSON.parse(localStorageItem);
        dataMod.forEach((element) => {
            drawOnScreen(element);
        });
    }
});
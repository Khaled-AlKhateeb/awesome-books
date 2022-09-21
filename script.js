/* eslint-disable no-unused-vars */

let dataMod = [];
const addBook = document.getElementById('book');

function drawOnScreen(obj) {
  const stringVal = obj.title;
  const idString = stringVal.replace(/\s/g, '');
  const bookDiv = document.createElement('div');
  const bookTitle = document.createElement('h2');
  const bookAuthor = document.createElement('h2');
  const removeBtn = document.createElement('button');
  const divider = document.createElement('hr');
  const rmv = 'Rmv';
  const rmvBtn = idString + rmv;

  removeBtn.innerHTML = 'Remove';
  removeBtn.setAttribute('onclick', 'removeBook(this.id)');
  bookTitle.innerHTML = obj.title;
  bookAuthor.innerHTML = obj.author;

  bookDiv.setAttribute('id', idString);
  removeBtn.setAttribute('id', rmvBtn);

  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(removeBtn);
  bookDiv.appendChild(divider);
  addBook.appendChild(bookDiv);
}

function addNewBook() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const book = {};
  book.title = titleInput.value;
  book.author = authorInput.value;
  dataMod.push(book);

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
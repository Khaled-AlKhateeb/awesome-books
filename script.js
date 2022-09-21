/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */

class BookLibrary {
  constructor() {
    this.booksArr = [];
    this.add = (Obj) => {
      this.booksArr.push(Obj);
    };
    this.remove = (Obj) => {
      this.booksArr.splice(Obj, 1);
    };
  }
}

const library = new BookLibrary();

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
  const bookEntries = {
    title: null,
    author: null,
  };
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');

  bookEntries.title = titleInput.value;
  bookEntries.author = authorInput.value;
  library.add(bookEntries);

  titleInput.value = '';
  authorInput.value = '';

  window.localStorage.setItem('books', JSON.stringify(library.booksArr));

  drawOnScreen(bookEntries);
}

function removeBook(id) {
  const rmv = 'Rmv';
  for (let i = 0; i < addBook.children.length; i += 1) {
    const selected = addBook.children[i];
    if (selected.id + rmv === id) {
      addBook.removeChild(selected);
      library.remove(i);
      window.localStorage.setItem('books', JSON.stringify(library.booksArr));
    }
  }
}

window.addEventListener('load', () => {
  const localStorageItem = window.localStorage.getItem('books');
  if (localStorageItem) {
    library.booksArr = JSON.parse(localStorageItem);
    library.booksArr.forEach((element) => {
      drawOnScreen(element);
    });
  }
});
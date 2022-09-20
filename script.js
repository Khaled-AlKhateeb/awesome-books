const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const addBook = document.getElementById('book');

const dataMod = [];

function addNewBook() {
  const book = {};
  book.title = titleInput.value;
  book.author = authorInput.value;
  dataMod.push(book);

  const stringVal = titleInput.value;
  const idString = stringVal.replace(/\s/g, '');
  window.localStorage.setItem(idString, JSON.stringify(book));

  const bookDiv = document.createElement('div');
  const bookTitle = document.createElement('h2');
  const bookAuthor = document.createElement('h2');
  const removeBtn = document.createElement('button');
  const divider = document.createElement('hr');
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
  for (let i = 0; i < addBook.children.length; i += 1) {
    let selected = addBook.children[i];
    if (selected.id + 'Rmv' === id) {
      addBook.removeChild(selected);
      dataMod.splice(i, 1);
      window.localStorage.removeItem(selected.id);
    }
  }
}
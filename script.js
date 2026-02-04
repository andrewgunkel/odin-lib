
let myLibrary = [];

const libraryContainer = document.querySelector("#library");

const btnAddBook = document.querySelector("#btn-add-book");
const btnDeleteBook = document.querySelector("#btn-delete-book");
const btnCloseForm = document.querySelector("#close-form");
const formContainer = document.querySelector("#add-book-form");
const form = document.querySelector("#new-book-form");
const modal = document.querySelector("#modal");

modal.classList.add("is-hidden");

function Book (title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

    
    
}

Book.prototype.bookInfo = function() {
        return("Title: " + this.title + ", Author: " + this.author + ", Number of pages: " + this.pages + ", Read?: " + this.read)
    }


function addBookToLibrary (title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
}


addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'Finished');

addBookToLibrary('Cloud Atlas', 'David Mitchell', 400, 'Currently reading');

addBookToLibrary('The Alchemist', 'Paolo Coelho', 400, 'Finished');

addBookToLibrary('The Golden Compass', 'Philip Pullman', 400, 'Finished');

console.log( myLibrary, "Books in library: " + myLibrary.length)

function renderLibrary() {
  libraryContainer.innerHTML = "";
for (let i = 0; i < myLibrary.length; i++) {

console.log(myLibrary[i])

const book = myLibrary[i];


const bookCard = document.createElement("div");

bookCard.classList.add("book-card");


const bookTitle = document.createElement("h1");
const bookAuthor = document.createElement("h2");
const bookPageCount = document.createElement("p");
const bookRead = document.createElement("p");





bookTitle.textContent = book.title;
bookAuthor.textContent = "by " + book.author;
bookPageCount.textContent = "Pages: " + book.pages;
bookRead.textContent = "Status: " + book.read;

//delete button
const btnDelete = document.createElement('button');
btnDelete.classList.add('delete-btn');
btnDelete.classList.add('btn');
const deleteIcon = document.createElement('span');
deleteIcon.classList.add('material-symbols-outlined');
deleteIcon.textContent = 'delete';
btnDelete.appendChild(deleteIcon);

//read status button
const btnReadStatus = document.createElement('button');
btnReadStatus.classList.add('read-btn');
btnReadStatus.classList.add('btn');
const readIcon = document.createElement('span');
readIcon.classList.add('material-symbols-outlined');
readIcon.textContent = 'book';
btnReadStatus.appendChild(readIcon);

bookCard.appendChild(bookTitle);
bookCard.appendChild(bookAuthor);
bookCard.appendChild(bookPageCount);
bookCard.appendChild(bookRead);
bookCard.appendChild(btnDelete);
bookCard.appendChild(btnReadStatus);

bookCard.dataset.id = book.id;

libraryContainer.appendChild(bookCard);


}
}

renderLibrary();


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#book-author").value;
  const pages = document.querySelector("#book-pages").value;
  const read = document.querySelector("input[name='book-status']:checked").value;

  addBookToLibrary(title, author, pages, read);
    renderLibrary();
  form.reset();
  modal.classList.add("is-hidden");

});

btnCloseForm.addEventListener("click", () => {
  modal.classList.add("is-hidden");
});


btnAddBook.addEventListener("click", () => {
  modal.classList.remove("is-hidden");
});

libraryContainer.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".delete-btn");
  if (!deleteBtn) return;

  const bookCard = deleteBtn.closest(".book-card");
  const bookId = bookCard.dataset.id;

  myLibrary = myLibrary.filter(book => book.id !== bookId);
  renderLibrary();
});

libraryContainer.addEventListener("click", (event) => {
  const readBtn = event.target.closest(".read-btn");
  if (!readBtn) return;

  const bookCard = readBtn.closest(".book-card");
  const bookId = bookCard.dataset.id;
  
  const book = myLibrary.find(book => book.id === bookId);
  book.toggleReadStatus();
  renderLibrary();
});

Book.prototype.toggleReadStatus = function () {
  // here, `this` === the book from the array
  if (this.read === "To read") {
    this.read = "Currently reading";
  } else if (this.read === "Currently reading") {
    this.read = "Finished";
  } else {
    this.read = "To read";
  }
};
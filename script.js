
//loading from local storage
function loadLibrary() {
  const storedLibrary = localStorage.getItem("myLibrary");
  if (!storedLibrary) return;

  const parsedLibrary = JSON.parse(storedLibrary);

  myLibrary = parsedLibrary.map(bookData =>
    new Book(
      bookData.title,
      bookData.author,
      bookData.pages,
      bookData.read
    )
  );
}


let myLibrary = [];

const libraryContainer = document.querySelector("#library");

const btnAddBook = document.querySelector("#btn-add-book");
const btnDeleteBook = document.querySelector("#btn-delete-book");
const btnCloseForm = document.querySelector("#close-form");
const formContainer = document.querySelector("#add-book-form");
const form = document.querySelector("#new-book-form");
const modal = document.querySelector("#modal");

modal.classList.add("is-hidden");

//Book constructor
function Book (title, author, pages, read, id = crypto.randomUUID()) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

//method to return book info
Book.prototype.bookInfo = function() {
        return("Title: " + this.title + ", Author: " + this.author + ", Number of pages: " + this.pages + ", Read?: " + this.read)
    }

//function to add book to library
function addBookToLibrary (title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
}

//example books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'Finished');
addBookToLibrary('Cloud Atlas', 'David Mitchell', 400, 'Currently reading');
addBookToLibrary('The Alchemist', 'Paolo Coelho', 400, 'Finished');
addBookToLibrary('The Golden Compass', 'Philip Pullman', 400, 'Finished');

//console.log( myLibrary, "Books in library: " + myLibrary.length)

//rendering library to DOM
function renderLibrary() {
  libraryContainer.innerHTML = "";
for (let i = 0; i < myLibrary.length; i++) {

console.log(myLibrary[i])

const book = myLibrary[i];


const bookCard = document.createElement("div");

bookCard.classList.add("book-card", "card");

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
saveLibrary();
}
}

//initial load
loadLibrary();
renderLibrary();

//detect form submit
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
  saveLibrary();

});

//detect close form button click
btnCloseForm.addEventListener("click", () => {
  modal.classList.add("is-hidden");
});

//detect add book button click
btnAddBook.addEventListener("click", () => {
  modal.classList.remove("is-hidden");
});

//detect delete button click
libraryContainer.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".delete-btn");
  if (!deleteBtn) return;

  const bookCard = deleteBtn.closest(".book-card");
  const bookId = bookCard.dataset.id;

  myLibrary = myLibrary.filter(book => book.id !== bookId);
  saveLibrary();
  renderLibrary();
  
});

//detect read status button click
libraryContainer.addEventListener("click", (event) => {
  const readBtn = event.target.closest(".read-btn");
  if (!readBtn) return;

  const bookCard = readBtn.closest(".book-card");
  const bookId = bookCard.dataset.id;
  
  const book = myLibrary.find(book => book.id === bookId);
  book.toggleReadStatus();
  saveLibrary();
  renderLibrary();

});

//toggle read status method
Book.prototype.toggleReadStatus = function () {
  if (this.read === "To read") {
    this.read = "Currently reading";
  } else if (this.read === "Currently reading") {
    this.read = "Finished";
  } else {
    this.read = "To read";
  }
  saveLibrary();
};

//saving to local storage
function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
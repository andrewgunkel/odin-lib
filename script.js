
const myLibrary = [];

const libraryContainer = document.querySelector("#library");

const btnAddBook = document.querySelector("#btn-add-book");
const formContainer = document.querySelector("#add-book-form");
const form = document.querySelector("#new-book-form");


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

bookCard.appendChild(bookTitle);
bookCard.appendChild(bookAuthor);
bookCard.appendChild(bookPageCount);
bookCard.appendChild(bookRead);
  
bookCard.setAttribute("id", book.id);

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
  formContainer.hidden = true;
  

});

//formContainer.hidden = true;
btnAddBook.addEventListener("click", () => {
  formContainer.hidden = false;
});

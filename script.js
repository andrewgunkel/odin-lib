/* 

 _       _________ ______   _______  _______  _______          
( \      \__   __/(  ___ \ (  ____ )(  ___  )(  ____ )|\     /|
| (         ) (   | (   ) )| (    )|| (   ) || (    )|( \   / )
| |         | |   | (__/ / | (____)|| (___) || (____)| \ (_) / 
| |         | |   |  __ (  |     __)|  ___  ||     __)  \   /  
| |         | |   | (  \ \ | (\ (   | (   ) || (\ (      ) (   
| (____/\___) (___| )___) )| ) \ \__| )   ( || ) \ \__   | |   
(_______/\_______/|/ \___/ |/   \__/|/     \||/   \__/   \_/   
                                                                                                                 

    -----------------------------------------------
  _____ _           ___     _ _        ___          _        _   
 |_   _| |_  ___   / _ \ __| (_)_ _   | _ \_ _ ___ (_)___ __| |_ 
   | | | ' \/ -_) | (_) / _` | | ' \  |  _/ '_/ _ \| / -_) _|  _|
   |_| |_||_\___|  \___/\__,_|_|_||_| |_| |_| \___// \___\__|\__|
                                                 |__/            

Project: Library
Link to project brief: https://www.theodinproject.com/lessons/node-path-javascript-library
Author: Andrew Gunkel

---------------------------------------------
				STATE & DOM REFERENCES
--------------------------------------------- 
*/
let myLibrary = [];

const libraryContainer = document.querySelector("#library");

const btnAddBook = document.querySelector("#btn-add-book");
const btnDeleteBook = document.querySelector("#btn-delete-book");
const btnCloseForm = document.querySelector("#close-form");
const formContainer = document.querySelector("#add-book-form");
const form = document.querySelector("#new-book-form");
const modal = document.querySelector("#modal");



/* 
---------------------------------------------
				LOCAL STORAGE
--------------------------------------------- 
*/

// Loading from local storage
function loadLibrary() {
	const storedLibrary = localStorage.getItem("myLibrary");
	if (!storedLibrary) return;

	const parsedLibrary = JSON.parse(storedLibrary);

	myLibrary = parsedLibrary.map(bookData =>
		new Book(
			bookData.title,
			bookData.author,
			bookData.pages,
			bookData.read,
			bookData.id
		)
	);
}

// Saving to local storage
function saveLibrary() {
	localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}



/* 
---------------------------------------------
				BOOK CONSTRUCTOR & METHODS
--------------------------------------------- 
*/

// Book constructor
function Book(title, author, pages, read, id = crypto.randomUUID()) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = id;
}

// Method to return book info
Book.prototype.bookInfo = function () {
	return (
		"Title: " + this.title +
		", Author: " + this.author +
		", Number of pages: " + this.pages +
		", Read?: " + this.read
	);
};

// Toggle read status method
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



/* 
---------------------------------------------
				LIBRARY HELPERS
--------------------------------------------- 
*/

// Function to add book to library
function addBookToLibrary(title, author, pages, read) {
	const newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
}



/* 
---------------------------------------------
				INITIAL DATA
--------------------------------------------- 
*/

// Example books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Finished");
addBookToLibrary("Cloud Atlas", "David Mitchell", 400, "Currently reading");
addBookToLibrary("The Alchemist", "Paolo Coelho", 400, "Finished");
addBookToLibrary("The Golden Compass", "Philip Pullman", 400, "Finished");



/* 
---------------------------------------------
				RENDERING
--------------------------------------------- 
*/

// Rendering library to DOM
function renderLibrary() {
	libraryContainer.innerHTML = "";

	for (let i = 0; i < myLibrary.length; i++) {
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

		// Delete button
		const btnDelete = document.createElement("button");
		btnDelete.classList.add("delete-btn", "btn");

		const deleteIcon = document.createElement("span");
		deleteIcon.classList.add("material-symbols-outlined");
		deleteIcon.textContent = "delete";
		btnDelete.appendChild(deleteIcon);

		// Read status button
		const btnReadStatus = document.createElement("button");
		btnReadStatus.classList.add("read-btn", "btn");

		const readIcon = document.createElement("span");
		readIcon.classList.add("material-symbols-outlined");
		readIcon.textContent = "book";
		btnReadStatus.appendChild(readIcon);

		const cardActions = document.createElement("div");
		cardActions.classList.add("card-actions");

		cardActions.appendChild(btnReadStatus);
		cardActions.appendChild(btnDelete);

		bookCard.appendChild(bookTitle);
		bookCard.appendChild(bookAuthor);
		bookCard.appendChild(bookPageCount);
		bookCard.appendChild(bookRead);
		bookCard.appendChild(cardActions);

		bookCard.dataset.id = book.id;

		libraryContainer.appendChild(bookCard);
	}

	saveLibrary();
}



/* 
---------------------------------------------
				INITIALISATION
--------------------------------------------- 
*/

// Initial load
modal.classList.add("is-hidden");
loadLibrary();
renderLibrary();



/* 
---------------------------------------------
				EVENT LISTENERS
--------------------------------------------- 
*/

// Detect form submit
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

// Detect close form button click
btnCloseForm.addEventListener("click", () => {
	modal.classList.add("is-hidden");
});

// Detect add book button click
btnAddBook.addEventListener("click", () => {
	modal.classList.remove("is-hidden");
});

// Detect delete button click
libraryContainer.addEventListener("click", (event) => {
	const deleteBtn = event.target.closest(".delete-btn");
	if (!deleteBtn) return;

	const bookCard = deleteBtn.closest(".book-card");
	const bookId = bookCard.dataset.id;

	myLibrary = myLibrary.filter(book => book.id !== bookId);
	saveLibrary();
	renderLibrary();
});

// Detect read status button click
libraryContainer.addEventListener("click", (event) => {
	const readBtn = event.target.closest(".read-btn");
	if (!readBtn) return;

	const bookCard = readBtn.closest(".book-card");
	const bookId = bookCard.dataset.id;

	const book = myLibrary.find(book => book.id === bookId);
	book.toggleReadStatus();
	renderLibrary();
});


const myLibrary = [];



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


addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'finished');

addBookToLibrary('Cloud Atlas', 'David Mitchell', 400, 'currently reading');


console.log( myLibrary, "Books in library: " + myLibrary.length)


for (let i = 0; i < myLibrary.length; i++) {

console.log(myLibrary[i])
}


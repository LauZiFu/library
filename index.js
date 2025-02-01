const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.getIsRead = function() {
    let isReadStr =  this.isRead ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${isReadStr}`;
} 

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

addBookToLibrary("lol", "lol", 123, true);
console.log(myLibrary[0].getIsRead());
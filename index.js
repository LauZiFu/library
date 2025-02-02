const myLibrary = [];
const library = document.querySelector("#library-content");
const addBookBtn = document.querySelector("#add-book");
const confirmBtn = document.querySelector("#confirm-btn");
const formDialog = document.querySelector("#form-dialog");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const bookForm = document.querySelector("#form-dialog > form");


function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    var index = null;

    this.getLibraryIndex = function(){
        return index;
    }

    this.setLibraryIndex = function(i){
        index = i;
    }
}

Book.prototype.getIsRead = function() {
    let isReadStr =  this.isRead ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${isReadStr}`;
} 

Book.prototype.toggleRead = function(){
    this.isRead = !this.isRead;
}


function createBookCard(book, index) {
    const div = document.createElement("div");
    div.classList.add("book");
    div.dataset.libraryId = index; // Store index dynamically

    // Title
    const title = document.createElement("h2");
    title.textContent = book.title;

    // Author
    const author = document.createElement("div");
    author.textContent = `by ${book.author}`;

    // Pages
    const pages = document.createElement("div");
    pages.textContent = `Pages: ${book.pages}`;

    // Actions
    const actions = document.createElement("div");
    actions.classList.add("book-actions");

    const removeBtn = createButton("Remove", function() {
        removeBookFromLibrary(parseInt(div.dataset.libraryId));
    });

    const readBtn = createButton("Toggle Read", function() {
        toggleBookRead(parseInt(div.dataset.libraryId));
        this.classList.toggle("is-read", myLibrary[parseInt(div.dataset.libraryId)].isRead);
    });

    if (book.isRead) readBtn.classList.add("is-read");

    [readBtn, removeBtn].forEach(btn => actions.appendChild(btn));
    [title, author, pages, actions].forEach(el => div.appendChild(el));

    return div;
}

//auxillary button creator
function createButton(textContent, callBack, event="click"){
    const button = document.createElement("button");
    button.textContent = textContent;
    button.addEventListener(event, callBack);

    return button;
}


function addBookToLibrary(title, author, pages, isRead=false) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    displayBooks();
}

function removeBookFromLibrary(index) {
    if (index >= 0 && index < myLibrary.length) {
        myLibrary.splice(index, 1);
        displayBooks(); // Re-render to fix indices
    }
}

function toggleBookRead(index) {
    if (index >= 0 && index < myLibrary.length) {
        myLibrary[index].toggleRead(); // Ensure the UI reflects the change
    }
}

//display function
function displayBooks(){
    library.innerHTML = ""; // Clear previous books before re-rendering
    myLibrary.forEach((book, index) => {
        book.setLibraryIndex(index);
        const bookCard = createBookCard(book, index);
        library.appendChild(bookCard);
    });
}


addBookBtn.addEventListener("click", () => {
    formDialog.showModal();
});


formDialog.addEventListener("close", ()=> {
    let response = formDialog.returnValue;

    if(response !== "cancel" && response !== "default"){
        response = JSON.parse(response);
        addBookToLibrary(response.title, response.author, response.pages);
    } 

    bookForm.reset();
});


bookForm.addEventListener("submit", ()=>{
    confirmBtn.value = JSON.stringify({
        author: inputAuthor.value,
        title: inputTitle.value,
        pages: inputPages.value
    });
});



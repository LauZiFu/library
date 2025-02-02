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

    this.setLibraryIndex = function(){
        index = myLibrary.includes(this) ? myLibrary.indexOf(this) : null;
    }
}

Book.prototype.getIsRead = function() {
    let isReadStr =  this.isRead ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${isReadStr}`;
} 


Book.prototype.createBookCard = function(){
    const div = document.createElement("div");
    div.setAttribute("data-LibraryId", this.getLibraryIndex());

    //title of book
    const title = document.createElement("h2");
    title.textContent = this.title;

    //author of book
    const author = document.createElement("div");
    author.textContent = this.author;

    //remove button 
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", ()=>{
        removeBookFromLibrary(this.getLibraryIndex());
    });

    [title, author, removeBtn].forEach((e) => div.appendChild(e));

    return div;
}


function addBookToLibrary(title, author, pages, isRead=false) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

function removeBookFromLibrary(index){
    if(index >= 0 && index < myLibrary.length){
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

function displayBooks(){
    library.innerHTML = "";

    for(let i=0; i < myLibrary.length; i++){
        myLibrary[i].setLibraryIndex(); //match book object index with library array index
        let bookCard = myLibrary[i].createBookCard();
        bookCard.classList.toggle("book");
        library.appendChild(bookCard);
    }
}


addBookBtn.addEventListener("click", () => {
    formDialog.showModal();
});


formDialog.addEventListener("close", ()=> {
    let response = formDialog.returnValue;

    if(response !== "cancel" && response !== "default"){
        response = JSON.parse(response);
        console.log(response);
        addBookToLibrary(response.author, response.title, response.pages);
        displayBooks();
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



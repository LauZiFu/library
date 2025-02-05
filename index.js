"use strict";

class Book {
    #read = false;

    constructor(title, author, pages = 0, isRead = false){
        this.title = title;
        this.author = author;
        if (Number.isInteger(pages)) this.pages = pages;
        this.isRead = isRead;
    }

    get isRead(){
        return this.#read;
    }

    set isRead(bool){
        if (bool instanceof Boolean) this.#read = bool; 
    }

    toogleRead(){
        this.#read = !this.#read;
    }
}


const library =  new class {
    #myLibrary = [];

    addBook(title, author, pages, isRead){
        this.#myLibrary.push(new Book(title, author, pages, isRead));
    }

    removeBook(index){
        if (this.#myLibrary[index]) {
            this.#myLibrary.splice(index, 1);
        } else {
            throw new Error ("Book does not exist in library");
        }
    }
    
    getLibrary(){
        return [...this.#myLibrary];
    }

    toggleBookRead(index){
        this.#myLibrary[index].toogleRead();
    }
}


const displayController = new class {
    #library = document.querySelector("#library-content");
    #addBookBtn = document.querySelector("#add-book");
    #formDialog = document.querySelector("#form-dialog");
    #inputTitle = document.querySelector("#title");
    #inputAuthor = document.querySelector("#author");
    #inputPages = document.querySelector("#pages");
    #bookForm = document.querySelector("#form-dialog > form");

    constructor(){
        this.#addBookBtn.addEventListener("click", () => {
            this.#formDialog.showModal();
        });
        this.#formDialog.addEventListener("close", (e)=> {
            this.#addBooktoLibrary(e);
        });
        this.#updateScreen();
    }


    #updateScreen(){
        this.#library.innerHTML = "";
        const myLibrary = library.getLibrary();
        myLibrary.forEach((book, index) => {
            const bookCard = this.#createBookCard(index);
            this.#library.appendChild(bookCard);
        });
    }


    #createBookCard(index){
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const author = document.createElement("div");
        const pages = document.createElement("div");
        const actions = document.createElement("div");
        const removeBtn = document.createElement("button");
        const readBtn = document.createElement("button");
        const myLibrary = library.getLibrary();
        const book = myLibrary[index];
        
        div.classList.add("book");
        div.dataset.libraryId = index // Store index dynamically
        title.textContent = book.title;
        author.textContent = `by ${book.author}`;
        pages.textContent = `Pages: ${book.pages}`;
        actions.classList.add("book-actions");
        removeBtn.textContent = "Delete";
        readBtn.textContent = "Toggle Read";

        removeBtn.addEventListener("click", () => {
            library.removeBook(parseInt(div.dataset.libraryId));
            this.#updateScreen();
        })
        
        readBtn.addEventListener("click", (e)=> {
            library.toggleBookRead(parseInt(div.dataset.libraryId));
            e.target.classList.toggle("is-read", book.isRead);
        })

        if (book.isRead) readBtn.classList.add("is-read");
        [readBtn, removeBtn].forEach(btn => actions.appendChild(btn));
        [title, author, pages, actions].forEach(el => div.appendChild(el));

        return div;
    }

    #addBooktoLibrary(e){
        let response = e.target.returnValue;
        
        if(response === "default"){
            library.addBook(this.#inputTitle.value, 
                this.#inputAuthor.value, this.#inputPages.value);
            this.#updateScreen();
        } 

        this.#bookForm.reset();
    }
}






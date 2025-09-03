class Library {
    static libraryArray = [];

    static #generateRandomId() {
        return crypto.randomUUID();
    }

    static addBookToLibrary(title, author, pages, read) {
        const id = this.#generateRandomId();
        const newBook = new Book(id, title, author, pages, read);
        this.libraryArray.push(newBook);
    }
}

class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    changeReadStatus() {
        this.read = !this.read;
        View.displayBook();
    }
}

class View {
    static cardContainer = document.querySelector(".card-container");
    static openModalButton = document.querySelector("#open-modal");
    static dialog = document.querySelector("dialog");
    static addBookButton = document.querySelector("#form > button");
    static form = document.querySelector("#form");
    static deleteButton = document.querySelector("#close-button");

    static displayBook() {
        this.cardContainer.innerHTML = "";
        Library.libraryArray.forEach((book) => {
            const newCard = document.createElement("div");
            newCard.className = "card";
            newCard.dataset.bookID = book.id;
            this.cardContainer.appendChild(newCard);

            const title = document.createElement("p");
            title.textContent = book.title;
            newCard.appendChild(title);

            const author = document.createElement("p");
            author.textContent = "written by: " + book.author;
            newCard.appendChild(author);

            const pages = document.createElement("p");
            pages.textContent = "pages: " + book.pages;
            newCard.appendChild(pages);

            const readButton = document.createElement("button");
            readButton.textContent = View.readHelper(book.read);
            readButton.addEventListener("click", () => book.changeReadStatus());
            newCard.appendChild(readButton);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "🗑️";
            deleteButton.addEventListener("click", () => View.deleteBook(book.id));
            newCard.appendChild(deleteButton);
        });
    }

    static openModal() {
        this.dialog.showModal();
    }

    static closeModal() {
        this.clearModal();
        this.dialog.close();
    }

    static readHelper(readStatus) {
        return readStatus ? "unread" : "read";
    }

    static clearModal() {
        const inputs = document.querySelectorAll("#title, #author, #pages");
        inputs.forEach((input) => (input.value = ""));
        const readInputs = document.querySelectorAll("#read");
        readInputs.forEach((input) => {
            input.checked = false;
        });
    }

    static addBook(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        Library.addBookToLibrary(
            formData.get("title"),
            formData.get("author"),
            formData.get("pages"),
            formData.get("read") === "on" // checkbox
        );
        View.displayBook();
        this.closeModal();
    }

    static deleteBook(id) {
        const index = Library.libraryArray.findIndex((book) => book.id === id);
        if (index > -1) {
            Library.libraryArray.splice(index, 1);
        }
        View.displayBook();
    }

    static init() {
        this.openModalButton.addEventListener("click", () => this.openModal());
        this.form.addEventListener("submit", (e) => this.addBook(e));
        this.deleteButton.addEventListener("click", () => this.closeModal());
    }
}
Library.addBookToLibrary("Example Book", "me", 100, true);
View.init();
View.displayBook();

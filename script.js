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
        if(!this.#validateForm()){
            const errorMsg = document.querySelector("form > span")
            errorMsg.textContent = "please fill up all the form with valid data"
            return
        }
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

    static #initValidate(){
        const title = document.querySelector("#title")
        title.addEventListener("input", () => this.#validateTitle())

        const author = document.querySelector("#author")
        author.addEventListener("input", () => this.#validateAuthor())

        const pages = document.querySelector("#pages")
        pages.addEventListener("input", () => this.#validatePages())
    }

    static #validateForm() {
        const title = document.querySelector("#title")
        const author = document.querySelector("#author")
        const pages = document.querySelector("#pages")

       return title.validity.valid && author.validity.valid && pages.validity.valid 
    }

    static #validateTitle() {
        const title = document.querySelector("#title")
        if (title.validity.tooShort) {
            title.setCustomValidity("Title too short")
            title.reportValidity()
            title.classList.add("invalid")
            return false
        } else {
            title.setCustomValidity("")
            title.classList.remove("invalid")
            return true
        }
    }
    static #validateAuthor() {
        const author = document.querySelector("#author")
        if (author.validity.tooShort) {
            author.setCustomValidity("Author too short")
            author.reportValidity()
            author.classList.add("invalid")
            return false
        } else {
            author.setCustomValidity("")
            author.classList.remove("invalid")
            return true
        }
    }
    static #validatePages() {
        const pages = document.querySelector("#pages")
        if (pages.validity.rangeUnderflow) {
            pages.setCustomValidity("Must be larger than 0")
            pages.reportValidity()
            pages.classList.add("invalid")
            return false
        } else {
            pages.setCustomValidity("")
            pages.classList.remove("invalid")
            return true
        }
    }

    static init() {
        this.openModalButton.addEventListener("click", () => this.openModal());
        this.form.addEventListener("submit", (e) => this.addBook(e));
        this.deleteButton.addEventListener("click", () => this.closeModal());

        this.#initValidate()
    }

}
Library.addBookToLibrary("Example Book", "me", 100, true);
View.init();
View.displayBook();

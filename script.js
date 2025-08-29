const myLibrary = []

const cardContainer = document.querySelector(".card-container")
const openModalButton = document.querySelector("#open-modal")
const dialog = document.querySelector("dialog")
const addBookButton = document.querySelector("#form > button")
const form = document.querySelector("#form")
const deleteButton = document.querySelector("#close-button")
function Book(id, title, author, pages, read) {
    this.id = id
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.changeReadStatus = function(){
    this.read = !this.read
    displayBook()
}

function generateRandomId() {
    return crypto.randomUUID()
}
function addBookToLibrary(title, author, pages, read) {
    const id = generateRandomId()
    const newBook = new Book(id, title, author, pages, read)
    myLibrary.push(newBook)
}

function displayBook() {
    cardContainer.innerHTML = ""
    myLibrary.forEach((book) => {

        const newCard = document.createElement("div")
        newCard.className = "card"
        newCard.dataset.bookID = book.id
        cardContainer.appendChild(newCard)

        const title = document.createElement("p")
        title.textContent = book.title
        newCard.appendChild(title)

        const author = document.createElement("p")
        author.textContent = "written by: " + book.author
        newCard.appendChild(author)

        const pages = document.createElement("p")
        pages.textContent = "pages: " + book.pages
        newCard.appendChild(pages)

        const readButton = document.createElement("button");
        readButton.textContent = readHelper(book.read)
        readButton.addEventListener("click", () => book.changeReadStatus())
        newCard.appendChild(readButton)

        const deleteButton = document.createElement("button")
        deleteButton.addEventListener("click", () => deleteBook(book.id))
        deleteButton.textContent = "🗑️"
        newCard.appendChild(deleteButton)

    })
}
function openModal() {
    dialog.showModal()
}

function closeModal() {
    clearModal()
    dialog.close()
}

function readHelper(readStatus){
    if (readStatus === true){
        return "unread"
    } else {
        return "read"
    }
}


function clearModal() {
    const inputs = document.querySelectorAll("#title, #author, #pages");
    inputs.forEach((input) => input.value = "")
    const readInputs = document.querySelectorAll("#read")
    readInputs.forEach((input) => {
        input.checked = false
    })
}

function addBook(e) {
    e.preventDefault()
    const formData = new FormData(form)
    addBookToLibrary(formData.get("title"), formData.get("author"), formData.get("pages"), formData.get("read"))
    displayBook()
    closeModal()
}

function deleteBook(id){
    const index = myLibrary.findIndex((book) => book.id === id)
    myLibrary.splice(index,1)
    displayBook()
}
openModalButton.addEventListener("click", openModal)
form.addEventListener("submit", (e) => {
    addBook(e)
})
deleteButton.addEventListener("click", () => closeModal())

addBookToLibrary("Example Book", "me", 100, true)
displayBook()
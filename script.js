const myLibrary = []

const cardContainer = document.querySelector(".card-container")

function Book(id, title, author, pages, read) {
    this.id = id
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}
function generateRandomId() {
    return crypto.randomUUID()
}
function addBookToLibrary(title, author, pages, read) {
    const id = generateRandomId()
    const newBook = new Book(id, title, author, pages, read)
    myLibrary.push(newBook)
}

addBookToLibrary("test", "me", 123, true)
addBookToLibrary("test1", "me1", 123, true)

function displayBook() {
    myLibrary.forEach((book) => {

        const newCard = document.createElement("div")
        newCard.className = "card"
        cardContainer.appendChild(newCard)

        const title = document.createElement("p")
        title.textContent = book.title
        newCard.appendChild(title)

        const author = document.createElement("p")
        author.textContent = book.title
        newCard.appendChild(author)

        const pages = document.createElement("p")
        pages.textContent = book.pages
        newCard.appendChild(pages)

        const read = document.createElement("p")
        read.textContent = book.read
        newCard.appendChild(read)
        
    })

}
displayBook()
class Book {
    constructor(title, isbn, author) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById("book-list");
        // Create tr element
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>    
        <td>${book.author}</td>    
        <td>${book.isbn}</td>    
        <td><a href="#" class="delete">X</a></td>    
        `;
    
        list.appendChild(row);
    }

    showAlert(message, className) {
        // Create Element
        const div = document.createElement("div");
        // Add class
        div.className = `alert ${className}`;
        // Append textnode
        div.appendChild(document.createTextNode(message));
        // Get container
        const container = document.querySelector(".container");
        // Get form
        const form = document.querySelector("#book-form");
        // Insert before form
        container.insertBefore(div, form);
        // Time out after 3 seconds
        setTimeout(function() {
            document.querySelector(".alert").remove();
        },3000);
    }

    clearFields(target) {
        const inputs = document.getElementById("book-form").querySelectorAll("input[type='text']");
        inputs.forEach(function(book){
            book.value = '';
        });
    }

    deleteBook(target) {
        if(target.className === "delete") {
            target.parentElement.parentElement.remove();
        }
    }
}

class Store {
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static getBooks() {
        let books;
        if(localStorage.getItem('books') == null ) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }

    static displayBooks() {
        const books  = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI();

            // Add book to UI
            ui.addBookToList(book);
        });
    }

    static removeBook(isbn) {
        const books  = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn == isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }
}

// DOM load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Eventlistener for adding book
document.getElementById("book-form").addEventListener("submit", function(e) {
    // Get form values
    const title = document.getElementById("Title").value,
          author = document.getElementById("Author").value,
          isbn = document.getElementById("Isbn").value

          // Instantiate Book
          const book = new Book(title, author, isbn);

          // Instantiate UI
          const ui = new UI();

          // Validate
          if(title === '' || author === '' || isbn === '') {
              ui.showAlert("Please fill in all fields", "error");
          } else {
              // Add book to list
              ui.addBookToList(book);

              // Add to LS
              Store.addBook(book);

              // Show success
              ui.showAlert("Book added", "success");
    
              // Clear fields
              ui.clearFields();
          }

    e.preventDefault();
});

// Eventlistener for deleting book
document.getElementById("book-list").addEventListener("click", function(e) {
    // Instantiate ui
    const ui = new UI();
    // Delete book from UI
    ui.deleteBook(e.target);
    // Delete book from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Show alert
    ui.showAlert("Book removed", "success");

    e.preventDefault();
});
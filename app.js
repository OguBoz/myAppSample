// BOOK CONSTRUCTOR
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI CONSTRUCTOR
function UI() {
}

UI.prototype.addBookToList = function(book) {
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

UI.prototype.clearFields = function() {
    const inputs = document.getElementById("book-form").querySelectorAll("input[type='text']");
    inputs.forEach(function(book){
        book.value = '';
    });
}

// Show messages
UI.prototype.showAlert = function(message, className) {
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

// Delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === "delete") {
        target.parentElement.parentElement.remove();
    }
}


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
    // Delete book
    ui.deleteBook(e.target);
    // Show alert
    ui.showAlert("Book removed", "success");

    e.preventDefault();
});
// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() { }

// Add Book Prototype
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');

  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
`;

  list.appendChild(row);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields after submit
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Alert Messages
UI.prototype.showAlert = function(message, className) {
  // Create a div
  const div = document.createElement('div');
  // Add Classes
  div.className = `alert ${className}`;
  // Add Test
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  container.insertBefore(div, form);

  // Remove after 3 seconds
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000)
}


// Event Listeners for Add Book
document.getElementById('book-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // Get Form Values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    ui.showAlert('Book Added!', 'success')

    // Clear fields
    ui.clearFields();
  }
});

// Event Listener for delete book
document.getElementById('book-list').addEventListener('click', function(e) {
  e.preventDefault();

  // Instantiate UI
  const ui = new UI();
  // Delete Book
  ui.deleteBook(e.target);
  // Show message
  ui.showAlert('Book has been deleted!', 'success')
})
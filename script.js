//Book constructor
function Book(bookTitle, bookAuthor, bookISBN) {
  this.bookTitle = bookTitle;
  this.bookAuthor = bookAuthor;
  this.bookISBN = bookISBN;
}

//UI constructor
class userInferface {
  constructor() { }
  //add book to list
  addBookToList(book) {
    const bookList = document.getElementById('book-list');
    //create tr element
    const tableRow = document.createElement('tr');
    //insert cols
    tableRow.innerHTML = `
  <td>${book.bookTitle}</td>
  <td>${book.bookAuthor}</td>
  <td>${book.bookISBN}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
    bookList.appendChild(tableRow);
  }
  //Show Alert 
  showAlert(message, className) {
    const alertBody = document.createElement('div');
    alertBody.className = `alert ${className}`;
    alertBody.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const bookForm = document.getElementById('book-form');
    container.insertBefore(alertBody, bookForm);
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }
  //delete book
  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
      this.showAlert('Book removed', 'success');
    }
  }
  //clear fields
  clearFields() {
    document.getElementById('book-form').reset();
  }
}






//Event listeners
document.getElementById('book-form').addEventListener('submit', function (e) {
  //get forms values
  const bookTitle = document.getElementById('title').value,
        bookAuthor = document.getElementById('author').value,
        bookISBN = document.getElementById('isbn').value

  const book = new Book(bookTitle, bookAuthor, bookISBN);
  
  //instantiate UI
  const ui = new userInferface();

  //Validate
  if(bookTitle === '' || bookAuthor === '' || bookISBN === '') {
    //error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    ui.addBookToList(book);
    ui.showAlert('Book added!', 'success')
    ui.clearFields();
  }

  e.preventDefault();
});


//event listeners for delete book
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new userInferface();
  ui.deleteBook(e.target);
  e.preventDefault();
});

class Book {
  constructor(bookTitle, bookAuthor, bookISBN) {
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookISBN = bookISBN;
  }
}

class userInferface {
  addBookToList(book) {
    const bookList = document.getElementById('book-list');
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${book.bookTitle}</td>
      <td>${book.bookAuthor}</td>
      <td>${book.bookISBN}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
    bookList.appendChild(tableRow);
  }

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

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
      this.showAlert('Book removed', 'success');
    }
  }

  clearFields() {
    document.getElementById('book-form').reset();
  }
}

//local storage class
class storeBook {
  static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = storeBook.getBooks();
    books.forEach(function(book) {
      const ui = new userInferface;
      //add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = storeBook.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(bookISBN) {
    const books = storeBook.getBooks();

    books.forEach(function(book, index) {
      if(book.bookISBN === bookISBN) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}


//DOM load event
document.addEventListener('DOMContentLoaded', storeBook.displayBooks);



//event listeners for add book
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
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    ui.addBookToList(book);
    ui.showAlert('Book added!', 'success')
    ui.clearFields();
    storeBook.addBook(book);
  }

  e.preventDefault();
});


//event listeners for delete book
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new userInferface();
  ui.deleteBook(e.target);
  storeBook.removeBook(e.target.parentElement.previousElementSibling.textContent);
  e.preventDefault();
});

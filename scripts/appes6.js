class Book {
	constructor(title, author, isbn) {
		
		this.title = title;
		this.author = author;
		this.isbn = isbn;
		
}
	
}

class UI {

addBookToList(book){
	const list = document.getElementById('book-list');
	
	//create tr element
    const row = document.createElement('tr');
	//insert cols
	row.innerHTML = `
	<td>${book.title}</td>
	<td>${book.author}</td>
	<td>${book.isbn}</td>
	<td><a href="#" class="delete">x</a></td>
	
	`;
	
	list.appendChild(row);
	
}

showAlert(message, className){
	//create div
	const div = document.createElement('div');
	//add classes
	div.className = `alert ${className}`;
	
	//add text
	div.appendChild(document.createTextNode(message));
	
	//get parent
	const container = document.querySelector('.container');
	
	const bookForm = document.querySelector('#book-form');
	
	//insert
	container.insertBefore(div, bookForm);
	
	
	//timeout after 3secs
	
	setTimeout( function(){
	document.querySelector('.alert').remove();
	}, 3000);
	
}


deleteBook(target){
	
	if(target.className === 'delete'){
		target.parentElement.parentElement.remove();
		
	}
	
}

clearFields(){
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
	
	
}
}

//local storage class
class Store {
	static getBooks(){
	let books;
	if(localStorage.getItem('books') === null){
		
		books = [];
		
		
	} else {
		
		books = JSON.parse(localStorage.getItem('books'));
		
		
	}
		
	return books;
		
	}
	
	static displayBooks(){
		const books = Store.getBooks();
		
		books.forEach(function(book){
			const ui = new UI();
			
			
			ui.addBookToList(book);
			
			
			
			
		});
		
	}
	
	static addBook(book){
		const books = Store.getBooks();
		console.lo
		books.push(book);
		
		localStorage.setItem('books', JSON.stringify(books));
		
		
	}
	
	static removeBook(isbn){
		const books = Store.getBooks();
		
		books.forEach(function(book, index){
			const ui = new UI();
			
			if(book.isbn === isbn){
				books.splice(index, 1);	
			}
		});
		
		localStorage.setItem('books', JSON.stringify(books));
	}
}
	
	

    document.addEventListener('DOMContentLoaded', Store.displayBooks);



	document.getElementById('book-form').addEventListener('submit', function(e){
	
	//get form values
	const title = document.getElementById('title').value,
	      author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
		  
		  
		  
		  
    //create book record
	const book = new Book(title, author , isbn);
	
	//create UI
	const ui = new UI();
	
	//validate
	if(title === '' || author === '' || isbn === ''){
		//error alert
		ui.showAlert('please fill in all fields', 'error');
	} else {
	
	//add to list 
	ui.addBookToList(book);
	
	//add to ls
	Store.addBook(book);
	
	//add book alert 
	ui.showAlert('book added!', 'success');
	
	// clear fields
	ui.clearFields();
	
	}
e.preventDefault();	
});

// event listener for delete 
document.getElementById('book-list').addEventListener('click', function (e){
	
	const ui = new UI();
	
	//delete book 
	ui.deleteBook(e.target);
	
	//remove from lS
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
	
	//show message
	ui.showAlert('Book Removed!', 'success');
	
e.preventDefault();	
});


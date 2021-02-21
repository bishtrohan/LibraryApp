//class for creating books as object
class bookData {
  constructor(bookName, authorName, submitDate, issueDate, category, bookDescription) {
    this.bookName = bookName;
    this.authorName = authorName;
    this.submitDate = submitDate;
    this.issueDate = issueDate;
    this.category = category;
    this.bookDescription = bookDescription;
  }

}


// to display books data from local storage
getfromLocal();
function getfromLocal()
{
  if (localStorage.getItem("mybooks") != null)
  {
    console.log("getlocal");
    let showbook = JSON.parse(localStorage.getItem("mybooks"));
    for (let index = 0; index < showbook.length; index++) 
    {
      document.querySelector(".table").innerHTML += ` <tbody>
                                                      <tr>
                                                        <th scope="row">${index+1}</th>
                                                        <td>${showbook[index].authorName}</td>
                                                        <td>${showbook[index].bookName}</td>
                                                        <td>${showbook[index].submitDate}</td>
                                                        <td>${showbook[index].issueDate}</td>
                                                        <td>${showbook[index].category}</td>
                                                        <td>${showbook[index].bookDescription}</td>
                                                        <td> <button  id="${index+1}" class="delBtn">Delete</button></td>
                                                      </tr>
                                                    </tbody> `;

    }
  }
}


// To add a book in the table
let checkForm = document.querySelector("form");
document.getElementById("submitBtn").addEventListener("click", function (event) {
  if (checkForm.checkValidity())
  {
    event.preventDefault();
    bookName = document.getElementById("bookName").value;
    authorName = document.getElementById("authorName").value;
    submitDate = document.getElementById("submitDate").value;
    issueDate = document.getElementById("issueDate").value;
    category = document.getElementById("category").value;
    bookDescription = document.querySelector(".bookDescription").value;
    let book = new bookData(bookName, authorName, submitDate, issueDate, category, bookDescription);
    storeLocal(book);  // to store the book in local storage

    //to get the serial number of the latest added book
    let serial =JSON.parse(localStorage.getItem("mybooks")).length;
    printTable(serial);
    document.getElementById("bookName").value = "";
    document.getElementById("authorName").value = "";
    document.getElementById("submitDate").value = "";
    document.getElementById("issueDate").value = "";
    document.getElementById("category").value = "";
    document.querySelector(".bookDescription").value = "";
  }
});

// To display the added book 
function printTable(serial) {
  document.querySelector(".table").innerHTML += `
    <tbody>
    <tr>
      <th scope="row">${serial}</th>
      <td>${bookName}</td>
      <td>${authorName}</td>
      <td>${submitDate}</td>
      <td>${issueDate}</td>
      <td>${category}</td>
      <td>${bookDescription}</td>
      <td> <button  id="${serial}" class="delBtn">Delete</button></td>
    </tr>
  </tbody> `;
}

// adding the book to local storage
let newbook = new Array();
function storeLocal(book) {
  if (localStorage.getItem("mybooks") == null) {
    newbook[0] = book;
    localStorage.setItem("mybooks", JSON.stringify(newbook));
  }
  else {
    newbook = JSON.parse(localStorage.getItem("mybooks"));
    newbook.push(book);
    localStorage.setItem("mybooks", JSON.stringify(newbook));
  }
}

// to delete a book 
  document.addEventListener("click",function(event)
  {
    if(event.target.className=="delBtn")
    {
      let index=event.target.id-1;
      deleteBook = JSON.parse(localStorage.getItem("mybooks"));
      console.log( deleteBook[index]);
      deleteBook.splice(index,1);
      localStorage.setItem("mybooks", JSON.stringify(deleteBook));
      document.querySelector(".table").innerHTML=`<table class="table table-info table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Book Name</th>
          <th scope="col">Author Name</th>
          <th scope="col">Date of Submission</th>
          <th scope="col">Date of Issue</th>
          <th scope="col">Category</th>
          <th scope="col">Book Description</th>
          <th scope="col">Delete Books</th>
        </tr>
      </thead>
    </table>`
      getfromLocal();
    }
  });
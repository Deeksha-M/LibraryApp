let bookList = [];

const book = function(number, title, author, pages, status){
    this.number = number;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function appendRow(){
    var tbl = document.getElementById("book-table");
    
    for(var j = tbl.rows.length-1; j >= 1; j--){
        document.getElementById("book-table").deleteRow(j);
        console.log(tbl.rows.length);
    }
    var row = tbl.insertRow(tbl.rows.length),
        i,
        bookCopy = [];
    
    for(var j = 1; j <= bookList.length ; j++){
        bookCopy.push(bookList[j-1].title);
        bookCopy.push(bookList[j-1].author);
        bookCopy.push(bookList[j-1].pages);
        bookCopy.push(bookList[j-1].status);
        bookCopy.push(bookList[j-1].number);
        
        for (i = 0; i < tbl.rows[0].cells.length; i++) {
        if(i === 3){
            if(bookCopy[j-1].status === true)
                createButton(row.insertCell(i), "Read", "change-status", bookCopy[4]);
            else
                createButton(row.insertCell(i), "Unread", "change-status", bookCopy[4]);
        }
        else if(i === 4){
            createButton(row.insertCell(i), "Delete", "change-delete","row");
        }
        else
            createCell(row.insertCell(i), bookCopy[i], "row");
    }
    }
}

function createCell(cell, text, style) {
    var div = document.createElement('div'),
        txt = document.createTextNode(text);
    div.appendChild(txt);                    
    div.setAttribute("class", style); 
    div.setAttribute("className", style);
    cell.appendChild(div);
}

function addBook(){
    var number = bookList.length+1,
        title = document.getElementById("title").value,
        authour = document.getElementById("author").value,
        pages = document.getElementById("pages").value,
        status = document.querySelector("#read").checked;
    
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").value = "";
    bookList.push(new book(number, title, authour, pages, status));
    appendRow();
}

function createButton(cell, text, style, value){
    var div = document.createElement("BUTTON"); 
        div.innerHTML = text;
    
    div.setAttribute("class",style);
    div.setAttribute("className",style);
    div.addEventListener("click",toggleButton);
    div.value = value;
    cell.appendChild(div);   
}

function toggleButton(){
    var i = this.value,
        j = 2*(i-1);
    if(this.className === "change-status"){
        if(this.innerHTML === "Read"){
            bookList[i-1].read = "flase";   
        }
        document.getElementById("Read".concat(i)).removeAttribute("class");
        document.getElementById("Read".concat(i)).setAttribute("class","change-unread");
        document.getElementById("Read".concat(i)).innerHTML = "Unread";
        document.getElementById("Read".concat(i)).setAttribute("id","Unread".concat(i));
    }else if(this.className === "change-unread"){
        bookList[i-1].read = "true";
        document.getElementById("Unread".concat(i)).removeAttribute("class");
        document.getElementById("Unread".concat(i)).setAttribute("class","change-read");
        document.getElementById("Unread".concat(i)).innerHTML = "Read";
        document.getElementById("Unread".concat(i)).setAttribute("id","Read".concat(i));
    }else{
        var i = this.value;
        document.getElementById("book-table").deleteRow(i);
        
    }
}


document.getElementById("add-book").onclick = function(){
    document.getElementById("book-details").style.display = "block";
    document.getElementById("add-section").style.display = "none";
    document.getElementById("bookDisplay").style.display = "none";
}

document.getElementById("submit").onclick = function(){
    addBook();
    document.getElementById("book-details").style.display = "none";
    document.getElementById("add-section").style.display = "block";
    document.getElementById("bookDisplay").style.display = "block";
}

document.getElementById("cancel").onclick = function(){
    document.getElementById("book-details").style.display = "none";
    document.getElementById("add-section").style.display = "block";
    document.getElementById("bookDisplay").style.display = "block";
}


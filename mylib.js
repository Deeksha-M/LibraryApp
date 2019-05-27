let bookList = [];

const book = function(number, title, author, pages, status){
    this.number = number;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function rowDelete(){
    var tbl = document.getElementById("book-table");
    
    for(var j = bookList.length-1; j >= 1; j--){
        document.getElementById("book-table").deleteRow(j);
        console.log(tbl.rows.length);
    }
    appendRow();
}

function appendRow(){
    var tbl = document.getElementById("book-table");
    
    var i,
        bookCopy = [];
    
    for(var k = 1; k <= bookList.length; k++){
        var row = tbl.insertRow(tbl.rows.length);
        bookCopy.push(bookList[k-1].title);
        bookCopy.push(bookList[k-1].author);
        bookCopy.push(bookList[k-1].pages);
        bookCopy.push(bookList[k-1].status);
        bookCopy.push(bookList[k-1].number);
        for (i = 0; i < tbl.rows[0].cells.length; i++) {
            if(i === 3){
                if(bookCopy[3+5*(k-1)] === true)
                    createButton(row.insertCell(i), "Read", "change-status", bookCopy[4+5*(k-1)]);
                else
                    createButton(row.insertCell(i), "Unread", "change-status", bookCopy[4+5*(k-1)]);
            }
            else if(i === 4){
                createButton(row.insertCell(i), "Delete", "change-delete",bookCopy[4+5*(k-1)]);
            }
            else
                createCell(row.insertCell(i), bookCopy[i+5*(k-1)], "row");
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
    window.localStorage.setItem("bookList",JSON.stringify(bookList));
    rowDelete();
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
            bookList[i-1].status = "flase";
            this.innerHTML = "Unread";
        }else{
            bookList[i-1].status = "true";
            this.innerHTML = "Read";
        }
        window.localStorage.setItem("bookList",JSON.stringify(bookList));
    }else{
        document.getElementById("book-table").deleteRow(i);
        bookList.splice((i-1),1);
        for(var j = 0; j < bookList.length; j++){
            if(bookList[j].number > i){
                bookList[j].number -= 1;
                document.getElementsByClassName("change-delete")[j].value -= 1;
                document.getElementsByClassName("change-status")[j].value -= 1;
            }
        }
        window.localStorage.setItem("bookList",JSON.stringify(bookList));
        //localStorage["bookList"] = JSON.stringify(bookList);
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

window.onload = function(){
    if(localStorage.getItem("bookList") === null){
        bookList = [];
    }
    else
        bookList = JSON.parse(window.localStorage.getItem("bookList"));
    appendRow();
}
// 🔐 USERS (dynamic style)
const users = [
    { username: "adm", password: "adm", role: "admin" },
    { username: "user", password: "user", role: "user" }
];

// 📚 STORAGE
let books = JSON.parse(localStorage.getItem("books")) || [];

// 🔐 LOGIN
function login(){
    let u = document.getElementById("user").value;
    let p = document.getElementById("pass").value;

    if(u === "" || p === ""){
        alert("Enter credentials");
        return;
    }

    let found = users.find(x => x.username === u && x.password === p);

    if(found){
        localStorage.setItem("role", found.role);
        window.location = found.role === "admin" ? "admin.html" : "user.html";
    } else {
        alert("Invalid login");
    }
}

// 🏠 HOME NAV
function goHome(){
    let role = localStorage.getItem("role");
    window.location = role === "admin" ? "admin.html" : "user.html";
}

// ➕ ADD BOOK
function addBook(){
    let name = document.getElementById("name").value;

    if(name === ""){
        alert("Enter book/movie name");
        return;
    }

    books.push({
        name: name,
        status: "Available"
    });

    localStorage.setItem("books", JSON.stringify(books));
    window.location = "success.html";
}

// 📊 LOAD BOOKS TABLE
function loadBooks(){
    let table = document.getElementById("table");
    let data = JSON.parse(localStorage.getItem("books")) || [];

    let html = "<tr><th>Name</th><th>Status</th></tr>";

    data.forEach(b=>{
        html += `<tr><td>${b.name}</td><td>${b.status}</td></tr>`;
    });

    table.innerHTML = html;
}

// 🔄 ISSUE BOOK
function issue(){
    let name = document.getElementById("book").value;

    let data = JSON.parse(localStorage.getItem("books")) || [];

    let book = data.find(b => b.name === name);

    if(!book){
        alert("Book not found");
        return;
    }

    book.status = "Issued";

    localStorage.setItem("books", JSON.stringify(data));
    window.location = "success.html";
}

// 🔁 RETURN BOOK
function returnBook(){
    let name = document.getElementById("book").value;

    let data = JSON.parse(localStorage.getItem("books")) || [];

    let book = data.find(b => b.name === name);

    if(!book){
        alert("Book not found");
        return;
    }

    book.status = "Available";

    localStorage.setItem("books", JSON.stringify(data));
    window.location = "success.html";
}
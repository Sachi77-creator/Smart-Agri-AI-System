let books = [];
fetch("librar.xml")
    .then((response) => response.text())
    .then((xmlData) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const bookNodes = xmlDoc.getElementsByTagName("book");

        for (let i = 0; i < bookNodes.length; i++) {
            const bookNode = bookNodes[i];
            let book = {
                id: bookNode.getElementsByTagName("id")[0].textContent,
                title: bookNode.getElementsByTagName("title")[0].textContent,
                author: bookNode.getElementsByTagName("author")[0].textContent,
                category: bookNode.getElementsByTagName("category")[0].textContent,
                year: bookNode.getElementsByTagName("year")[0].textContent,
                status: bookNode.getElementsByTagName("status")[0].textContent,
            };
            books.push(book);
        }
        displayBooks(books);
    });
function displayBooks(bookArray) {
    const tableBody = document.getElementById("bookTable");
    tableBody.innerHTML = "";
    for (let i = 0; i < bookArray.length; i++) {
        let book = bookArray[i];
        let borrowButton = "";
        if (book.status !== "Borrowed") {
            borrowButton = `<button onclick="borrowBook('${book.id}')">Borrow</button>`;
        }
        let row = `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.year}</td>
                <td>${book.status}</td>
                <td>${borrowButton}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    }
}
function borrowBook(bookId) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === bookId) {
            books[i].status = "Borrowed";
            break;
        }
    }
    displayBooks(books);
}
function saveBook() {
    const id = document.getElementById("id").value.trim();
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const year = document.getElementById("year").value.trim();
    if (!id || !title || !author || !year) {
        alert("Please fill all fields.");
        return;
    }
    books.push({
        id: id,
        title: title,
        author: author,
        category: "N/A",
        year: year,
        status: "Available",
    });

    clearForm();
    displayBooks(books);
}
function clearForm() {
    document.getElementById("id").value = "";
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("year").value = "";
}
function searchBooks() {
    const keyword = document.getElementById("searchInput").value.trim().toLowerCase();

    if (keyword === "") {
        displayBooks(books); 
        return;
    }
    const filtered=books.filter((book)=>{
       return  book.title.toLowerCase().includes(keyword);
    });
    displayBooks(filtered);
}


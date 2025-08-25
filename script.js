
function Books(name ,author , pages , read)
{
    this.name = name;
    this.id = crypto.randomUUID();
    this.author = author;
    this.pages = pages;
    this.read = read;

}

const Library = [new Books("Moby-Dick" , "Herman Melville" , "635" , "Yes") ,
                         new Books("The Alchemist", "Paulo Coelho" , "208" , "No") ,
                         new Books("Brave New World", "Aldous Huxley" ,"288" , "Yes")];

function addBooktoLibrary(name , author , pages , read)
{
    const book = new Books(name , author , pages , read );
    Library.push(book);
}


function displayBooks() {

    let display_container = document.getElementById("display_container");

    if (!display_container) {
        display_container = document.createElement("div");
        display_container.id = "display_container";
        const button = document.getElementById("new_book");
        button.insertAdjacentElement("beforebegin", display_container);
    }

    display_container.innerHTML = "";

    const table = document.createElement("table");

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
      <th>Name</th>
      <th>Author</th>
      <th>Pages</th>
      <th>Read</th>
      <th>Read Status</th>
      <th>Remove</th>
    `;
    table.appendChild(headerRow);

    Library.forEach((book , index) => {
        const row = document.createElement("tr");


        const change_status = document.createElement("button");
        change_status.id = "change_status_button";
        change_status.textContent = book.read === "Yes" ? "Mark unread" : "Mark read";
        change_status.addEventListener("click" , () => {
            book.read = book.read === "Yes" ? "No" : "Yes";
            displayBooks();
        });

        const remove_book_button = document.createElement("button");
        remove_book_button.id = "remove_button";
        remove_book_button.textContent = "Remove Book";
        remove_book_button.addEventListener("click" , () => {
          Library.splice(index , 1);
          displayBooks();
        });

        row.innerHTML = `
          <td><strong>${book.name}</strong></td>
          <td><strong>${book.author}</strong></td>
          <td><strong>${book.pages}</strong></td>
          <td><strong>${book.read}</strong></td>
         
        `;

        const status_change_button_container = document.createElement("td");
        status_change_button_container.append(change_status);

        const remove_book_button_container = document.createElement("td");
        remove_book_button_container.append(remove_book_button);



        row.append(status_change_button_container);
        row.append(remove_book_button_container);
        table.appendChild(row);
    });

    display_container.appendChild(table);
}

function addNewBook()
{
     const overlay = document.createElement("div");
     overlay.id = "overlay";

     const form_container = document.createElement("div");
     form_container.id = "form_container";

     const form = document.createElement("form");
     form.id = "form";

     form.innerHTML = `
         <input type="text" placeholder="Book Name" id="book_name" required>
         <input type="text" placeholder="Author Name" id="author_name" required>
         <input type="number" placeholder="Pages" id="pages" required>
         
         <label style="font-size: 20px;">
            <input type="checkbox" id="read" style="height: 15px; width:15px;"> Already Read?
        </label>
        
         <button type="submit" id="add_book_button">Add Book</button>
         <button type="button" id="cancel_button">Cancel</button>`;

     form.addEventListener("submit" , function(e) {
         e.preventDefault();

         const name = document.getElementById("book_name").value;
         const author_name = document.getElementById("author_name").value;
         const pages = document.getElementById("pages").value;
         const read = document.getElementById("read").checked ? "Yes" : "No";

         addBooktoLibrary(name , author_name , pages , read , "");
         displayBooks();

         overlay.remove();
     });

     form.querySelector("#cancel_button").addEventListener("click" , () => {
         overlay.remove();
     });

     form_container.append(form);
     overlay.append(form_container);
     document.body.append(overlay);


}

const header_text = document.createElement("p");
header_text.id = "header_text";
header_text.textContent = "My Library";
header_text.style.fontSize = "40px";
header_text.style.fontWeight = "bold";
header_text.style.textAlign = "center";
header_text.style.marginBottom = "0";



document.body.prepend(header_text);

displayBooks();



function Books(name)
{
    this.name = name;
    this.id = crypto.randomUUID();
}

const Library = [new Books("Book1") , new Books("Book2") , new Books("Book3")];

function addBooktoLibrary(name)
{
    const book = new Books(name);
    Library.push(book);
}

function displayBooks()
{



    const display_container = document.createElement("div");
    display_container.id = "display_container";
    display_container.innerHTML = "";
    document.body.append(display_container);

    Library.forEach(book => {
      let display = document.createElement("div");
      display.id = "display";
        display.innerHTML = `<strong>Name: ${book.name} </strong>`;
        display_container.append(display);
    });

}

displayBooks();
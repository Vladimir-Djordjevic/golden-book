// when we declere fun that will be Object later we declare it with capital
function Book(
  imageUrl = "",
  title = "",
  author = "",
  year = "",
  categories = "",
  isbn = "",
  description = ""
) {
  this.imageUrl = imageUrl;
  this.title = title;
  this.author = author;
  this.year = year;
  this.categories = categories;
  this.isbn = isbn;
  this.description = description;
}
const book1 = new Book(
  "https://some-pic-jpg",
  "Lord of the rings",
  "J.R.R.Tolkein",
  "11/10/2022",
  "Fantasy",
  "12345",
  "Fantasy book about one ring"
);
console.log(book1);
// fill our bookList and add the book on it
function Books() {
  this.bookList = [];
}

Books.prototype.addBook = function (book) {
  this.bookList.push(book);
};
const bookLibrary = new Books();
bookLibrary.addBook(book1);
console.log(bookLibrary);
//Author
const authorName = [
  "J.R.R.Tolkein",
  "George R. R. Martin",
  "Andrzej Sapkowski",
  "Robert Jordan",
];

const bookCategories = [
  "Fantasy",
  "Sci-Fi",
  "Mystery",
  "Thriller",
  "Romance",
  "Westerns",
];
const authorBook = document.getElementById("author");
Book.prototype.renderOptions = function (authorName, authorBook) {
  for (let author of authorName) {
    let option = document.createElement("option");
    option.setAttribute("value", `${author}`);
    let text = document.createTextNode(author);
    authorBook.appendChild(option).appendChild(text);
  }
};

book1.renderOptions(authorName, authorBook);

const categoriesBook = document.getElementById("categories");
book1.renderOptions(bookCategories, categoriesBook);

Books.prototype.clearFileds = function () {
  document.getElementById("image-url").value = "";
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("year").value = "";
  document.getElementById("categories").value = "";
  document.getElementById("isbn").value = "";
  document.getElementById("description").value = "";
  document.getElementById("description").placeholder = "Description";
};

const addButton = document.getElementById("add");
addButton.addEventListener("click", function (event) {
  const image = document.getElementById("image-url");
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const year = document.getElementById("year");
  const categories = document.getElementById("categories");
  const isbn = document.getElementById("isbn");
  const description = document.getElementById("description");

  const regexImg =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  const isUrlValid = regexImg.test(image.value);
  toggleErrorMessage(image, !isUrlValid);

  const regexTitle = /^[A-Z].{9,49}$/;
  const isTitleValid = regexTitle.test(title.value);
  toggleErrorMessage(title, !isTitleValid);

  let isDropdownValid = author.value == "0";
  toggleErrorMessage(author, isDropdownValid);
  if (!isDropdownValid) {
    description.placeholder = author.value + ` - Description`;
  } else {
    description.placeholder = `Description`;
  }

  let isYearValid = year.value == "";
  toggleErrorMessage(year, isYearValid);

  let isCategoryValid = categories.value == "0";
  toggleErrorMessage(categories, isCategoryValid);

  let isIsbnValid = isbn.value == "";
  toggleErrorMessage(isbn, isIsbnValid);
  const regexDescription = /^.{1,250}$/;
  let isDescriptionValid = regexDescription.test(description.value);
  toggleErrorMessage(description, !isDescriptionValid);

  if (
    isDropdownValid ||
    !isUrlValid ||
    !isTitleValid ||
    isYearValid ||
    isCategoryValid ||
    isIsbnValid ||
    !isDescriptionValid
  ) {
    event.preventDefault();
  } else {
    const bookA = new Book(
      image.value,
      title.value,
      author.value,
      year.value,
      categories.value,
      isbn.value,
      description.value
    );
    bookLibrary.addBook(bookA);
    bookLibrary.clearFileds();
  }
});

function toggleErrorMessage(element, condition) {
  if (condition) {
    element.parentElement
      .querySelector(".errorMessage")
      .classList.remove("display-none");
  } else {
    element.parentElement
      .querySelector(".errorMessage")
      .classList.add("display-none");
  }
}

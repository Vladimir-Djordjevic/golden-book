function User(email, password) {
  this.email = email;
  this.password = password;
}

user1 = new User("vlad@vlada.com", "12345667");

User.prototype.showAlert = function (message, className) {
  const paragraph = document.createElement("p");
  paragraph.className = `alert ${className}`;
  paragraph.appendChild(document.createTextNode(message));
  const wrapper = document.querySelector(".main-wrapper");
  const form = document.querySelector("#apllyForm");
  wrapper.insertBefore(paragraph, form);
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

document
  .getElementById("add-sign-up")
  .addEventListener("click", function (event) {
    const email = document.getElementById("email");
    const regexEmailPass = /^.{8}$/;
    const isEmailValid = regexEmailPass.test(email.value);
    toggleErrorMessage(email, !isEmailValid);

    const password = document.getElementById("password");
    const isPasswordValid = regexEmailPass.test(password.value);
    toggleErrorMessage(password, !isPasswordValid);
    if (!isEmailValid || !isPasswordValid) {
      event.preventDefault();
    }
  });

function toggleErrorMessage(element, condition) {
  if (condition) {
    element.classList.add("email-error");
    element.value = "";
    user1.showAlert(
      `The ${element.placeholder} needs to have 8 characters`,
      "email-error"
    );
  }
}

import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "./config.js";

let emailInp = document.querySelector("#email-inp");
let passInp = document.querySelector("#pass-inp");
let registerForm = document.querySelector("#register-form");
let message = document.querySelector("#message");
let signInBtn = document.querySelector("#sign-in");

function validateForm() {

  if (
    emailInp.value.trim() === "" ||
    passInp.value.trim() === ""
  ) {

    message.innerText = "All fields are required";
    return false;
  }

  return true;
}

async function createUser() {

  try {

    if (!validateForm()) return;

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        emailInp.value,
        passInp.value
      );

    console.log("Success");
    console.log(userCredential.user);

    message.innerText = "Account created successfully";

    emailInp.value = "";
    passInp.value = "";

    setTimeout(() => {
      window.location.replace = "./todo list/index.html";
    }, 1000);

  } catch (error) {

    console.error(error);
    message.innerText = error.message;

  }
}
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.email);
  }
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createUser();
});

signInBtn.addEventListener("click", () => {
  window.location.replace("./login acount/login.html");
});


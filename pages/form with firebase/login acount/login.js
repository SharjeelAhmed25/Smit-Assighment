import {
  auth,
  signInWithEmailAndPassword
} from "../config.js";

let emailInp = document.querySelector("#email-inp");
let passInp = document.querySelector("#pass-inp");
let loginForm = document.querySelector("#login-form");
let message = document.querySelector("#message");

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

async function loginUser() {

  try {

    if (!validateForm()) return;

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        emailInp.value,
        passInp.value
      );

    console.log("Login Success");
    console.log(userCredential.user);

    message.innerText = "Successfully Logged In";

    window.location.href =
      "../todo list/index.html";

  } catch (error) {

    console.error(error);
    message.innerText = error.message;

  }
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginUser();
});
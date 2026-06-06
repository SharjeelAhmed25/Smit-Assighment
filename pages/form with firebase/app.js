import {
  auth,
  createUserWithEmailAndPassword
} from "./config.js";

let emailInp = document.querySelector("#email-inp");
let passInp = document.querySelector("#pass-inp");
let registerForm = document.querySelector("#register-form");
let message = document.querySelector("#message");

let validateForm = () => {
  if (emailInp.value.length < 1 || passInp.value.length < 1) {
    message.innerText = "All fields are required";
    return false;
  }

  return true;
};

let createUser = async () => {
  try {

    if (!validateForm()) {
      return;
    }

    let userCredential = await createUserWithEmailAndPassword(
      auth,
      emailInp.value,
      passInp.value
    );

    console.log("Success");
    console.log("userCredential => ", userCredential.user);

    message.innerText = "Account created successfully";
 emailInp.value = "";
      passInp.value = "";
      message.innerText = "";
  } catch (error) {
    console.error(error);
    message.innerText = error.message;
  }
};

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createUser();
});
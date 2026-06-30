import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  addDoc,
  collection,
  db,
  GoogleAuthProvider,
  provider,
  signInWithPopup,
} from "./config.js";

let emailInp = document.querySelector("#email-inp");
let passInp = document.querySelector("#pass-inp");
let registerForm = document.querySelector("#register-form");
let message = document.querySelector("#message");
let signInBtn = document.querySelector("#sign-in");
let googlebtn = document.querySelector("#google-btn");
let fullname = document.querySelector("#fullname");


/////////////////////////////////////////////////
// Form Validation
/////////////////////////////////////////////////

let validateForm = () => {
  if (
    emailInp.value.trim() === "" ||
    passInp.value.trim() === ""
  ) {
    message.innerText = "All fields are required";
    return false;
  }

  return true;
};

/////////////////////////////////////////////////
// Save User Data in Firestore
/////////////////////////////////////////////////

let userdata = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      email: auth.currentUser.email,
      uid: auth.currentUser.uid,
      fulname : fullname.value
    });

    localStorage.setItem("fulname" , fullname.value)
  
    console.log("Document ID:", docRef.id);
  } catch (error) {
    console.error(error);
    message.innerText = error.message;
  }
};

/////////////////////////////////////////////////
// Email Password Signup
/////////////////////////////////////////////////

let createUser = async () => {
  try {
    if (!validateForm()) return;

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        emailInp.value,
        passInp.value
      );

    await userdata();

    // Save UID in Local Storage
    localStorage.setItem(
      "uid",
      userCredential.user.uid
    );

    console.log("Success");
    console.log(userCredential.user);

    message.innerText = "Account created successfully";

    emailInp.value = "";
    passInp.value = "";
    

    setTimeout(() => {
      window.location.replace("./todo list/index.html");
    }, 1000);

  } catch (error) {
    console.error(error);
    message.innerText = error.message;
  }
};

/////////////////////////////////////////////////
// Google Sign In
/////////////////////////////////////////////////

let googleSignIn = async () => {
  try {
    const result = await signInWithPopup(
      auth,
      provider
    );

    const credential =
      GoogleAuthProvider.credentialFromResult(
        result
      );

    const token = credential?.accessToken;
    const user = result.user;

    // Save UID in Local Storage
    localStorage.setItem("uid", user.uid);

    console.log("credential =>", credential);
    console.log("token =>", token);
    console.log("user =>", user);

    message.innerText =
      "Google Sign In Successful";

    setTimeout(() => {
      window.location.replace("./todo list/index.html");
    }, 1000);

  } catch (error) {
    const credential =
      GoogleAuthProvider.credentialFromError(
        error
      );

    console.error(error);
    console.error(credential);

    message.innerText = error.message;
  }
};

/////////////////////////////////////////////////
// Auth State
/////////////////////////////////////////////////

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User Email:", user.email);
  }else{
    console.log("no user")
  }
});

/////////////////////////////////////////////////
// Events
/////////////////////////////////////////////////

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createUser();
});

googlebtn.addEventListener("click", googleSignIn);

signInBtn.addEventListener("click", () => {
  window.location.replace(
    "./login acount/login.html"
  );
});
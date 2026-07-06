import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  db,
  GoogleAuthProvider,
  signInWithPopup,
  provider,
  setDoc,
  doc,
} from "./firebase/firebaseconfig.js";

let emailinp = document.querySelector("#email-inp");
let passinp = document.querySelector("#password-inp");
let register = document.querySelector("#register");
let firstname = document.querySelector("#firstname");
let lastname = document.querySelector("#lastname");
let username = document.querySelector("#username");
let message = document.querySelector("#message");
let googlebtn = document.querySelector("#google-btn");


let validateform = () => {
  if (emailinp.value.trim() === "" || passinp.value.trim() === "" || firstname.value.trim() === "" || lastname.value.trim() === "" || username.value.trim() === "") {
    message.innerText = "enter this feilds";
    return false;
  }
  return true
}
register.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    if (!validateform()) return;

    ////////create user
   const userCredential = await createUserWithEmailAndPassword(
  auth,
  emailinp.value,
  passinp.value
);
    localStorage.setItem("userid", userCredential.user.uid) //// local stoarge uid
    console.log("user uid =>", userCredential.user.uid)
    console.log("succes");
    message.innerText = "create acount successfully";

    //////data add database
   await setDoc(doc(db, "users" , userCredential.user.uid), {
    email: emailinp.value,uid: userCredential.user.uid, name: firstname.value,lastname: lastname.value, username: username.value})
    localStorage.setItem("name", firstname.value) ///localstorage full name 
    console.log("document iD => ", userCredential.user.uid);
      emailinp.value = ""; passinp.value = "";firstname.value = ""; lastname.value = ""; username.value = "";
    window.location.replace("./chat/chat.html");
  } catch (error) {
    message.innerText = error.message; console.error(error)
  }
})
//create acount with google
googlebtn.addEventListener("click" , async ()=>{
  try {
    const googlesignin = await signInWithPopup(
      auth,
      provider
    )
    const credential = GoogleAuthProvider.credentialFromResult(
      googlesignin
    )
    const user = googlesignin.user;
    //save firestore 

  await setDoc(doc(db , "users" ,user.uid),{
      email : user.email,
      uid : user.uid,
      displayname : user.displayName
    })
    localStorage.setItem("userid" , user.uid);
    localStorage.setItem("displayName" , user.displayName);
    console.log(`document iD => ${user.uid}`)
    message.innerText = "google sign in successfull";
     console.log("credential =>", credential);
    console.log("user =>", user);

    setTimeout(()=>{
      window.location.replace("./chat/chat.html");
    },2000)
  } catch (error) {
     switch (error.code) {
  case "auth/invalid-credential":
    message.innerText = "Invalid email or password.";
    break;

  case "auth/user-not-found":
    message.innerText = "User not found.";
    break;

  case "auth/wrong-password":
    message.innerText = "Incorrect password.";
    break;

  case "auth/invalid-email":
    message.innerText = "Invalid email address.";
    break;

  case "auth/too-many-requests":
    message.innerText = "Too many attempts. Try again later.";
    break;
    case "Firebase: Error (auth/email-already-in-use).":
      message.innerText = "this email are already in use";

}
  }
});
//////////////////////////////////////////////////
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User Logged In");
    console.log("UID:", user.uid);
    console.log("email:", user.email);
  } else {
    console.log("No user is logged in.");
  }
});
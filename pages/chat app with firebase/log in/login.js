import { signInWithEmailAndPassword ,getAuth , deleteUser } from "../firebase/firebaseconfig.js";

let email = document.querySelector("#email-inp");
let passinp = document.querySelector("#password-inp");
let register = document.querySelector("#register");
let google = document.querySelector("#google-btn");
let message = document.querySelector("#message");

let validate = ()=>{
    if(email.value === "" || passinp.value === ""){
    message.innerText = "input fill all feilds";
    return false
    }
    message.innerText = "";
    return true
}

register.addEventListener("click" ,async (e)=>{
      e.preventDefault();
        if(!validate()) return ;
    try {
const auth = getAuth();
const userCredential = await signInWithEmailAndPassword(auth, email.value, passinp.value);
localStorage.setItem("userid", userCredential.user.uid); 
console.log(userCredential.user);
 email.value = "";
 passinp.value = "";
 setTimeout(()=>{
    window.location.replace("../chat/chat.html")
 },1000)
 console.log("Login UID:", userCredential.user.uid);

localStorage.setItem("userid", userCredential.user.uid);

console.log("LocalStorage:", localStorage.getItem("userid"));
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

  default:
    message.innerText = error.message;
}
    }
})

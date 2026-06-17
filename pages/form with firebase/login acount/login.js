import {
  auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  provider
} from "../config.js";

let emailInp = document.querySelector("#email-inp");
let passInp = document.querySelector("#pass-inp");
let loginForm = document.querySelector("#login-form");
let message = document.querySelector("#message");
let googlebtn = document.querySelector("#google-btn");
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

    window.location.replace("../todo list/index.html");

  } catch (error) {

    console.error(error);
    message.innerText = error.message;

  }
}
//////////////////////////////////////////////

let googleSignIn = async () => {
    try {

        await signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
               const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...


            //     / query uid
            //     const q = query(
            //         collection(db,'users'),
            //         where("uid", "==", user.uid)
            //     )
            //     const querySnapshot = await getDocs(q);

            //     if(querySnapshot){
            //         / no need to add user in db
            //         return
            //     }
            // / db user add


                console.log("crediential => ", credential)
                console.log("token => ", token)
                console.log("user => ", user)
               setTimeout(() => {
          window.location.replace("../todo list/index.html");

    }, 1000);

            })
    } catch (error) {
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error(error)
        console.error(credential)

    }
}

googlebtn.addEventListener("click" , ()=> googleSignIn())


loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginUser();
});
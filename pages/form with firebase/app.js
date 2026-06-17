import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  addDoc,
  collection,
  db,
  deleteDoc,
  GoogleAuthProvider,
  provider,
  signInWithPopup,
  getAuth
} from "./config.js";

let emailInp = document.querySelector("#email-inp");
let passInp = document.querySelector("#pass-inp");
let registerForm = document.querySelector("#register-form");
let message = document.querySelector("#message");
let signInBtn = document.querySelector("#sign-in");
let googlebtn = document.querySelector("#google-btn");
/////////////////////////////////////////////
let validateForm = ()=> {

  if (
    emailInp.value.trim() === "" ||
    passInp.value.trim() === ""
  ) {

    message.innerText = "All fields are required";
    return false;
  }

  return true;
}
/////////////////////////////////////////////////
let  createUser = async ()=> {

  try {

    if (!validateForm()) return;

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        emailInp.value,
        passInp.value
      );
     await userdata()

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
}
////////////////////////////////////////////////////////////////

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
      window.location.replace("./todo list/index.html");
    }, 1000);

            })
    } catch (error) {
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error(error)
        console.error(credential)

    }
}

googlebtn.addEventListener("click" , ()=> googleSignIn())


////////////////////////////////////////////////////////////////
let userdata = async ()=>{
  try {
    const docref = await addDoc(collection(db , "users") ,{
      email :  auth.currentUser.email,
      uid : auth.currentUser.uid
      

    })
    console.log("document id : " , docref.id);
  } catch (error) {
    console.log(error)
    message.innerText = error
  }
}


////////////////////////////////////////////////////////////
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user email" ,user.email);
  }
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createUser();
});

signInBtn.addEventListener("click", () => {
  window.location.replace("./login acount/login.html");
});


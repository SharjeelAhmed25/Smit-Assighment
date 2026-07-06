
import {onSnapshot,orderBy,  and,or,signOut, deleteDoc, deleteUser, auth,db,onAuthStateChanged,doc,getDoc,getDocs, query, collection , where , addDoc, serverTimestamp} from "../firebase/firebaseconfig.js";

// users related
let users = [];
let messages = [];
let userIdget = null;
let selectedUser = null;
let unsubscribe = null;
let messageInput = document.querySelector("#messageInput");
let sendBtn = document.querySelector("#sendBtn");
///////

let logout = document.querySelector("#logoutBtn");
let deleteAccount = document.querySelector("#delete");
let userdiv = document.querySelector("#usersdiv") ;
let chatdiv = document.querySelector("#chatdiv") ;

////logut btn
logout.addEventListener("click", async () => {
  try {
    await signOut(auth);
    console.log("log out succesfully");
    localStorage.removeItem("userid");  
    window.location.replace("../log in/login.html");
  } catch (error) {
    console.log(error.message);
  }
});
//// delete btn
deleteAccount.addEventListener("click", async () => {
  try {
    const user = auth.currentUser;

    // Firestore se user document delete
    await deleteDoc(doc(db, "users", user.uid));

    // Authentication account delete
    await deleteUser(user);

    alert("Account deleted successfully");
    window.location.href = "../index.html";

  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
});

if(!selectedUser){
  chatdiv.innerHTML = "<h1>no chat</h1>"
}
///local storage get userid;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    localStorage.removeItem("userid");
    window.location.replace("../log in/login.html");
    return;
  }

  userIdget = user.uid;
  localStorage.setItem("userid", user.uid);

  console.log("Firebase UID:", userIdget);
  console.log("Firebase:", user.uid);
console.log("LocalStorage:", localStorage.getItem("userid"));

  getusers();
});
////user get function 
let getusers = async()=>{
  try {
    users = [];
    let userquery = query(collection(db , "users") , where("uid" , "!=" , userIdget));
    let queryshot = await getDocs(userquery);
    queryshot.forEach((doc)=>{
users.push({
    id: doc.id,
    ...doc.data()
});
    })
     console.log("userdata => ", users);
     renderusers() 
  } catch (error) {
    console.error(error)
  }
}



//message functtion
const getMessages = () => {
  if(unsubscribe){
    unsubscribe();
  }
  try {

    const msgQuery = query(
      collection(db, "messages"),
      or(
        and(
          where("from", "==", userIdget),
          where("to", "==", selectedUser)
        ),
        and(
          where("from", "==", selectedUser),
          where("to", "==", userIdget)
        )
      ),
        orderBy("createdAt", "asc")
    );

   unsubscribe = onSnapshot(msgQuery, (querySnapshot) => {

      messages = [];

      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data()
        });
      });
      rendermessage();

      console.log(messages);
    });

  } catch (error) {
    console.log(error);
  }
};

///// rendermessage
let rendermessage = ()=>{
  chatdiv.innerHTML = "";

  if(messages.length === 0){
    chatdiv.innerHTML = `<h1>no chat</h1>`;
    return
  }
  messages.forEach((msg)=>{
    let messagediv = document.createElement("div");
    if(msg.from === userIdget){
      messagediv.className = "my-message";
    }else{
      messagediv.className = "freind-message";
    }
     messagediv.innerHTML = `
      <p>${msg.text}</p> `;
      chatdiv.appendChild(messagediv)
  })
}
/// send message 
let sendmessage  = async ()=>{
  if(!selectedUser){
alert("please eter a message");
return
  }
  if(messageInput.value.trim() === ""){
return
  }
  try {
  let msgdata = await addDoc(collection(db , "messages"),{
      text : messageInput.value,
      from : userIdget,
      to : selectedUser,
      createdAt : serverTimestamp()
    })
    console.log("message document id " , msgdata.id);
    messageInput.value = "";
  } catch (error) {
    console.log(error)
  }
}
sendBtn.addEventListener("click" ,sendmessage)
let renderusers = ()=>{
  userdiv.innerHTML = "";

  if(users.length === 0){
    userdiv.innerHTML = "<h2>no user found</h2>";
    return
  }
  users.forEach((user)=>{
    let usercard = document.createElement("div");
    usercard.className = "user-card";

    usercard.innerHTML = `
    <h4>${user.name || user.displayname}</h4>
   <p>${user.email}</p>`;

    usercard.addEventListener("click" , ()=>{
      selectedUser = user.uid;
      let chatuser = document.querySelector("#usenameselected");
      chatuser.innerText = user.name || user.displayname;
      console.log(`selected user uid ${user.name} => ${selectedUser}`);
      getMessages();
     
    })
    userdiv.appendChild(usercard)
  })
}

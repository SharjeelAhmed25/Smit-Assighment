import { deleteUser, auth, signOut, addDoc, collection, db , getDocs, query, where, onSnapshot , deleteDoc ,doc,updateDoc, onAuthStateChanged } from "./config.js";


let todos = [];
let addbtn = document.querySelector("#add_btn");
let updbtn = document.querySelector("#update_btn");
let delbtn = document.querySelector("#delete");
let message = document.querySelector("#message");
let userinp = document.querySelector("#todo-input");
let displaydiv = document.querySelector("#todo-perent");
let editid = null;
let logout = document.querySelector("#logout");
let deleteacount = document.querySelector("#deleteacount");
let username = document.querySelector("#username");

// // create data 

addbtn.addEventListener("click" , async ()=>{
  
  try{

    if(userinp.value == ""){
      message.innerText = "input this feilds"
      return
    }else{
      message.innerText = "";
    }

    const docref = await addDoc(collection(db , "todos") ,{
      input : userinp.value,
    })
    console.log("document id : " , docref.id);
     userinp.value = "";

  }catch(error){
console.log(error)
  }
 
rendertodos();

})

//edit ka function 

window.edittodo = (id , input)=>{
userinp.value = input;
editid = id;
addbtn.style.display = "none";
updbtn.style.display = "block";
}

// update ka function 

updbtn.addEventListener("click", async ()=>{

  try{

    await updateDoc(doc(db , "todos" , editid),{
      input : userinp.value 
    });
    addbtn.style.display = "block";
    updbtn.style.display = "none";
    editid = null;
    userinp.value = "";

  }catch(error){
    console.log(error);
  }

})

// read data real tme update 

const unsubscribe = onSnapshot(collection(db , "todos"), (querySnapshot) => {
  todos = [];
  querySnapshot.forEach((doc) => {
    todos.push({
  id: doc.id,
  input: doc.data().input
});
  });
  
  rendertodos();
});

// delete data
 
delbtn.addEventListener("click" , async()=>{

  try{
   const querySnapshot = await getDocs(collection(db , "todos"));
                                                                                 
querySnapshot.forEach(async (item) => {
  await deleteDoc(doc(db, "todos", item.id));
});
  }catch(error){
console.log(error)
  }

rendertodos();
})

// specific document delete 
window.deletetodo = async(id, input)=>{
try {
  await deleteDoc(doc(db, "todos", id));
  userinp.value = "";
  updbtn.style.display = "none";
  addbtn.style.display = "block";
} catch (error) {
  console.log(error)
}
rendertodos();
}

logout.addEventListener("click" , async()=>{
 try {
    await signOut(auth);
   console.log("log out succesfully")
    message.innerText = "Logout Successfully";

    window.location.replace("../login acount/login.html");

  } catch (error) {
    console.log(error);
    message.innerText = error;
  }
})

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("log in", user.email);

    username.innerText =
      "Welcome " +
      (user.displayName ||
       localStorage.getItem("fulname"));
  } else {
    console.log("user log out");
    console.log("no user");
    username.innerText = "No User";
  }
});
  


deleteacount.addEventListener("click", async () => {
  try {
    // 1. get user document
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);

    // 2. properly await deletion
    const deletePromises = querySnapshot.docs.map((item) =>
      deleteDoc(doc(db, "users", item.id))
    );

    await Promise.all(deletePromises);

    // 3. delete auth user
    await deleteUser(auth.currentUser);

    message.innerText = "Account Deleted Successfully";

    setTimeout(() => {
      window.location.replace("../index.html");
    }, 500);

  } catch (error) {
    console.log(error);

    if (error.code === "auth/requires-recent-login") {
      message.innerText =
        "Please login again before deleting account";
    } else {
      message.innerText = error.message;
    }
  }
});

let rendertodos = ()=>{

  displaydiv.innerHTML = "";

todos.forEach((item)=>{

  displaydiv.innerHTML += `
  
  <div class ="todo">

  <h3>${item.input}</h3>

 <button onclick='edittodo("${item.id}" , "${item.input}")'>edit</button>
 <button onclick="deletetodo('${item.id}')">
delete
</button>

  </div>
  
  `;
});
}

 
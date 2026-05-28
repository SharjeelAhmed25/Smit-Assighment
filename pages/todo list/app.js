import { auth, provider, addDoc, collection, db , getDocs, query, where, onSnapshot , deleteDoc ,doc,updateDoc } from "./config.js";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";


let todos = [];
let addbtn = document.querySelector("#add_btn");
let updbtn = document.querySelector("#update_btn");
let delbtn = document.querySelector("#delete");
let message = document.querySelector("#message");
let userinp = document.querySelector("#todo-input");
let displaydiv = document.querySelector("#todo-perent");
let editid = null;


addbtn.addEventListener("click" , async ()=>{
  try {
    
    // Add a new document with a generated id.
const docRef = await addDoc(collection(db, "todos"), {
  input: userinp.value,
});
console.log("Document written with ID: ", docRef.id);
userinp.value = "";
  } catch (error) {
    console.log(error)
  }
});

//  data execute 



// // create data 

// addbtn.addEventListener("click" , async ()=>{
  
//   try{

//     if(userinp.value == ""){
//       message.innerText = "input this feilds"
//       return
//     }else{
//       message.innerText = "";
//     }

//     const docref = await addDoc(collection(db , "todos") ,{
//       input : userinp.value,
//     })
//     console.log("document id : " , docref.id);
//      userinp.value = "";

//   }catch(error){
// console.log(error)
//   }
 
// rendertodos();

// })

// //edit ka function 

// window.edittodo = (id , input)=>{
// userinp.value = input;
// editid = id;
// addbtn.style.display = "none";
// updbtn.style.display = "block";
// }

// // update ka function 

// updbtn.addEventListener("click", async ()=>{

//   try{

//     await updateDoc(doc(db , "todos" , editid),{
//       input : userinp.value 
//     });
//     addbtn.style.display = "block";
//     updbtn.style.display = "none";
//     editid = null;
//     userinp.value = "";

//   }catch(error){
//     console.log(error);
//   }

// })

// // read data real tme update 

// const unsubscribe = onSnapshot(collection(db , "todos"), (querySnapshot) => {
//   todos = [];
//   querySnapshot.forEach((doc) => {
//     todos.push({
//   id: doc.id,
//   input: doc.data().input
// });
//   });
  
//   rendertodos();
// });

// // delete data
 
// delbtn.addEventListener("click" , async()=>{

//   try{
//    const querySnapshot = await getDocs(collection(db , "todos"));
                                                                                 
// querySnapshot.forEach(async (item) => {
//   await deleteDoc(doc(db, "todos", item.id));
// });
//   }catch(error){
// console.log(error)
//   }

// rendertodos();
// })

// // specific document delete 
// window.deletetodo = async(id, input)=>{
// try {
//   await deleteDoc(doc(db, "todos", id));
//   userinp.value = "";
//   updbtn.style.display = "none";
//   addbtn.style.display = "block";
// } catch (error) {
//   console.log(error)
// }
// rendertodos();
// }

// let rendertodos = ()=>{

//   displaydiv.innerHTML = "";

// todos.forEach((item)=>{

//   displaydiv.innerHTML += `
  
//   <div class ="todo">

//   <h3>${item.input}</h3>

//  <button onclick='edittodo("${item.id}" , "${item.input}")'>edit</button>
//  <button onclick="deletetodo('${item.id}')">
// delete
// </button>

//   </div>
  
//   `;
// });
// }

 

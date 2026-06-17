import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
  GoogleAuthProvider,
    signInWithPopup,
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import {addDoc,collection} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";
import { db , deleteDoc } from "./todo list/config.js";
const firebaseConfig = {
  apiKey: "AIzaSyBsnTnIQeMOr-6PBazVC2mMcNgsnoq-vF0",
  authDomain: "todo-app-deb1a.firebaseapp.com",
  projectId: "todo-app-deb1a",
  storageBucket: "todo-app-deb1a.firebasestorage.app",
  messagingSenderId: "332952014255",
  appId: "1:332952014255:web:59b81538745ff7f117735a",
  measurementId: "G-9Q2MLJBC6X"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();


export {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
   signInWithEmailAndPassword,
   addDoc,
   collection,
   db,
   signOut,
   deleteUser,
   deleteDoc,
   GoogleAuthProvider,
    getAuth,
     signInWithPopup,
     provider
};




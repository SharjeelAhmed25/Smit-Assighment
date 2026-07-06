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
    sendPasswordResetEmail,
    
    
  
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { orderBy, onSnapshot , getDocs,getDoc, doc, setDoc ,addDoc,collection,deleteDoc,getFirestore,query,where,  and,or , serverTimestamp} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpXVaYQIOgn0oLJlhpYjbcc8TQi_TbDpQ",
  authDomain: "chat-app-fa6bb.firebaseapp.com",
  projectId: "chat-app-fa6bb",
  storageBucket: "chat-app-fa6bb.firebasestorage.app",
  messagingSenderId: "790483266789",
  appId: "1:790483266789:web:84fca283146da1bfc7380c",
  measurementId: "G-RWKVJ9FVK1"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

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
     provider,
     doc,
      setDoc,
      sendPasswordResetEmail,
      getDoc,
      getDocs,
      query,
      where,
       and,
       or,
       onSnapshot,
       serverTimestamp,
       orderBy
       
      
};




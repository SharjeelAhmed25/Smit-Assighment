

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB-TFW7lZTp-mw96OIqMR8htzQkPYHeVZg",
    authDomain: "assighment-form.firebaseapp.com",
    projectId: "assighment-form",
    storageBucket: "assighment-form.firebasestorage.app",
    messagingSenderId: "578507061172",
    appId: "1:578507061172:web:1d2ddcf1ca91dfcf46a4e1",
    measurementId: "G-D2J4PWJ9L4"
  };



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword
};





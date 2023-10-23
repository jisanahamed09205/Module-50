// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWCgrEht08CyoAZHQ2mPFYf1IuqOdlihc",
  authDomain: "user-email-password-auth-aaf7c.firebaseapp.com",
  projectId: "user-email-password-auth-aaf7c",
  storageBucket: "user-email-password-auth-aaf7c.appspot.com",
  messagingSenderId: "447973048561",
  appId: "1:447973048561:web:aedc914e26f9525d056950"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
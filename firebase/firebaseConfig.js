// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa6XpHTR6yJBJ6DGZ0w17ZfVX-t0nt40k",
  authDomain: "swen-325.firebaseapp.com",
  databaseURL: "https://swen-325-default-rtdb.firebaseio.com",
  projectId: "swen-325",
  storageBucket: "swen-325.appspot.com",
  messagingSenderId: "722018878920",
  appId: "1:722018878920:web:244183f0df94d7265cacfd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export const authentication = auth;



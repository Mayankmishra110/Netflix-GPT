// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHCtD9TT8GHMTFO-o5jRM1IosO4wV4XZ8",
  authDomain: "netflixgpt-4bb17.firebaseapp.com",
  projectId: "netflixgpt-4bb17",
  storageBucket: "netflixgpt-4bb17.appspot.com",
  messagingSenderId: "883931405768",
  appId: "1:883931405768:web:60e93ae1f9b7ddde7634fd",
  measurementId: "G-26Z0DR1BZ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

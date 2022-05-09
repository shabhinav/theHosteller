import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPuzdiMmb0JsaQGa5LRUq8r-8qgUbeAMQ",
  authDomain: "practice-5c407.firebaseapp.com",
  databaseURL: "https://practice-5c407-default-rtdb.firebaseio.com",
  projectId: "practice-5c407",
  storageBucket: "practice-5c407.appspot.com",
  messagingSenderId: "390310066617",
  appId: "1:390310066617:web:c45f44e566356193ef5e68",
  measurementId: "G-W6SJFCWRM5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

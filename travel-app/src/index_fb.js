// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAjdljcshND1sY35iqfqKs0a0ZpIsY4Vo",
  authDomain: "travelapp-200.firebaseapp.com",
  databaseURL: "https://travelapp-200-default-rtdb.firebaseio.com",
  projectId: "travelapp-200",
  storageBucket: "travelapp-200.appspot.com",
  messagingSenderId: "616986288375",
  appId: "1:616986288375:web:24b25572753722ee1e73f2",
  measurementId: "G-PFMQJL8N33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
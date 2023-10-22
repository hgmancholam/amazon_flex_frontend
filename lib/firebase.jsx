import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXuW4db5K6cclkhvtXCT3SvVTRypMmnHQ",
  authDomain: "easyflex-402204.firebaseapp.com",
  databaseURL: "https://easyflex-402204-default-rtdb.firebaseio.com",
  projectId: "easyflex-402204",
  storageBucket: "easyflex-402204.appspot.com",
  messagingSenderId: "395129159595",
  appId: "1:395129159595:web:0ca47094be5f268b455cee",
  measurementId: "G-81B18MMX67",
};

const firebase = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebase);

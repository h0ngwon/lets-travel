import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuchC-3JcyOGp4KW-zuNd46rS8NIaBvJo",
  authDomain: "let-s-travel-project.firebaseapp.com",
  projectId: "let-s-travel-project",
  storageBucket: "let-s-travel-project.appspot.com",
  messagingSenderId: "715407579407",
  appId: "1:715407579407:web:08f45dfac4cd408f38867a"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
var firebaseConfig = {
  apiKey: "AIzaSyBc0POUYvbzzQeH_ImtMY3fbT7slbxTzIA",
  authDomain: "bookingstudio-c3822.firebaseapp.com",
  projectId: "bookingstudio-c3822",
  storageBucket: "bookingstudio-c3822.appspot.com",
  messagingSenderId: "681097578110",
  appId: "1:681097578110:web:0bb631f6c58315c80afa2f",
  measurementId: "G-R0FENXWH5F",

  // apiKey: "AIzaSyBZp4Mt2Q-oNcTccHhcnHyy7YGQv_1SZAc",
  // authDomain: "my-project-acfa5.firebaseapp.com",
  // projectId: "my-project-acfa5",
  // storageBucket: "my-project-acfa5.appspot.com",
  // messagingSenderId: "230625202875",
  // appId: "1:230625202875:web:bb734a361d88c4a4cf0f9e",
  // measurementId: "G-ZV41GJRB8J",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth = getAuth(app);

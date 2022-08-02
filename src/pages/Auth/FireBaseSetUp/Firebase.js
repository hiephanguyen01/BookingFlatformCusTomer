import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
var firebaseConfig = {
  apiKey: "AIzaSyCxpOVv1LgWYOy2jZhONCyTCHdDRvKyVAY",
  authDomain: "phoneauth-6486b.firebaseapp.com",
  projectId: "phoneauth-6486b",
  storageBucket: "phoneauth-6486b.appspot.com",
  messagingSenderId: "345936724175",
  appId: "1:345936724175:web:f878432839ffdc62d0f7ba",
  measurementId: "G-Y0Z2ZBQDSZ"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase

 
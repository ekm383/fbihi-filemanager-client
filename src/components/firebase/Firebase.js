import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBqIwd-HLu5S15LgGNSSNhUXSVn5XvUSpk",
  authDomain: "fbihi-file-manager.firebaseapp.com",
  projectId: "fbihi-file-manager",
  storageBucket: "fbihi-file-manager.appspot.com",
  messagingSenderId: "34807682062",
  appId: "1:34807682062:web:003b6100eb59688523985f",
  measurementId: "G-466S5EW884",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

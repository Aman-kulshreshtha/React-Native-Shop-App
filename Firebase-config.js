// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyDnjXBikBIVSJSRUwax7f8AQ5yRlBaEc",
  authDomain: "react-native-shop-app-d5b9a.firebaseapp.com",
  databaseURL:
    "https://react-native-shop-app-d5b9a-default-rtdb.firebaseio.com",
  projectId: "react-native-shop-app-d5b9a",
  storageBucket: "react-native-shop-app-d5b9a.appspot.com",
  messagingSenderId: "282984127323",
  appId: "1:282984127323:web:627525791190c201bb987e",
  measurementId: "G-43KMQC0YTH",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
export { auth };

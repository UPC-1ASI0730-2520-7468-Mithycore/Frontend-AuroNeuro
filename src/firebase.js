// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHwO7srtiTz7MaHOxzl2HG2jk09U2R4Og",
    authDomain: "tomateo-f0f30.firebaseapp.com",
    projectId: "tomateo-f0f30",
    storageBucket: "tomateo-f0f30.appspot.com",
    messagingSenderId: "842814410669",
    appId: "1:842814410669:web:bd7ade8e412121abee9b24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification,updateProfile} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-database.js";


import { getStorage,ref as sRef ,uploadBytesResumable ,getDownloadURL} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-storage.js";

// Create a root reference



const firebaseConfig = {
	apiKey: "AIzaSyBxZOOHaT4BLuo0WlXjrKSu5lA15GJoQ9s",
	authDomain: "apniattendance.firebaseapp.com",
	databaseURL: "https://apniattendance-default-rtdb.firebaseio.com",
	projectId: "apniattendance",
	storageBucket: "apniattendance.appspot.com",
	messagingSenderId: "842668033040",
	appId: "1:842668033040:web:197d6eae6c28a77ddd7695",
	measurementId: "G-C9LM9MJBW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();
const storage = getStorage();


export { app, analytics,auth,db,ref,sRef, set, onValue,createUserWithEmailAndPassword, onAuthStateChanged,
	 signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification,updateProfile,
	 storage ,uploadBytesResumable,getDownloadURL};

import { auth, db, ref, onValue, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "./fbmodule.js";


const studentRef = ref(db, "students");



var usersData = null;



const readUsersData = (snap) => {
	return usersData = snap.val();
}

onValue(studentRef, readUsersData);
const initApp = () => {
	// Listening for auth state changes.
	onAuthStateChanged(auth, function (user) {

		//document.getElementById('quickstart-verify-email').disabled = true;
		if (user) {
			// User is signed in.
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;
			document.getElementById('quickstart-sign-in-status').innerHTML = 'Signed in';
			document.getElementById('quickstart-sign-in').innerHTML = 'Sign out';
			document.getElementById('quickstart-account-details').innerHTML = JSON.stringify(user, null, '  ');

			if (!emailVerified) {
				document.getElementById('quickstart-verify-email').disabled = false;
			}
		} else {
			// User is signed out.
			document.getElementById('quickstart-sign-in-status').innerHTML = 'Signed out';
			document.getElementById('quickstart-sign-in').innerHTML = 'Sign in';
			document.getElementById('quickstart-account-details').innerHTML = 'null';
		}
		document.getElementById('quickstart-sign-in').disabled = false;
	});

	document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);

	;



}
const toggleSignIn = () => {

	if (auth.currentUser) {

		updateProfile(auth.currentUser, {
			displayName: "Sharad Maddheshiya",
			photoURL: "../assets/class_raising_hands_300_wht.gif"
		}).then(() => {
			console.log("Profile Updated");
			// Profile updated!
			// ...
		}).catch((error) => {
			console.log(error);
			// ...
		});

		auth.signOut();
	} else {
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
		if (email.length < 4) {
			alert('Please enter an email address.');
			return;
		}
		if (password.length < 4) {
			alert('Please enter a password.');
			return;
		}

		// Sign in with email and pass.
		signInWithEmailAndPassword(auth, email, password).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode === 'auth/wrong-password') {
				alert('Wrong password.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
			document.getElementById('quickstart-sign-in').disabled = false;
		});


	}
	document.getElementById('quickstart-sign-in').disabled = true;
}



window.onload = function () {
	initApp();
};
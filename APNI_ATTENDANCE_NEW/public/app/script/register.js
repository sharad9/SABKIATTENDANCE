
import {auth,db,ref,  onValue, onAuthStateChanged,createUserWithEmailAndPassword,sendEmailVerification  } from "./fbmodule.js";


const studentRef = ref(db, "students");



var usersData = null;



const readUsersData = (snap) => {
	return usersData = snap.val();
}
onValue(studentRef, readUsersData);



const initApp = () => {
	// Listening for auth state changes.
	onAuthStateChanged(auth, function (user) {

		document.getElementById('quickstart-verify-email').disabled = true;
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
			
			document.getElementById('quickstart-account-details').innerHTML = JSON.stringify(user, null, '  ');

			if (!emailVerified) {
				document.getElementById('quickstart-verify-email').disabled = false;
			}
		} else {
			// User is signed out.
			document.getElementById('quickstart-sign-in-status').innerHTML = 'Signed out';
			
			document.getElementById('quickstart-account-details').innerHTML = 'null';
		}
		
	});

	
	document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
	document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification_, false);

}
const sendEmailVerification_ = () => {
	sendEmailVerification(auth.currentUser).then(function () {
		// Email Verification sent!
		alert('Email Verification Sent!');
	});
}

const handleSignUp = () => {
	if (auth.currentUser) {
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
	
	// Create user with email and pass.
	createUserWithEmailAndPassword(auth, email, password).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == 'auth/weak-password') {
			alert('The password is too weak.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
	});

	


}
}
window.onload = function () {
	initApp();
};
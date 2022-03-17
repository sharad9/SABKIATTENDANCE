import { auth, db, ref, onValue, onAuthStateChanged, sendPasswordResetEmail } from "./fbmodule.js";


const studentRef = ref(db, "students");



var usersData = null;



const readUsersData = (snap) => {
	return usersData = snap.val();
}

onValue(studentRef, readUsersData);


const initApp = () => {


	document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);

}

const sendPasswordReset = () => {
	var email = document.getElementById('email').value;
	if (email.length < 4) {
		alert('Please enter an email address.');
		return;
	}
	sendPasswordResetEmail(auth, email).then(function () {
		// Password Reset Email Sent!
		alert('Password Reset Email Sent!');
	}).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == 'auth/invalid-email') {
			alert(errorMessage);
		} else if (errorCode == 'auth/user-not-found') {
			alert(errorMessage);
		}
		console.log(error);
	});
}


window.onload = function () {
	initApp();
};
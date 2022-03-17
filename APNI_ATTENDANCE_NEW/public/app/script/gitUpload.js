import { auth, db, ref, onValue, onAuthStateChanged } from "./fbmodule.js";


const studentRef = ref(db, "students");



var usersData = null;

var userInfo = {
	id: "",
	picNo: 1
}

const readUsersData = (snap) => {
	return usersData = snap.val();
}

onValue(studentRef, readUsersData);


function update() {
	updateProfile(auth.currentUser, {
		displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
	}).then(() => {
		// Profile updated!
		// ...
	}).catch((error) => {
		// An error occurred
		// ...
	});

}
var picNo = [1, 2];

const initApp = () => {
	// Listening for auth state changes.
	onAuthStateChanged(auth, function (user) {


		if (user) {
			// User is signed in.
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;



			userInfo.id = email.substr(0, email.indexOf('@'));
			document.getElementById('capture').addEventListener('click', upload.bind(null, userInfo.id, picNo));




			if (!emailVerified) {

			}
		} else {
			// User is signed out.

		}

	});



}













var canvas;
var video;

var webcamStream = null;

function init() {
	canvas = document.getElementById('myCanvas');

	video = document.getElementById('video');
	document.getElementById('startWebCam').addEventListener('click', startWebcam);
	document.getElementById('stopWebCam').addEventListener('click', stopWebcam);

}

function startWebcam() {

	if (navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({ video: true })
			.then(function (stream) {
				video.srcObject = stream;
				webcamStream = stream;
				webcamStream.stop = function () {
					this.getAudioTracks().forEach(function (track) {
						track.stop();
					});
					this.getVideoTracks().forEach(function (track) { //in case... :)
						track.stop();
					});
				}

			})
			.catch(function (error) {
				console.log("Something went wrong!");
			});
	}

}


function stopWebcam() {
	webcamStream.stop();
}



function upload(userID, picNo) {

	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);


	let dataURL = canvas.toDataURL();
	let max = 5, min = 0;
	let base64 = dataURL.substr(dataURL.indexOf(',') + 1);

	if (picNo.length) {
		createfile(picNo.pop(), userID, 'fileMessage', base64);
	}
	if (picNo.length == 0) {

		document.getElementById('capture').disabled = true;

	}
}


const nameWithRepository = 'sharad9/database';
const token = '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';




function createfile(fileName, folderName, fileMessage, fileContent) {

	var apiurl = "https://api.github.com/repos/" + nameWithRepository + `/contents/${folderName}/` + fileName + '.png';
	var filedata = JSON.stringify({
		"message": fileMessage,
		"content": fileContent
	});

	$.ajax({
		url: apiurl,
		type: 'PUT',
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "Token " + token);
		},
		data: filedata
	}).done(function (response) {

		console.log(response);
	});
}
window.onload = () => {
	init();
	initApp();

}


import { app, analytics, auth, db, ref, set, onValue, onAuthStateChanged,  } from "./fbmodule.js";


const studentRef = ref(db, "students");



var usersData = null;



const readUsersData = (snap) => {
	return usersData = snap.val();
}

onValue(studentRef, readUsersData);


const writeUserData = (userId, latitude, longitude, distance = 0) => {
	const studentRef = ref(db, 'students/' + userId);
	const data = {
		userId: userId,
		latitude: latitude,
		longitude: longitude,
		distance: distance,
		collectedAt: (new Date()).toString().substring(16, 24)
	};
	set(studentRef, data);
}
var options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};
const success = (pos) => {
	var crd = pos.coords;
	document.getElementById('user-position').innerHTML = "Latitude: " + crd.latitude +
		"  Longitude: " + crd.longitude;
	if (!usersData) {
		const distance = 0;
		//distanceList.push([distance, usersId, distance <= 10 ? true : false]);
		const userId = auth.currentUser.email.split('@')[0];


		writeUserData(userId, crd.latitude, crd.longitude, distance);
	}
	else {



		const usersList = (Object.keys(usersData));
		const usersDataList = Object.values(usersData);
		// Convert Object to JSON
		const jsonObject = JSON.stringify(usersData, null, '  ');
		teacherPos.lat = usersData[usersList[0]]["latitude"];
		teacherPos.lon = usersData[usersList[0]]["longitude"];




		const distance = distanceBetween(crd.latitude, crd.longitude, teacherPos.lat, teacherPos.lon);
		//distanceList.push([distance, usersId, distance <= 10 ? true : false]);
		const userId = auth.currentUser.email.split('@')[0];
		writeUserData(userId, crd.latitude, crd.longitude, distance);
	}



	//console.log(distance);





	console.log('Your current position is:');
	console.log(`Latitude : ${crd.latitude}`);
	console.log(`Longitude: ${crd.longitude}`);
	console.log(`More or less ${crd.accuracy} meters.`);

}
const getLocation = () => {
	if (navigator.geolocation) {
		//navigator.geolocation.watchPosition(showPosition);

		navigator.geolocation.watchPosition(success, error, options);

	} else {
		document.getElementById('user-position').innerHTML = "Geolocation is not supported by this browser.";
	}
}

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

			document.getElementById('quickstart-account-details').innerHTML = JSON.stringify(user, null, '  ');


		} else {
			// User is signed out.

			document.getElementById('quickstart-account-details').innerHTML = '__';
		}

	});


	document.getElementById('get-location').addEventListener('click', getLocation, false);

}





function error(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
}
const showPosition = (position) => {
	//sendMessage()
	document.getElementById('user-position').innerHTML = "Latitude: " + position.coords.latitude +
		"  Longitude: " + position.coords.longitude;
}
const distanceBetween = (lat1, lon1, lat2, lon2) => {

	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1 / 180;
		var radlat2 = Math.PI * lat2 / 180;
		var theta = lon1 - lon2;
		var radtheta = Math.PI * theta / 180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180 / Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344 * 1000;

		return dist;
	}
}
window.onload = function () {
	initApp();
};
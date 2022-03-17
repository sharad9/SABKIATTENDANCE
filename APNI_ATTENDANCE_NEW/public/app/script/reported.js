import { db, ref, onValue } from "./fbmodule.js";
const studentRef = ref(db, "students");



var usersData = null;




const readUsersData = (snap) => {
	return usersData = snap.val();
}

onValue(studentRef, readUsersData);




const getUsersDataInTable = () => {

	if (!usersData) return;
	
	const usersDataList = Object.values(usersData);


	let code = ``;
	for (let i = 0; i < usersDataList.length; i++) {
		
		code+=`
		<tr onmouseover="this.style.background='rgb(218, 247, 166 )';" onmouseout="this.style.background='white';">
		    <td style="font-weight:bold;font-size:10px"><button type="button" class="btn btn-info btn-xs">${usersDataList[i]['userId']}</button></td>
		    <td style="font-size:10px"><button type="button" class="btn btn-success btn-xs">${usersDataList[i]['collectedAt']}</button></td>
		    <td style="font-size:10px"><button type="button" class="btn btn-warning btn-xs">${Math.round(usersDataList[i]['distance'] * 100) / 100} m</button></td>
		  </tr>
		
		`;
		
		
		
	}
	document.getElementById("table-body").innerHTML = code;



}

const initApp = () => {


	document.getElementById('refresh').addEventListener('click', getUsersDataInTable, false);

}


window.onload = function () {
	initApp();
};
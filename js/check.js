// const POST_EMPLOYEE = 'https://www.boredapi.com/api/activity'
// const DELETE_EMPLOYEE= 'https://www.boredapi.com/api/activity'
// // const GET_EMPLOYEE= 'http://localhost:8762/employee-service/api/v1/people/records'
// const GET_EMPLOYEE_ID= 'https://www.boredapi.com/api/activity'
// const UPDATE_EMPLOYEE= 'https://www.boredapi.com/api/activity'
// const UPDATE_POSITION= 'https://www.boredapi.com/api/activity'
// const UPDATE_EMAIL= 'https://www.boredapi.com/api/activity'
// const UPDATE_PHONE= 'https://www.boredapi.com/api/activity'
// const UPDATE_DEPARTMENT= https://www.boredapi.com/api/activity'

const GET_CHECK = 'http://localhost:8762/checks/api/v1/check/records'

//GET all data from employees
fetch(GET_CHECK).then((data)=>{
	return data.json();
}).then((objectData)=>{
	console.log(objectData[0].id);
	let tableData="";
	objectData.map((values)=>{
		tableData+=`
			<tr>
				<td>${values.checkInId}</td>
				<td>${values.employee}</td>
				<td>${values.checkInTime}</td>
				<td>${values.checkOutTime}</td>
				<td>${values.status}</td>
			</tr>
			`;
	});
	document.getElementById("table_check").
		innerHTML=tableData
})

//GET all data from CheckIn
//
//POST
// fetch(POST_EMPLOYEE)
// 	.then(res => res.json())
// 	.then(data => console.log(data))
// 	.then(err => console.log(err))

// fetch().then --> Post
// fetch().then --> Update
// fetch().then --> Update/Field...
// fetch().then --> Update/Field...
// fetch().then --> Update/Field...
// fetch().then --> Update/Field...
// fetch().then --> Delete


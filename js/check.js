
const GET_CHECK = 'http://localhost:8762/checks/api/v1/check/records'

//GET all data from employees
fetch(GET_CHECK).then((data)=>{
	return data.json();
}).then((objectData)=>{
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

//FindAllRecords
function findAllRecords(){
fetch(GET_CHECK).then((data)=>{
	return data.json();
}).then((objectData)=>{
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

}

//FindRecord
function findRecordId() {
    const checkId = document.getElementById('recordIdInput').value;
    if (checkId) {
        document.getElementById("table_check").innerHTML = '';

        fetch(`http://localhost:8762/checks/api/v1/check/${checkId}/record`)
            .then(response => response.json())
            .then(data => {
                let tableData = ''; 

                if (data.length > 0) {
                    data.forEach(check => {
                        tableData += `
			<tr>
				<td>${check.checkInId}</td>
				<td>${check.employee}</td>
				<td>${check.checkInTime}</td>
				<td>${check.checkOutTime}</td>
				<td>${check.status}</td>
			</tr>
                        `;
                    });
                } else {
                    tableData = `
                    <tr>
                        <td colspan="6" style='color: red'>There's not Record ID: ${checkId}</td>
                    </tr>
                    `;
                }

                document.getElementById("table_check").innerHTML = tableData;
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter a valid Record ID');
    }
}
//DeleteRecord
function deleteRecordId(){
	const recordId = document.getElementById('deleteIdInput').value;
	if (recordId) {
		document.getElementById("table_check").innerHTML = '';
		fetch(`http://localhost:8762/checks/api/v1/check/${recordId}/delete`, {
			method: 'DELETE'
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.text();  
			})
			.then(data => {
			let tableData = `
			<tr>
			<td colspan="6" style='color: red'> Record ID ${recordId} has been deleted.</td>
			</tr>`;
				document.getElementById("table_check").innerHTML = tableData;
			})
			.catch(error => {
				console.error('Error:', error);
			});
	} else {
		alert('Please enter a valid Record ID');
	}
}

////UpdatingRecord
function updateRecordId(){
	const recordId = document.getElementById('updateIdRecord').value;
	if(recordId){
		document.getElementById("table_check").innerHTML = '';
		fetch(`http://localhost:8762/checks/api/v1/check/${recordId}/status`, {
			method: 'PUT'
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.text();  
			})
			.then(data => {
			let tableData = `
			<tr>
			<td colspan="6" style='color: green'> Record ID ${recordId} has been updated with the new status and the new Checkout.</td>
			</tr>`;
				document.getElementById("table_check").innerHTML = tableData;
			})
			.catch(error => {
				console.error('Error:', error);
			});
	} else {
		alert('Please enter a valid Record ID');
	}
}

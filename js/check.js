
const GET_CHECK = 'http://localhost:8762/checks/api/v1/check/records'

//functionStatus
function funcStatus(values){
	switch(values.status){
		case true:
			values.status = "./img/good.png";
			break;
		case false:
			values.status = "./img/bad.png";
			values.checkOutTime = "";
			break;
	}

}

//GET all data from employees
fetch(GET_CHECK).then((data)=>{
	return data.json();
}).then((objectData)=>{
	let tableData="";
	objectData.map((values)=>{
		funcStatus(values);
		tableData+=`
			<tr>
				<td>${values.checkInId}</td>
				<td>${values.employee}</td>
				<td>${values.checkInTime}</td>
				<td>${values.checkOutTime}</td>
				<td><img src="${values.status}" height="42" width="42"/></td>
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
		funcStatus(values);
		tableData+=`
			<tr>
				<td>${values.checkInId}</td>
				<td>${values.employee}</td>
				<td>${values.checkInTime}</td>
				<td>${values.checkOutTime}</td>
				<td><img src="${values.status}" height="42" width="42"/></td>
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
                    data.forEach(values => {
			funcStatus(values);
                        tableData += `
			<tr>
				<td>${values.checkInId}</td>
				<td>${values.employee}</td>
				<td>${values.checkInTime}</td>
				<td>${values.checkOutTime}</td>
				<td><img src="${values.status}" height="42" width="42"/></td>
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
				return response.json();  
			})
			.then(values => {
			funcStatus(values);
			let tableData = `
			<tr>
				<td>${values.checkInId}</td>
				<td>${values.employee}</td>
				<td>${values.checkInTime}</td>
				<td>${values.checkOutTime}</td>
				<td><img src="${values.status}" height="42" width="42"/></td>
			</tr>
			`;
				document.getElementById("table_check").innerHTML = tableData;
			})
			.catch(error => {
				console.error('Error:', error);
			});
	} else {
		alert('Please enter a valid Record ID');
	}
}

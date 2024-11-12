
const GET_CHECK = 'http://localhost:8762/checks/api/v1/check/records'

//functionButtonCancel
function funcRemove(values){
	let recordId = values;
	deleteRecordId(recordId);
}

//functionButtonUpgrade
function funcUpgrade(values){
	let recordId = values;
	updateRecordId(recordId);
}

//functionStatus
function funcStatus(values,config){
	switch(values.status){
		case true:
			values.status = "../img/good.png";
			config.buttonFunc = ""
			break;
		case false:
			values.status = "../img/bad.png";
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
		let config = { buttonFunc: `<a class="btn btn-outline-success rounded-4 icon" onclick="funcUpgrade(${values.checkInId})"><img class="img-icon" src="../img/upgrade.png"</a> `};
		funcStatus(values, config);
		tableData+=`
			<tr>
				<td>${values.checkInId}</td>
				<td>${values.employee}</td>
				<td>${values.checkInTime}</td>
				<td>${values.checkOutTime}</td>
				<td><img src="${values.status}" height="42" width="42"/></td>
				<td style="background: none; border: none; padding: 0;"><a class="btn btn-outline-danger rounded-4 icon me-2" onclick="funcRemove(${values.checkInId})"><img class="img-icon" src="../img/cancel.png"</a>${config.buttonFunc}</td>
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
		let config = { buttonFunc: `<a class="btn btn-outline-success rounded-4 icon" onclick="funcUpgrade(${values.checkInId})"><img class="img-icon" src="../img/upgrade.png"</a> `};
		funcStatus(values,config);
		tableData+=`
			<tr>
				<td>${values.checkInId}</td>
				<td>${values.employee}</td>
				<td>${values.checkInTime}</td>
				<td>${values.checkOutTime}</td>
				<td><img src="${values.status}" height="42" width="42"/></td>
				<td style="background: none; border: none; padding: 0;"><a class="btn btn-outline-danger rounded-4 icon me-2" onclick="funcRemove(${values.checkInId})"><img class="img-icon" src="../img/cancel.png"</a>${config.buttonFunc}</td>
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
			let config = { buttonFunc: `<a class="btn btn-outline-success rounded-4 icon" onclick="funcUpgrade(${values.checkInId})"><img class="img-icon" src="../img/upgrade.png"</a> `};
			funcStatus(values,config);
                        tableData += `
			<tr>
				<td>${values.checkInId}</td>
				<td>${values.employee}</td>
				<td>${values.checkInTime}</td>
				<td>${values.checkOutTime}</td>
				<td><img src="${values.status}" height="42" width="42"/></td>
				<td style="background: none; border: none; padding: 0;"><a class="btn btn-outline-danger rounded-4 icon me-2" onclick="funcRemove(${values.checkInId})"><img class="img-icon" src="../img/cancel.png"</a>${config.buttonFunc}</td>
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
	let recordId;
	if (arguments.length === 1){
		recordId = arguments[0];
	} else {
		recordId = document.getElementById('deleteIdInput').value;
	}
	if (recordId) {
		document.getElementById("table_check").innerHTML = '';
		fetch(`http://localhost:8762/checks/api/v1/check/${recordId}/delete`, {
			method: 'DELETE'
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const contentType = response.headers.get("content-type");
				if(contentType &&  contentType.includes("application/json")){
					return response.json();  
				}
				return {};
			})
			.then(data => {
			let tableData = `
			<tr>
			    <td colspan="6" style='color: red'> Record ID ${recordId} has been deleted.</td>
			</tr>`;
				document.getElementById("table_check").innerHTML = tableData;
			})
			.catch(error => {
			let tableData = `
			<tr>
			   <td colspan="6" style='color: red'>There's not Record ID ${recordId} </td>
                        </tr>`;
			console.log(error);
			document.getElementById("table_employee").innerHTML = tableData;
		});
	} else {
		alert('Please enter a valid Record ID');
	}
}

////UpdatingRecord
function updateRecordId(){
	let recordId;
	if (arguments.length === 1){
		recordId = arguments[0];
	} else {
		recordId = document.getElementById('updateIdRecord').value;
	}
	if(recordId){
		document.getElementById("table_check").innerHTML = '';
		fetch(`http://localhost:8762/checks/api/v1/check/${recordId}/status`, {
			method: 'PUT'
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const contentType = response.headers.get("content-type");
				if(contentType &&  contentType.includes("application/json")){
					return response.json();  
				}
				return {};
			})
			.then(values => {
			let config = { buttonFunc: `<a class="btn btn-outline-success rounded-4 icon" onclick="funcUpgrade(${values.checkInId})"><img class="img-icon" src="../img/upgrade.png"</a> `};
			funcStatus(values,config);
			let tableData = `
			<tr>
				<td>${values.checkInId}</td>
				<td>${values.employee}</td>
				<td>${values.checkInTime}</td>
				<td>${values.checkOutTime}</td>
				<td><img src="${values.status}" height="42" width="42"/></td>
				<td style="background: none; border: none; padding: 0;"><a class="btn btn-outline-danger rounded-4 icon me-2" onclick="funcRemove(${values.checkInId})"><img class="img-icon" src="../img/cancel.png"</a> ${config.buttonFunc}</td>
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

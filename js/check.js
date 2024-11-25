
const GET_CHECK = 'http://localhost:8762/checks/api/v1/check/records'

let currentPage = 1;
let totalPages = 1;
const itemsPerPage = 5;
let checkData = [];

const tableShow = document.getElementById('table_check');

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
function funcStatus(values){
	switch(values.status){
		case true:
			values.status = "../img/good.png";
			values.buttonFunc = ""
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
	checkData = objectData;
	totalPages = Math.ceil(checkData.length / itemsPerPage);
	renderTable(tableShow);
	renderPagination();
})

function renderTable(){
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedData = checkData.slice(startIndex, endIndex);
	let tableData = "";
	paginatedData.forEach((values) => {
	// let config = { buttonFunc: `
	// 		`};
	   values.buttonFunc = `
			<td style="background: none; border: none; padding:0; text-align: left;"><a class="btn btn-outline-success rounded-4 icon" onclick="funcUpgrade(${values.checkInId})"><img  style=""class="img-icon" src="../img/upgrade.png"</a> </td>
			`;
	    funcStatus(values);
	    if(values.status == "../img/good.png"){
			values.buttonFunc = `
			`;
	    }
	     console.log(values);
	    tableData += `
			<tr>
				<td>${values.checkInId}</td>
				<td>${values.employee}</td>
				<td>${values.checkInTime}</td>
				<td>${values.checkOutTime}</td>
				<td><img src="${values.status}" height="42" width="42"/></td>
				<td style="background: none; border: none; padding: 0;"><a class="btn btn-outline-danger rounded-4 icon " onclick="funcRemove(${values.checkInId})"><img class="img-icon" src="../img/cancel.png"</a></td>
				${values.buttonFunc}
			</tr>
			`;
		tableShow.innerHTML = tableData;
	});

}

function renderPagination() {
  const paginationNumbers = document.getElementById('pagination-numbers');
  paginationNumbers.innerHTML = ` Page ${currentPage}  - ${totalPages} `;
}

//Previous
function goPrevious(){
  if (currentPage > 1) {
    currentPage--;
    renderTable();
    renderPagination();
  }
}

//Next
function goNext(){
  if (currentPage < totalPages) {
    currentPage++;
    renderTable();
    renderPagination();
  }
}


//FindAllRecords
function findAllRecords(){
	location.reload();
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
		    // let config = { buttonFunc: `
			// <td style="background: none; border: none; padding:0; text-align: left;"><a class="btn btn-outline-success rounded-4 icon" onclick="funcUpgrade(${values.checkInId})"><img  style=""class="img-icon" src="../img/upgrade.png"</a> </td>
			// `};
			values.buttonFunc = '';
			funcStatus(values);
                        tableData += `
			<tr>
				<td>${values.checkInId}</td>
				<td>${values.employee}</td>
				<td>${values.checkInTime}</td>
				<td>${values.checkOutTime}</td>
				<td><img src="${values.status}" height="42" width="42"/></td>
				<td style="background: none; border: none; padding: 0;"><a class="btn btn-outline-danger rounded-4 icon" onclick="funcRemove(${values.checkInId})"><img class="img-icon" src="../img/cancel.png"</a></td>
				${values.buttonFunc}
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
			// let config = { buttonFunc: `<a class="btn btn-outline-success rounded-4 icon" onclick="funcUpgrade(${values.checkInId})"><img class="img-icon" src="../img/upgrade.png"</a> `};
			values.buttonFunc = '';
			funcStatus(values);
			let tableData = `
			<tr>
				<td>${values.checkInId}</td>
				<td>${values.employee}</td>
				<td>${values.checkInTime}</td>
				<td>${values.checkOutTime}</td>
				<td><img src="${values.status}" height="42" width="42"/></td>
				<td style="background: none; border: none; padding: 0;"><a class="btn btn-outline-danger rounded-4 icon me-2" onclick="funcRemove(${values.checkInId})"><img class="img-icon" src="../img/cancel.png"</a> ${values.buttonFunc}</td>
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

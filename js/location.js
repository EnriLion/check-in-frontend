const GET_LOCATION = 'http://localhost:8762/location/api/v1/location/records'
const GET_RECORD = 'http://localhost:8762/checks/api/v1/check/records'

const GET_EMPLOYEE = 'http://localhost:8762/employee-service/api/v1/people/records'

const request = fetch(GET_LOCATION).then(response => response.json());

const requestTwo = fetch(GET_RECORD).then(response => response.json());

const requestThree = fetch(GET_EMPLOYEE).then(response => response.json());

const tableShow = document.getElementById('table_location');

const selectShow = document.getElementById('locationInput');

const recordShow = document.getElementById('recordInput');

const listOfCities= {
		'Guadalajara' : 'Mexico',
		'Monterrey' : 'Mexico',
		'Mexico City' : 'Mexico',
		'New York City' : 'USA',
		'California' : 'USA',
		'Mumbai' : 'India',
		'New Delhi' : 'India',
		'Bangalore' : 'India',
		'Beijing' : 'China'
}

let currentPage = 1;

let countryArray;

let totalPages = 1;

const itemsPerPage = 5;

let locationData = [];

//function ButtonCancel
function funcRemove(values){
	let locationId = values;
	deleteLocationById(locationId);
}

let selectData= "";

let addedCheckInIds = [];

////GET all data from location
function displayData(){
	if(tableShow){
		fetch(GET_LOCATION).then((data)=> {
			return data.json();
		}).then((objectData)=>{
			locationData = objectData;
			totalPages = Math.ceil(locationData.length / itemsPerPage);
			renderTable(tableShow);
			renderPagination();
		});
	} else if(selectShow){
		selectData="";
		fetch(GET_LOCATION).then((data)=> {
			return data.json();
		}).then ((objectData) =>{
			objectData.map((values)=>{
			selectData+=`
				<option value="${values.location}">Employee ID: ${values.employeeId.id} | Name: ${values.employeeId.name}| Location ID: ${values.location}</option> `;
				document.getElementById("locationInput").innerHTML=selectData;
			});
		});
	} else  if(recordShow){
		loadDropdown();
	}
}

async function loadDropdown() {
    selectData = "";
    Promise.all([request, requestTwo, requestThree])
        .then(([locations, records, employees]) => {
            const trueStatusRecords = records.filter(record => record.status === true);

            const filteredRecords = trueStatusRecords.filter(record => {
                return !locations.some(location => location.check.checkInId === record.checkInId);
            });

            if (filteredRecords.length === 0) {
                selectData = '<option>No records found</option>';
            } else {
                filteredRecords.forEach(record => {
                    const employee = employees.find(emp => emp.id === record.employee);
                    if (employee) {
                        selectData += `
                            <option value="${record.checkInId}">Employee ID: ${employee.id} | Name: ${employee.name} | CheckIn ID: ${record.checkInId}</option>`;
                    }
                });
            }

            document.getElementById('recordInput').innerHTML = selectData;
        })
        .catch(error => {
            console.error(error);
        });
}


function renderPagination() {
	const paginationNumbers = document.getElementById('pagination-numbers');
	paginationNumbers.innerHTML = ` Page ${currentPage}  - ${totalPages} `;
}

// Previous
function goPrevious() {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
    renderPagination();
  }
}

// Next
function goNext() {
  if (currentPage < totalPages) {
    currentPage++;
    renderTable();
    renderPagination();
  }
}

function renderTable(){
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedData = locationData.slice(startIndex, endIndex);
	let tableData = ""
	paginatedData.forEach((values) => {
	tableData+=`
			<tr>
				<td>${values.location}</td>
				<td>${values.employeeId.id} - ${values.employeeId.name}</td>
	         	    	<td>${values.check.checkInId}</td>
			    	<td>${values.city}</td>
			    	<td>${values.country}</td>
			    	<td style="background: none; border: none; padding: 10; text-align: left;">
				      <a class="btn btn-outline-danger rounded-4 icon " onclick="funcRemove(${values.location})">
				      <img class="img-icon" src="../img/cancel.png" alt="Remove"/>
				      </a>
				</td>
			</tr>
				`;
	});
	tableShow.innerHTML = tableData;
}


function findLocationById() {
    const locationId = document.getElementById('locationIdInput').value;
    if (locationId) {
        document.getElementById("table_location").innerHTML = '';

        fetch(`http://localhost:8762/location/api/v1/location/${locationId}/record`)
            .then(response => {
		    if(response.status === 404){
		    let tableData = `
		    <tr>
        		<td colspan="6" style="color: red">There's no LocationID: ${locationId}</td>
                    </tr>
		   `;
			    document.getElementById("table_location").innerHTML = tableData;
			    throw  new Error("Location ID not found");
		    } else {
			    return response.json();
		    }
	    })
            .then(data => {
                let tableData = ''; 

                if (data.length > 0) {
                    data.forEach(values => {
                        tableData += `
                        <tr>
			        <td>${values.location}</td>
				<td>${values.employeeId.id} - ${values.employeeId.name}</td>
				<td>${values.check.checkInId}</td>
				<td>${values.city}</td>
				<td>${values.country}</td>
				<td style="background: none; border: none; padding: 10; text-align: left;">
				      <a class="btn btn-outline-danger rounded-4 icon " onclick="funcRemove(${values.location})">
				      <img class="img-icon" src="../img/cancel.png" alt="Remove"/>
				      </a>
				</td>
                        </tr>
                        `;
                    });
                } else {
                    tableData = `
                    <tr>
                        <td colspan="6" style='color: red'>There's not LocationID: ${locationId}</td>
                    </tr>
                    `;
                }

                document.getElementById("table_location").innerHTML = tableData;
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter a valid Location ID');
    }
}

function findLocations(){
	fetch(GET_LOCATION).then((data)=>{
		return data.json();
	}).then((objectdata)=>{
		let tableData="";
		objectdata.map((values)=>{
		tableData+=`
                        <tr>
			        <td>${values.location}</td>
				<td>${values.employeeId.id} - ${values.employeeId.name}</td>
				<td>${values.check.checkInId}</td>
				<td>${values.city}</td>
				<td>${values.country}</td>
				<td style="background: none; border: none; padding: 10; text-align: left;">
				      <a class="btn btn-outline-danger rounded-4 icon " onclick="funcRemove(${values.location})">
				      <img class="img-icon" src="../img/cancel.png" alt="Remove"/>
				      </a>
				</td>
                        </tr>
		 `;
	});
	document.getElementById("table_location").innerHTML=tableData;
	})
}

function deleteLocationById() {
	let locationId; 
	if(arguments.length === 1){
		locationId = arguments[0];
	} else {
		locationId = document.getElementById('locationIdDelete').value;
	}

	if (locationId) {
	document.getElementById("table_location").innerHTML = '';
		fetch(`http://localhost:8762/location/api/v1/location/${locationId}/delete`, {
			method: 'DELETE'
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.status;  
			})
			.then(status => {
			let tableData = `
			<tr>
               			 <td colspan="6" style='color: red'>Location ID:  ${locationId} has been deleted.</td>
			</tr>`;
				document.getElementById("table_location").innerHTML = tableData;
			})
			.catch(error => {
				console.error('Error:', error)
				let tableData = `
				<tr>
        	    			<td colspan="6" style='color: red'>There's not Location ID: ${locationId} </td>

				</tr>`;
				document.getElementById("table_location").innerHTML = tableData;});
	} else {
		alert('Please enter a valid Location ID');
	}
}

function searchLocationById(){
	const locationId = document.getElementById('locationInput').value;
	console.log(locationId);
	document.getElementById("idEmployee").innerHTML = "";
	if(locationId){
		fetch(`http://localhost:8762/location/api/v1/location/${locationId}/record`)
			.then(response => response.json())
			.then(data => {
				let city = '';
				let department = '';
				if (data.length > 0) {
					data.forEach(location => {
						let data = `Update a field  of Employee ID: ${location.employeeId.id}`;
						document.getElementById("idEmployee").innerHTML = data;
						document.getElementById('searchForm').style.display='none';
						document.getElementById('newForm').style.display='block';
						city = `${location.city}`;
						document.getElementById("idCity").innerHTML = city;
						country= `${location.country}`;
						document.getElementById("idCountry").innerHTML = country;
					});
				} else {
					alert("Employee not found with this ID: " + locationId);
				}
			})
			.catch(error => console.error('Error:', error));
	}else {
		alert( 'Please enter a valid Employee ID');
	}


}

function registerLocation(){
	const recordId = document.getElementById('recordInput').value;
	document.getElementById("idEmployee").innerHTML = "";
	if(recordId){
		let city = '';
		let department = '';
		let data = `Create a new record, Record ID: ${recordId} `;
		document.getElementById("idEmployee").innerHTML = data;
		document.getElementById('searchForm').style.display='none';
		document.getElementById('newForm').style.display='block';
	}
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function updateField(){
	        const register = document.getElementById('registerId');
		const country = document.getElementById('inputCountry').value
		const city = document.getElementById('inputCity').value
	        let optionCountry;
		if(country !== "" || city !== "" ){
			register? optionCountry=pickCountry(country, city) : optionCountry= validationCountry(country, city);
			optionCountry;
		} else {
			alert("Please choose a country and a city");
		}
}
async function pickCountry(country, city){
	const recordId = document.getElementById('recordInput').value;
	countryArray = listOfCities[city];
	if ( countryArray != country){
		alert("The country is not associated within the respective city");
	} else {
		switch (countryArray){
			case 'Mexico':
				await registerCountry(countryArray,city, recordId);
				await delay(1000);
				break;

			case 'USA':
				await registerCountry(countryArray,city, recordId);
				await delay(1000);
				break;
			case 'India':
				await registerCountry(countryArray,city, recordId);
				await delay(1000);
				break;
			case 'China':
				await registerCountry(countryArray,city, recordId);
				await delay(1000);
				break;
		}
		window.location.href ="../pages/location.html";
	}
}

function registerCountry(countryArray,city,recordId){
    fetch(`http://localhost:8762/location/api/v1/location/${recordId}?city=${city}&country=${countryArray}`, {
	    method: 'POST',
	    headers: {
		    'Content-Type': 'application/json'
	    },
    })
     .then(response => {
	     if(!response.ok){
		     throw new Error('Network response was not ok');
	     }
	     return response.text();
     })
		.then(data => {
			alert("The employee: " + recordId + "is already updated with the City: "+ city + "and with the Country: " + countryArray);
		})
		.catch(error => {
			console.error('Error:', error);
		});
}



async function validationCountry(country, city){
	const locationId = document.getElementById('locationInput').value;
	countryArray = listOfCities[city];
	if ( countryArray != country){
		alert("The country is not associated within the respective city");
	} else {
		switch (countryArray){
			case 'Mexico':
				await updateCountry(countryArray, locationId);
				await delay(1000);
				await updateCity(city, locationId);
				await delay(1000);
				break;

			case 'USA':
				await updateCountry(countryArray, locationId);
				await delay(1000);
				await updateCity(city, locationId);
				await delay(1000);
				break;
			case 'India':
				await updateCountry(countryArray, locationId);
				await delay(1000);
				await updateCity(city, locationId);
				await delay(1000);
				break;
			case 'China':
				await updateCountry(countryArray, locationId);
				await delay(1000);
				await updateCity(city, locationId);
				await delay(1000);
				break;
		}
		window.location.href ="../pages/location.html";
	}
}

function updateCountry(countryArray, locationId){
    const employeeId = document.getElementById('locationInput').value;
    fetch(`http://localhost:8762/location/api/v1/location/${locationId}/country?country=${countryArray}`, {
	    method: 'PUT',
	    headers: {
		    'Content-Type': 'application/json'
	    },
	    // body: JSON.stringify({c}),
	    // cache: 'no-store'
    })
     .then(response => {
	     if(!response.ok){
		     throw new Error('Network response was not ok');
	     }
	     return response.text();
     })
		.then(data => {
			alert("The employee: " + employeeId + "is already updated with the Country: "+ countryArray);
		})
		.catch(error => {
			console.error('Error:', error);
		});
}

function updateCity(city, locationId){
    const employeeId = document.getElementById('locationInput').value;
    fetch(`http://localhost:8762/location/api/v1/location/${locationId}/city?city=${city}`, {
	    method: 'PUT',
	    headers : {
		    'Content-Type': 'application/json'
	    },
	    // body: JSON.stringify({city}),
	    // cache: 'no-store'
    })
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.text();  
        })
        .then(data => {
		alert("The employee: " + employeeId + "is already updated with the City: "+ city);
        })
    .catch(error => {
        console.error('Error:', error);
    });
}


displayData();

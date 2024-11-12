const GET_LOCATION = 'http://localhost:8762/location/api/v1/location/records'

////GET all data from location
fetch(GET_LOCATION).then((data)=> {
	return data.json();
}).then((objectData)=>{
	let tableData="";
	objectData.map((values)=>{
		tableData+=`
			<tr>
				<td>${values.location}</td>
				<td>${values.employee.id} - ${values.employee.name}</td>
				<td>${values.check.checkInId}</td>
				<td>${values.city}</td>
				<td>${values.country}</td>
			</tr>
		`;
		document.getElementById("table_location").innerHTML=tableData;
	});
})

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
		        	<td>${values.employee.id} - ${values.employee.name}</td>
				<td>${values.check.checkInId}</td>
				<td>${values.city}</td>
				<td>${values.country}</td>
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
		        	<td>${values.employee.id} - ${values.employee.name}</td>
				<td>${values.check.checkInId}</td>
				<td>${values.city}</td>
				<td>${values.country}</td>
                        </tr>
		 `;
	});
	document.getElementById("table_location").innerHTML=tableData;
	})
}

function deleteLocationById() {
    const locationId = document.getElementById('locationIdDelete').value;
    
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
		document.getElementById("table_location").innerHTML = tableData;
	});
    } else {
        alert('Please enter a valid Employee ID');
    }
}

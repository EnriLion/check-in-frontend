const POST_EMPLOYEE = 'https://www.boredapi.com/api/activity'
const GET_EMPLOYEE= 'http://localhost:8762/employee-service/api/v1/people/records'
const UPDATE_EMPLOYEE= 'https://www.boredapi.com/api/activity'
const UPDATE_POSITION= 'https://www.boredapi.com/api/activity'
const UPDATE_EMAIL= 'https://www.boredapi.com/api/activity'
const UPDATE_PHONE= 'https://www.boredapi.com/api/activity'
const UPDATE_DEPARTMENT= 'https://www.boredapi.com/api/activity'

//GET all data from employees
fetch(GET_EMPLOYEE).then((data)=>{
	return data.json();
}).then((objectData)=>{
	console.log(objectData[0].id);
	let tableData="";
	objectData.map((values)=>{
		tableData+=`
			<tr>
				<td>${values.id}</td>
				<td>${values.name}</td>
				<td>${values.department}</td>
				<td>${values.position}</td>
				<td>${values.email}</td>
				<td>${values.phone}</td>
			</tr>
			`;
	});
	document.getElementById("table_employee").
		innerHTML=tableData;
})

//GET all data from employees by ID
function findEmployeeById() {
    const employeeId = document.getElementById('userIdInput').value;
    if (employeeId) {
        document.getElementById("table_employee").innerHTML = '';

        fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/record`)
            .then(response => response.json())
            .then(data => {
                let tableData = ''; 

                if (data.length > 0) {
                    data.forEach(employee => {
                        tableData += `
                        <tr>
                            <td>${employee.id}</td>
                            <td>${employee.name}</td>
                            <td>${employee.department}</td>
                            <td>${employee.position}</td>
                            <td>${employee.email}</td>
                            <td>${employee.phone}</td>
                        </tr>
                        `;
                    });
                } else {
                    tableData = `
                    <tr>
                        <td colspan="6">There's not Employee ID: ${employeeId}</td>
                    </tr>
                    `;
                }

                document.getElementById("table_employee").innerHTML = tableData;
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter a valid Employee ID');
    }
}

//Update function searchEmployee
function searchEmployeeById() {
    const employeeId = document.getElementById('employeeIdInput').value;
    document.getElementById("idEmployee").innerHTML = "";
    if (employeeId) {
        fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/record`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    alert("Employee found with this ID: " + employeeId);
                    let data = `Select the options the Employee ID: ${employeeId}`;
                    document.getElementById("idEmployee").innerHTML = data;
                    document.getElementById('searchForm').style.display='none';
                    document.getElementById('newForm').style.display='block';
                    
                } else {
                    alert("Employee not found with this ID: " + employeeId);
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter a valid Employee ID');
    }
}

//Function of show each field
function showField(){
    const employeeSelect = document.getElementById('employeeSelect');
    const inputContainer = document.getElementById('inputContainer');
    const inputLabel = document.getElementById('inputLabel');
    
    const selectedValue = employeeSelect.value;

    if (selectedValue) {
        inputContainer.style.display = 'block'; 

        switch (selectedValue) {
            case 'name':
                inputLabel.textContent = 'New Name:';
                break;
            case 'department':
                inputLabel.textContent = 'New  Department:';
                break;
            case 'position':
                inputLabel.textContent = 'New  Position:';
                break;
            case 'email':
                inputLabel.textContent = 'New Email:';
                break;
            case 'phone':
                inputLabel.textContent = 'New Phone:';
                break;
            default:
                inputContainer.style.display = 'none'; 
        }
    } else {
        inputContainer.style.display = 'none'; 
    }
}

//GET all employees
function findEmployees(){
	fetch(GET_EMPLOYEE).then((data)=>{
		return data.json();
	}).then((objectData)=>{
		console.log(objectData[0].id);
		let tableData="";
		objectData.map((values)=>{
		tableData+=`
		<tr>
		   <td>${values.id}</td>
		   <td>${values.name}</td>
		   <td>${values.department}</td>
		   <td>${values.position}</td>
		   <td>${values.email}</td>
	           <td>${values.phone}</td>
		</tr>
		 `;
	});
	document.getElementById("table_employee").innerHTML=tableData;
	})
}

//DELETE User by ID
function deleteEmployeeById() {
    const employeeId = document.getElementById('userIdDelete').value;
    
    if (employeeId) {
        // Clear the table data
        document.getElementById("table_employee").innerHTML = '';

        fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/delete`, {
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
                <td colspan="6">Employee with ID ${employeeId} has been deleted.</td>
            </tr>`;
            
            document.getElementById("table_employee").innerHTML = tableData;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error deleting employee.');
        });
    } else {
        alert('Please enter a valid Employee ID');
    }
}

// UPDATE employee by ID
function updateField(){
    const employeeId = document.getElementById('employeeIdInput').value;
    const field = document.getElementById('inputField').value;
    const employeeSelect = document.getElementById('employeeSelect');
    const selectedvalue = employeeSelect.value;
    if (employeeSelect && field) {
        if(field){
        switch (selectedvalue) {
            case 'name':
                updateName(field,employeeId);
                break;
            case 'department':
                updateDepartment(field,employeeId);
            case 'position':
                updatePosition(field,employeeId);
                break;
            case 'email':
                updateEmail(field,employeeId);
                break;
            case 'phone':
                updatePhone(field,employeeId);
                break;
            default:
                alert("Choose one of the fields");
            }
        } 
    }
}

//Update name
function updateName(field,employeeId){
    fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/name?name=${field}`, {
        method: 'PUT'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();  
        })
        .then(data => {
            alert("The employee: " + employeeId + "is already updated with the Name: "+ field);
        })
    .catch(error => {
        console.error('Error:', error);
        alert('Error cant update employee.');
    });

}
//Update department
function updateDepartment(field,employeeId){
    fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/department?department=${field}`, {
        method: 'PUT'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();  
        })
        .then(data => {
            alert("The employee: " + employeeId + "is already updated with the Department: "+ field);
        })
    .catch(error => {
        console.error('Error:', error);
        alert('Error deleting employee.');
    });

}

//Update position
function updatePosition(field,employeeId){
    fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/position?position=${field}`, {
        method: 'PUT'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();  
        })
        .then(data => {
            alert("The employee: " + employeeId + "is already updated with the Position "+ field);
        })
    .catch(error => {
        console.error('Error:', error);
        alert('Error deleting employee.');
    });

}

//Update email
function updateEmail(field,employeeId){
    fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/email?email=${field}`, {
        method: 'PUT'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();  
        })
        .then(data => {
            alert("The employee: " + employeeId + "is already updated with the Email: "+ field);
        })
    .catch(error => {
        console.error('Error:', error);
        alert('Error deleting employee.');
    });

}

//Update phone
function updatePhone(field,employeeId){
    fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/phone?phone=${field}`, {
        method: 'PUT'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();  
        })
        .then(data => {
            alert("The employee: " + employeeId + "is already updated with the Phone: "+ field);
        })
    .catch(error => {
        console.error('Error:', error);
        alert('Error deleting employee.');
    });

}

//
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


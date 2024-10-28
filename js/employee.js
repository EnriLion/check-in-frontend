const GET_EMPLOYEE= 'http://localhost:8762/employee-service/api/v1/people/records'

//GET all data from employees
fetch(GET_EMPLOYEE).then((data)=>{
	return data.json();
}).then((objectData)=>{
	const selectShow = document.getElementById('employeeIdInput');
	const tableShow = document.getElementById('table_employee');
	let tableData="";
	let selectData="";
	objectData.map((values)=>{
		if(tableShow){
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
			document.getElementById("table_employee").
				innerHTML=tableData;
		} else if (selectShow) {
			selectData+=`
				<option value="${values.id}">Employee ID: ${values.id} | Name: ${values.name}</option> `
			document.getElementById("employeeIdInput").innerHTML=selectData;
		}
	});
})

//GET all data from select

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
                        <td colspan="6" style='color: red'>There's not Employee ID: ${employeeId}</td>
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
		let  name = '';
		let  department= '';
		let  email = '';
		let  position= '';
		let  phone = '';
                if (data.length > 0) {
			data.forEach(employee => {
				let data = `Select an option for Employee ID: ${employeeId}`;
				document.getElementById("idEmployee").innerHTML = data;
				document.getElementById('searchForm').style.display='none';
				document.getElementById('newForm').style.display='block';
				name +=`Previous name: ${employee.name}`;
				document.getElementById("idName").innerHTML = name;
				department += `Previous department: ${employee.department}`;
				document.getElementById("idDepartment").innerHTML = department;
				position += `Previous position: ${employee.position}`;
				document.getElementById("idPosition").innerHTML = position;
				email +=`Previous email: ${employee.email}`;
				document.getElementById("idEmail").innerHTML = email;
				phone += `Previous phone: ${employee.phone}`;
				document.getElementById("idPhone").innerHTML = phone;
			});
                    
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
// function showField(){
//     const employeeSelect = document.getElementById('employeeSelect');
//     const inputContainer = document.getElementById('inputContainer');
//     const inputLabel = document.getElementById('inputLabel');
    
//     const selectedValue = employeeSelect.value;

//     if (selectedValue) {
//         inputContainer.style.display = 'block'; 

//         switch (selectedValue) {
//             case 'name':
//                 inputLabel.textContent = 'New Name:';
//                 break;
//             case 'department':
//                 inputLabel.textContent = 'New  Department:';
//                 break;
//             case 'position':
//                 inputLabel.textContent = 'New  Position:';
//                 break;
//             case 'email':
//                 inputLabel.textContent = 'New Email:';
//                 break;
//             case 'phone':
//                 inputLabel.textContent = 'New Phone:';
// 		break;
//             case 'create':
//                 inputLabel.style.display = 'none';
// 		inputField.style.display = 'none';
// 		document.getElementById('inputField').value = "1";
//                 break;
//             default:
//                 inputContainer.style.display = 'none'; 
//         }
//     } else {
//         inputContainer.style.display = 'none'; 
//     }
// }

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
                <td colspan="6" style='color: red'>Employee with ID ${employeeId} has been deleted.</td>
            </tr>`;
            
            document.getElementById("table_employee").innerHTML = tableData;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Please enter a valid Employee ID');
    }
}

// UPDATE employee by ID
function updateField(){
	const employeeId = document.getElementById('employeeIdInput').value;
	const fields = [
		{ value: document.getElementById('inputName').value, updateFunc: updateName },
		{ value: document.getElementById('inputDepartment').value, updateFunc: updateDepartment, default: 'default' },
		{ value: document.getElementById('inputPosition').value, updateFunc: updatePosition, default: 'default' },
		{ value: document.getElementById('inputEmail').value, updateFunc: updateEmail },
		{ value: document.getElementById('inputPhone').value, updateFunc: updatePhone }
	];
	const updatedFields = fields.filter(({ value, default: def }) => value && value !== def);

	updatedFields.forEach(({ value, updateFunc }) => updateFunc(value, employeeId));

	if (updatedFields.length == 0) {
		alert('Please choose one or all of the fields to update');
	} else {
		window.location.hreg = 'index.html';
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
            alert("The employee: " + employeeId + " is already updated with the Department: "+ field);
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
            alert("The employee: " + employeeId + " is already updated with the Position "+ field);
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

//POST
function newEmployee(){
	const nameValue = document.getElementById('name').value;
	const departmentValue= document.getElementById('department').value;
	const positionValue = document.getElementById('position').value;
	const emailValue = document.getElementById('email').value;
	const phoneValue = document.getElementById('phone').value;
	if(nameValue && departmentValue && positionValue && emailValue && phoneValue){
		fetch(`http://localhost:8762/employee-service/api/v1/people?name=${nameValue}&department=${departmentValue}&position=${positionValue}&email=${emailValue}&phone=${phoneValue}`, {
			method: 'POST'
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.text();  
			})
			.then(data => {
				alert("The new employee is already created ");
				window.location.href='index.html';
			})
			.catch(error => {
				console.error('Error:', error);
				alert('Error cant create employee.');
			});
	} else {
		alert('Complete all the fields to create a user');
	}
}

//Update new CheckIn
function updateCreate(field,employeeId){
    fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/new`, {
        method: 'PUT'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();  
        })
        .then(data => {
            alert("The employeeID: " + employeeId + " has a new CheckIn");
            alert("Remember the employeeID: " + employeeId + " needs to be updated");
        })
    .catch(error => {
        console.error('Error:', error);
        alert('Error deleting employee.');
    });

}

//Create new CheckIn

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


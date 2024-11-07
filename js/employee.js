const GET_EMPLOYEE= 'http://localhost:8762/employee-service/api/v1/people/records'

//functionButtonCancel
function funcRemove(values){
	let employeeId = values;
	deleteEmployeeById(employeeId);
}

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
				<td style="background: none; border: none; padding: 0;"><a class="btn btn-outline-danger rounded-4 icon" onclick="funcRemove(${values.id})"><img class="img-icon" src="img/cancel.png"</a></td>
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
			    <td style="background: none; border: none; padding: 0;"><a class="btn btn-outline-danger rounded-4 icon" onclick="funcRemove(${employee.id})"><img class="img-icon" src="img/cancel.png"</a></td>
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
				name =`${employee.name}`;
				document.getElementById("idName").innerHTML = name;
				department = `${employee.department}`;
				document.getElementById("idDepartment").innerHTML = department;
				position = `${employee.position}`;
				document.getElementById("idPosition").innerHTML = position;
				email =`${employee.email}`;
				document.getElementById("idEmail").innerHTML = email;
				phone = `${employee.phone}`;
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

//GET all employees
function findEmployees(){
	fetch(GET_EMPLOYEE).then((data)=>{
		return data.json();
	}).then((objectData)=>{
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
		   <td style="background: none; border: none; padding: 0;"><a class="btn btn-outline-danger rounded-4 icon" onclick="funcRemove(${values.id})"><img class="img-icon" src="img/cancel.png"</a></td>
		</tr>
		 `;
	});
	document.getElementById("table_employee").innerHTML=tableData;
	})
}


//DELETE User by ID
function deleteEmployeeById() {
     let employeeId;
     if(arguments.length === 1){
	employeeId  = arguments[0];
     } else {
	employeeId  = document.getElementById('userIdDelete').value;
     }
    
    if (employeeId) {
        // Clear the table data
        document.getElementById("table_employee").innerHTML = '';

        fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/delete`, {
		method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ${response}');
            }
	    const contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")){
		    return response.json();
	    }
	    return {};	
        })
        .then(data => {
            let tableData = `
            <tr>
                <td colspan="6" style='color: red'>Employee with ID ${employeeId} has been deleted.</td>
            </tr>`;
            
            document.getElementById("table_employee").innerHTML = tableData;
        })
        .catch(error => {
            let tableData = `
            <tr>
                <td colspan="6" style='color: red'>There's not Employee ID ${employeeId} </td>
            </tr>`;
	    console.log(error);
            document.getElementById("table_employee").innerHTML = tableData;
        });
    } else {
        alert('Please enter a valid Employee ID');
    }
}

// UPDATE employee by ID
function updateField() {

    // Get values of each input field
    const name = document.getElementById('inputName').value;
    const department = document.getElementById('inputDepartment').value;
    const position = document.getElementById('inputPosition').value;
    const email = document.getElementById('inputEmail').value;
    const phone = document.getElementById('inputPhone').value;

}


//Update name
function updateName(name,employeeId){
    fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/name?name=${name}`, {
        method: 'PUT'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();  
        })
        .then(data => {
            alert("The employee: " + employeeId + "is already updated with the Name: "+ name);
        })
    .catch(error => {
        console.error('Error:', error);
    });

}
//Update department
function updateDepartment(department,employeeId){
    fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/department?department=${department}`, {
        method: 'PUT'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();  
        })
        .then(data => {
            alert("The employee: " + employeeId + " is already updated with the Department: "+ department);
        })
    .catch(error => {
        console.error('Error:', error);
    });

}

//Update position
function updatePosition(position,employeeId){
    fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/position?position=${position}`, {
        method: 'PUT'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();  
        })
        .then(data => {
            alert("The employee: " + employeeId + " is already updated with the Position "+ position);
        })
    .catch(error => {
        console.error('Error:', error);
    });

}

//Update email
function updateEmail(email,employeeId){
    fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/email?email=${email}`, {
        method: 'PUT'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();  
        })
        .then(data => {
            alert("The employee: " + employeeId + "is already updated with the Email: "+ email);
        })
    .catch(error => {
        console.error('Error:', error);
    });

}

//Update phone
function updatePhone(field,employeeId){
    fetch(`http://localhost:8762/employee-service/api/v1/people/${employeeId}/phone?phone=${phone}`, {
        method: 'PUT'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();  
        })
        .then(data => {
            alert("The employee: " + employeeId + "is already updated with the Phone: "+ phone);
        })
    .catch(error => {
        console.error('Error:', error);
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
function updateCreate(){
    const updateIdRecord = document.getElementById('updateIdRecord').value;
    fetch(`http://localhost:8762/employee-service/api/v1/people/${updateIdRecord}/new`, {
        method: 'PUT'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.text();  
        })
        .then(data => {
            alert("The employeeID: " + updateIdRecord + " has a new CheckIn");
            alert("Remember the employeeID: " + updateIdRecord + " needs to be updated");
	    window.location.href = 'time-sheet.html';

        })
    .catch(error => {
        console.error('Error:', error);
        alert('Error deleting employee.');
    });

}


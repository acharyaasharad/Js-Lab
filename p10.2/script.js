const employeeForm = document.getElementById('employeeForm');
const employeeTableBody = document.getElementById('employeeTableBody');
const jsonOutput = document.getElementById('jsonOutput');
const loadEmployeesButton = document.getElementById('loadEmployees');

let employees = [];

function renderTable() {
  employeeTableBody.innerHTML = '';

  employees.forEach((employee) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${employee.employeeId}</td>
      <td>${employee.employeeName}</td>
      <td>${employee.department}</td>
      <td>${employee.salary}</td>
    `;

    employeeTableBody.appendChild(row);
  });
}

async function addEmployeeFromForm(event) {
  event.preventDefault();

  const employee = {
    employeeId: document.getElementById('employeeId').value,
    employeeName: document.getElementById('employeeName').value,
    department: document.getElementById('department').value,
    salary: Number(document.getElementById('salary').value)
  };

  // Send the new employee data to the backend server to be saved in the file
  try {
    const response = await fetch('/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    });

    if (response.ok) {
      jsonOutput.textContent = 'Employee successfully appended directly to employees.json!';
      employeeForm.reset();
    } else {
      throw new Error('Failed to save to server');
    }
  } catch (error) {
    jsonOutput.textContent = 'Error: ' + error.message;
  }
}

async function loadEmployeesFromJson() {
  try {
    const response = await fetch('employees.json');

    if (!response.ok) {
      throw new Error('Unable to load employees.json');
    }

    employees = await response.json();

    renderTable();
    jsonOutput.textContent = 'Employees loaded successfully from employees.json.';
  } catch (error) {
    jsonOutput.textContent = 'Error: ' + error.message;
  }
}

employeeForm.addEventListener('submit', addEmployeeFromForm);
loadEmployeesButton.addEventListener('click', loadEmployeesFromJson);

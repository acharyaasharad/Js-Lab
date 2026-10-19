let employees = [];

function renderTable() {
  const $employeeTableBody = $('#employeeTableBody');
  $employeeTableBody.empty();

  $.each(employees, function(index, employee) {
    const row = `
      <tr>
        <td>${employee.employeeId}</td>
        <td>${employee.employeeName}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
      </tr>
    `;
    $employeeTableBody.append(row);
  });
}

function addEmployeeFromForm(event) {
  event.preventDefault();

  const employee = {
    employeeId: $('#employeeId').val(),
    employeeName: $('#employeeName').val(),
    department: $('#department').val(),
    salary: Number($('#salary').val())
  };

  // Send the new employee data to the backend server to be saved in the file using jQuery
  $.ajax({
    url: '/save',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(employee),
    success: function(response) {
      $('#jsonOutput').text('Employee successfully appended directly to employees.json!');
      $('#employeeForm')[0].reset();
    },
    error: function(xhr, status, error) {
      $('#jsonOutput').text('Error: Failed to save to server - ' + error);
    }
  });
}

function loadEmployeesFromJson() {
  // Load employees from the server using jQuery
  $.ajax({
    url: 'employees.json',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      employees = data;
      renderTable();
      $('#jsonOutput').text('Employees loaded successfully from employees.json.');
    },
    error: function(xhr, status, error) {
      $('#jsonOutput').text('Error: Unable to load employees.json - ' + error);
    }
  });
}

$(document).ready(function() {
  $('#employeeForm').on('submit', addEmployeeFromForm);
  $('#loadEmployees').on('click', loadEmployeesFromJson);
});

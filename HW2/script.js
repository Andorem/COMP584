let employees = [];
$.ajax({
    type: 'GET',
    url: 'employees.php',
    success: (res) => {
        employees = res;
        console.log("GET: employees = " + JSON.stringify(employees));
    },
    dataType: 'json'
});

function addEmployee() {
  let employee = {};
  let employeeId = Math.random().toString(20).substring(2, 19);
  
  employee.employeeId = employeeId;
  employee.firstName = $('#first-name').val();
  employee.lastName = $('#last-name').val();
  employee.department = $('#dept').val();
  employee.hireDate = (new Date()).toString().split(" ").splice(0, 4).join(" "); // Day Mon DD YYYY
  
  let employeeExists = employees.some(val => (val.firstName === employee.firstName && val.lastName == employee.lastName && val.department == employee.department));
  if (!employeeExists) {
    // Send employee JSON object to backend
    $.ajax({
      type: 'POST',
      url: 'employees.php',
      data: {
        json: JSON.stringify(employee)
      },
      dataType: 'json'
    })
    .done((res) => {
        console.log("POST: sent JSON successfully\n res = " + JSON.stringify(res));
    })
    .fail((res) => {
        console.log("POST: failed to send JSON\n res = " + JSON.stringify(res));
    })

    employees.push(employee);
    console.log(employees);
  }
  else {
      console.log("Employee already exists!");
  }
  
  displayEmployee(employee);
}

function displayEmployee(employee) {
  $("#employee").show();
  $("#info-name").text(`${employee.firstName} ${employee.lastName}`);
  $("#info-dept").text(employee.department);
  $("#info-date").text(employee.hireDate);
  $("#info-id").text(employee.employeeId);

  $("#info-all").text(employees.length);
}

function displayHTML() {
  $("#info-all").text(employees.length);
  $("#browser-icon").attr('src', getBrowserIcon());
}

function getBrowserIcon() {
  if (navigator.userAgent.indexOf("Chrome") != -1) return './images/chrome.png';
  else if (navigator.userAgent.indexOf("Firefox") != -1) return './images/firefox.png';
  else if (navigator.userAgent.indexOf("Safari") != -1) return './images/safari.png';
  else if (navigator.userAgent.indexOf("Edg") != -1) return './images/edge.png';
  else if (navigator.userAgent.indexOf("IE") != -1) return './images/why.png';
  else return 'images/default.png';
}

window.onload = displayHTML;
$('#submit').bind('click', function (e) {
    e.preventDefault();
    addEmployee();
  });


<?php
    $employees = [];
    if (!is_file('employees.json')) {
        file_put_contents('employees.json', json_encode($employees));
    }
    else {
        $employeesFile = file_get_contents('employees.json');
        $employees = json_decode($employeesFile);
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $employee = json_decode($_POST['json']);
        array_push($employees, $employee);
        file_put_contents('employees.json', json_encode($employees));
        print(json_encode($employee));
    }
    else {
        print(json_encode($employees));
    }
?>
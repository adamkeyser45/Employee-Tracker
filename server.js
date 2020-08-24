const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');

const { taskQuestion, addEmployeeQuestions, addRoleQuestions, addDeptQuestions, updateEmployeeQuestions} = require('./inquirerQuestions');

const app = express();
// const apiRoutes = require('./routes/index');

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the apiRoutes
// app.use('/api', apiRoutes);

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: 'mySqlR00tPass!',
  database: 'manager_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  startApp();
});

startApp = () => {
    console.log(`

 =======================
 =   Employee Manager  =
 =======================                                                                                                     
    
`
    );
    taskChoice();
};

taskChoice = () => {
    return inquirer.prompt(taskQuestion)
    .then(choice => {
        if (choice.taskChoice === "Quit") {
            console.log('Thanks for using the Employee Manager!');
            connection.end();
        }
        else if (choice.taskChoice === 'View all Employees') {
            getEmployees();
        }
        else if (choice.taskChoice === "View all Roles") {
            getRoles();
        }
        else if (choice.taskChoice === "View all Departments") {
            getDepts();
        }
        else if (choice.taskChoice === "Add an Employee") {
            addEmployee();
        }
        else if (choice.taskChoice === "Add a Role") {
            addRole();
        }
        else if (choice.taskChoice === "Add a Department") {
            addDept();
        }
        else if (choice.taskChoice === "Update an Employee Role") {
            updateEmployee();
        }
    });
};

// Need to update query to give specific information
getEmployees = () => {
    connection.query(`
    SELECT employee.id AS ID, employee.first_name AS FirstName, 
        employee.last_name AS LastName, 
        eRole.title AS Role, 
        eRole.salary AS Salary, 
        department.deptName AS Department
    FROM employee
    INNER JOIN department 
    ON department.id = employee.role_id 
    LEFT JOIN eRole 
    ON eRole.id = employee.role_id
    `,
    function (err, res) {
        if (err) throw err;
        console.table(res);
        taskChoice();
    });
};

// Need to update query to give specific information
getRoles = () => {
    connection.query(`SELECT * FROM eRole`, function (err, res) {
        if (err) throw err;
        console.table(res);
        taskChoice();
    });
};

// Need to update query to give specific information
getDepts = () => {
    connection.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        console.table(res);
        taskChoice();
    });
};

addEmployee = () => {
    return inquirer.prompt(addEmployeeQuestions)
    .then(data => {
        connection.query(`
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES
            ('${data.addEmployeeFirstName}', '${data.addEmployeeLastName}', ${data.addEmployeeRole}, ${data.addEmployeeManagerId})`, 
        function (err, res) {
            if (err) throw err;
            console.log("Employee Added!");
            taskChoice();
        });
    });
};

addRole = () => {
    return inquirer.prompt(addRoleQuestions)
    .then(data => {
        connection.query(`
        INSERT INTO eRole (title, salary, department_id)
        VALUES
            ('${data.addRole}', '${data.addRoleSalary}', ${data.addRoleId})`, 
        function (err, res) {
            if (err) throw err;
            console.log("Role Added!");
            taskChoice();
        });
    });  
};

addDept = () => {
    return inquirer.prompt(addDeptQuestions)
    .then(data => {
        connection.query(`
        INSERT INTO department (deptName)
        VALUES
            ('${data.addDepartment}')`, 
        function (err, res) {
            if (err) throw err;
            console.log("Department Added!");
            taskChoice();
        });
    });  
};

updateEmployee = () => {
    return inquirer.prompt(updateEmployeeQuestions)
    .then(data => {
        connection.query(`
        UPDATE employee
        SET role_id = ${data.updateEmployee2}
        WHERE id = ${data.updateEmployee}`, 
        function (err, res) {
            if (err) throw err;
            console.log("Employee Updated!");
            taskChoice();
        });
    });
};
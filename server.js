const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');

const { taskQuestion, addEmployeeQuestions, addRoleQuestions, addDeptQuestions, updateEmployeeQuestions} = require('./inquirerQuestions');
const { response } = require('express');

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
    SELECT 
        employee.id AS ID, 
        employee.first_name AS FirstName, 
        employee.last_name AS LastName,
        eRole.title AS Role, 
        eRole.salary AS Salary, 
        department.deptName AS Department,
        manager.last_name AS Manager
        FROM employee
    LEFT JOIN eRole 
        ON eRole.id = employee.role_id   
    INNER JOIN department 
        ON department.id = eRole.department_id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    ORDER BY employee.id ASC`,
    function (err, res) {
        if (err) throw err;
        console.table(res);
        taskChoice();
    });
};

// Need to update query to give specific information
getRoles = () => {
    connection.query(`
    SELECT 
        eRole.id AS ID, 
        title AS "Employee Role", 
        eRole.salary as Salary, 
        department_id AS "Dept #", 
        deptName AS "Department" 
        FROM eRole
    LEFT JOIN department
    ON eRole.department_id = department.id
    `, function (err, res) {
        if (err) throw err;
        console.table(res);
        taskChoice();
    });
};

// Need to update query to give specific information
getDepts = () => {
    connection.query(`
    SELECT
        id AS ID, 
        deptName AS "Department Name"  
        FROM department
        `, function (err, res) {
        if (err) throw err;
        console.table(res);
        taskChoice();
    });
};

addEmployee = () => {
    connection.query("SELECT * FROM employee", function (err, employees) {
        if(err) throw err;
        connection.query("SELECT * FROM eRole", function (err, roles) {
            if(err) throw err;

            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'addEmployeeFirstName',
                    message: "What is the employee's first name?",
                    validate: input => {
                        if (input) {
                            return true;
                        } else {
                            console.log('Please input a name.');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'addEmployeeLastName',
                    message: "What is the employee's last name?",
                    validate: input => {
                        if (input) {
                            return true;
                        } else {
                            console.log('Please input a name.');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'addEmployeeRole',
                    message: "What is the employee's role?",
                    choices: function() {
                        let choiceArr = [];
                        for (let i=0; i < roles.length; i++) {
                            choiceArr.push(roles[i].title)
                        }
                        return choiceArr;
                    }
                },
                {
                    type: 'list',
                    name: 'addEmployeeManager',
                    message: "Who is the employee's manager?",
                    choices: function() {
                        let choiceArr = [];
                        for (let i=0; i < employees.length; i++) {
                            choiceArr.push(employees[i].last_name)
                        }
                        return choiceArr;
                    }
                }
            ])
            .then(data => {

                for (let i = 0; i < roles.length; i++) {
                    if(roles[i].title === data.addEmployeeRole) {
                        data.role_id = roles[i].id;
                    }
                }

                for (let i = 0; i < employees.length; i++) {
                    if(employees[i].last_name === data.addEmployeeManager) {
                        data.manager_id = employees[i].id;
                    }
                }


                connection.query(`
                INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES
                    ('${data.addEmployeeFirstName}', '${data.addEmployeeLastName}', ${data.role_id}, ${data.manager_id})`, 
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee Added!");
                    taskChoice();
                });
            });
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
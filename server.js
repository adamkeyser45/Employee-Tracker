const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');

const { taskQuestion, addDeptQuestions} = require('./inquirerQuestions');
const { response } = require('express');

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// Server Start
connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  startApp();
});

// Function that starts app and sends to the task menu
startApp = () => {
    console.log(`

 =======================
 =   Employee Manager  =
 =======================                                                                                                     
    
`
    );
    taskChoice();
};

// Task menu, calls appropriate functions
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

// Displays all current employees
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

// Displays all current roles
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

// Displays all current departments
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

// Adds an employee
addEmployee = () => {
    connection.query("SELECT * FROM employee", function (err, employees) {
        if(err) throw err;
        connection.query("SELECT * FROM eRole", function (err, roles) {
            if(err) throw err;

            // questions to ask about new employee details
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
                    // This code inputs the current roles as choices
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
                    // This code inputs the current list of employee's last names
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

                // These 2 for loops assign values to the answer choices above so they can be added in below
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

// Adds a new role
addRole = () => {
    connection.query("SELECT * FROM department", function (err, departments) {
        if(err) throw err;

        // questions for details about new role
        return inquirer.prompt([
            {
                type: 'input',
                name: 'addRole',
                message: "What role would you like to add?",
                validate: input => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please input the role's name.");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addRoleSalary',
                message: "What is the role's Salary?",
                validate: input => {
                    if (input > 0) {
                        return true;
                    } else {
                        console.log('Please input a number.');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'addRoleDept',
                message: "What Department does the new Role fall under?",
                // This code displays all current departments
                choices: function() {
                    let choiceArr = [];
                    for (let i=0; i < departments.length; i++) {
                        choiceArr.push(departments[i].deptName)
                    }
                    return choiceArr;
                }
            }
        ])
        .then(data => {

            // Loop to add value to departments to be used below
            for (let i = 0; i < departments.length; i++) {
                if(departments[i].deptName === data.addRoleDept) {
                    data.department_id = departments[i].id;
                }
            }

            connection.query(`
            INSERT INTO eRole (title, salary, department_id)
            VALUES
                ('${data.addRole}', '${data.addRoleSalary}', ${data.department_id})`, 
            function (err, res) {
                if (err) throw err;
                console.log("Role Added!");
                taskChoice();
            });
        });   
    });
};

// function to add a department, questions are on "inquirerQuestions.js"
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

// function to update an employee
updateEmployee = () => {
    connection.query("SELECT * FROM employee", function (err, employees) {
        if(err) throw err;
        connection.query("SELECT * FROM eRole", function (err, roles) {
            if(err) throw err;

            // Questions to ask details about who and what to update
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'updateEmployee',
                    message: "Which employee would you like to update?",
                    // This code displays all current employees
                    choices: function() {
                        let choiceArr = [];
                        for (let i=0; i < employees.length; i++) {
                            choiceArr.push(`${employees[i].first_name} ${employees[i].last_name}`)
                        }
                        return choiceArr;
                    }
                },
                {
                    type: 'list',
                    name: 'updateEmployee2',
                    message: "What is the employee's new role?",
                    // This code inputs the current roles as choices
                    choices: function() {
                        let choiceArr = [];
                        for (let i=0; i < roles.length; i++) {
                            choiceArr.push(roles[i].title)
                        }
                        return choiceArr;
                    }
                }
            ])
            .then(data => {

                // Loops to assign values to the choices above to be used below
                for (let i = 0; i < employees.length; i++) {
                    if(`${employees[i].first_name} ${employees[i].last_name}` === data.updateEmployee) {
                        data.id = employees[i].id;
                    }
                }

                for (let i = 0; i < roles.length; i++) {
                    if(roles[i].title === data.updateEmployee2) {
                        data.role_id = roles[i].id;
                    }
                }

                connection.query(`
                    UPDATE employee
                    SET employee.role_id = ${data.role_id}
                    WHERE employee.id = ${data.id}`, 
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee Updated!");
                    taskChoice();
                });
            });
        })
    })
};
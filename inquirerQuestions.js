const inquirer = require('inquirer');

const taskQuestion = [
    {
        type: 'list',
        name: 'taskChoice',
        message: 'What would you like to do?',
        choices: [
            'View all Employees', 
            'View all Roles', 
            'View all Departments',
            'Add an Employee',
            'Add a Role',
            'Add a Department',
            'Update an Employee Role',
            'Quit'
        ]
    }
];

const addEmployeeQuestions = [
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
        choices: [
            'Sales Lead', 
            'Salesperson', 
            'Lead Engineer',
            'Software Engineer',
            'Accountant',
            'Legal Team Lead',
            'Lawyer'
        ]
    },
    {
        type: 'list',
        name: 'addEmployeeManager',
        message: "Who is the employee's manager?",
        choices: [
            // List of employees
        ]
    }
];

const addRoleQuestions = [
    {
        type: 'input',
        name: 'addRole',
        message: "What role would you like to add?",
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please input the role.');
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
        type: 'input',
        name: 'addRoleId',
        message: "What is the role's Department ID?",
        validate: input => {
            if (input > 0) {
                return true;
            } else {
                console.log('Please input a number.');
                return false;
            }
        }
    }
];

const addDeptQuestions = [
    {
        type: 'input',
        name: 'addDepartment',
        message: "What Department would you like to add?",
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please input a Department.');
                return false;
            }
        }
    }
];

const updateEmployeeQuestions = [
    {
        type: 'list',
        name: 'updateEmployee',
        message: "Who's role would you like to update?",
        choices: [
            // List of employees
        ]
    },
    {
        type: 'list',
        name: 'updateEmployee2',
        message: "What is the employee's new role?",
        choices: [
            'Sales Lead', 
            'Salesperson', 
            'Lead Engineer',
            'Software Engineer',
            'Accountant',
            'Legal Team Lead',
            'Lawyer'
        ]
    }
];
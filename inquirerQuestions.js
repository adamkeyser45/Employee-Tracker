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
        choices: function() {
            let choiceArr = [];
            for (var i=0; i < roles.length; i++) {
                choiceArr.push(roles[i].title)
            }
            return choiceArray;
        }
    },
    {
        type: 'input',
        name: 'addEmployeeManagerId',
        message: "What is the ID of this employee's manager?",
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please input a number.');
                return false;
            }
        }
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
        message: "What is the name of the Department you would like to add?",
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please input a Department Name.');
                return false;
            }
        }
    }
];

const updateEmployeeQuestions = [
    {
        type: 'input',
        name: 'updateEmployee',
        message: "What is the ID of the employee you would like to update?",
        validate: input => {
            if (input > 0) {
                return true;
            } else {
                console.log('Please input a Number.');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'updateEmployee2',
        message: "What is the employee's new role?",
        choices: [
            {value: '1', name: 'Sales Lead'}, 
            {value: '2', name: 'Salesperson'}, 
            {value: '3', name: 'Lead Engineer'},
            {value: '4', name: 'Software Engineer'},
            {value: '5', name: 'Accountant'},
            {value: '6', name: 'Legal Team Lead'},
            {value: '7', name: 'Lawyer'}
        ]
    }
];

module.exports = {
    taskQuestion,
    addEmployeeQuestions,
    addRoleQuestions,
    addDeptQuestions,
    updateEmployeeQuestions
};
const { response } = require('express');

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

module.exports = {
    taskQuestion,
    addDeptQuestions
};
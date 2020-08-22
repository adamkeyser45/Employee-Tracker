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
        -------------------
        -     EMPLOYEE    -
        -      MANAGER    -
        -------------------`
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

        }
    });
};

getEmployees = () => {
    connection.query(`SELECT * FROM employee`, function (err, res) {
        if (err) throw err;
        console.table(res);
        taskChoice();
    });
};

getRoles = () => {
    connection.query(`SELECT * FROM eRole`, function (err, res) {
        if (err) throw err;
        console.table(res);
        taskChoice();
    });
};
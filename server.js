const mysql = require('mysql2');
const express = require('express');

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
//   afterConnection(); <----- Might need this?
});


// afterConnection = () => {
//     connection.end(); <-- Might need this?
// };

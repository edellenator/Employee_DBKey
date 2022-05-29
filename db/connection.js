const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'PeppF@rmMilano2xDC!',
      database: 'employee_db'
    },
    console.log('Connected to the employee database.')
);

module.exports = db;
const db = require('../db/connection');
const cTable = require('console.table');

// Employee class with constructor properties for use later if needed

// All methods on Employee are mySql queries

class Employee {
    constructor (first_name, last_name, manager_id, role_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.manager_id = manager_id;
        this.role_id = role_id;
    };
    
    viewAllEmployees() {
        // Prints all employee table data
        // Adds columns role title, salary, department name, and creates a pseudo table 'm' for manager
        // join role data on role_id
        // join department data on role.department_id
        // join employee pseudo table on employee.manager_id
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, 
        department.name AS department_name, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee 
        LEFT JOIN role ON employee.role_id = role.id 
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON m.id = employee.manager_id`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
            }
            const table = cTable.getTable(rows);
            console.log(`
            ====================================
                      |- EMPLOYEES -|
            ====================================           
            `)
            console.table(table);
            console.log(`
            ====================================
            `)
        })
    };

    makeNewEmployee(first_name, last_name, manager_id, role_id) {
        // Creates a new employee, note manager id can be accepted as null
        const sql = `INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)`
        const params = [first_name, last_name, manager_id, role_id];
        db.query(sql, params, (err, row) => {
            if (err) {
                console.log(err);
            }
            console.log(`

            ========================================================
            ${first_name} ${last_name} has been added as an employee
            ========================================================

            `)
            this.viewAllEmployees();
        })
    };

    updateEmployeeRole(role_id, id) {
        // Update employee's role
        const sql = `UPDATE employee SET role_id = ? 
                 WHERE id = ?`;
        const params = [role_id, id];
        db.query(sql, params, (err, row) => {
            if (err) {
                console.log(err);
            }
            this.viewAllEmployees();
        })
    }
};

module.exports = Employee;
const db = require('../db/connection');
const cTable = require('console.table');

class Employee {
    constructor (first_name, last_name, manager_id, role_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.manager_id = manager_id;
        this.role_id = role_id;
    };
    
    viewAllEmployees() {
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
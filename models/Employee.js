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
        const sql = `SELECT employee.*, 
        role.name AS role_name, 
        manager.name AS manager_name,
        FROM employee 
        JOIN role ON employee.role_id = role.id
        JOIN manager ON employee.manager_id = manager.id`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
            }
            const table = cTable.getTable(rows.json());
            console.log(table);
        })
    };

    makeNewEmployee(name) {
        const sql = `INSERT INTO employee (first_name, last_name) VALUES (?, ?)`

    };

    updateEmployee(id) {
        const sql = `UPDATE department SET name = ? 
                 WHERE id = ?`;
    }
};

module.exports = Employee;
const db = require("../db/connection");
const cTable = require('console.table');

class Role {
    constructor (name, id) {
        this.name = name;
        this.id = id;
    };
    
    viewAllRoles() {
        // Print role table and joins relational data of department_name on department.id
        const sql = `SELECT role.*, department.name As department_name
                    FROM role
                    LEFT JOIN department ON role.department_id = department.id`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log (err);
            }
            const table = cTable.getTable(rows);
            console.log(`
            ====================================
                        |- ROLES -|
            ====================================           
            `);
            console.log(table);
            console.log(`
            ====================================
            `);
        })
        
    };

    makeNewRole(title, salary, department_id) {
        // Makes a new role
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [title, salary, department_id];
        db.query(sql, params, (err, row) => {
            if (err) { console.log(err) }
            console.log(`
            ============================================
            You have added ${title} to the list or Roles
            ============================================
            `);
        })
    };

    updateRoles(salary, id) {
        // Update salary of a role
        const sql = `UPDATE role SET salary = ? 
                 WHERE id = ?`;
        const params = [salary, id];
        db.query(sql, params, (err, row) => {
            if (err) { console.log(err) };
            console.log(`
            ====================================
            Salary has been updated to ${salary}
            ====================================
            `);
        })
        
    }
};

module.exports = Role;
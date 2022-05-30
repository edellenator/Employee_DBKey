const db = require('../db/connection');
const cTable = require('console.table');

// Department class with constructor for later use

// methods on department class are all mysql queries

class Department {
    constructor (name) {
        this.name = name;
    };

    viewAllDepartments() {
        // select all from dept table
        const sql = `SELECT * FROM department`;
        db.query(sql, (err, rows) => {
            
            if (err) {
                console.log(err);
            }
            const table = cTable.getTable(rows);
            console.log(`
            ====================================
                     |- DEPARTMENTS -|
            ====================================           
            `)
            console.table(table);
            console.log(`
            ====================================
            `)
        })
    };

    makeNewDepartment(name) {
        // create new dept
        const sql = `INSERT INTO department (name) VALUES (?)`
        const params = name;
        db.query(sql, params, (err, row) => {
            if (err) {
                console.log(err);
            }
            console.log(`
            ==============================================================
            You have successfully added ${name} to the list of departments
            ==============================================================
            `)
            this.viewAllDepartments()
        })
    };
    // update name of department
    updateDepartment(name, id) {
        const sql = `UPDATE department SET name = ? 
                 WHERE id = ?`;
        const params = [name, id];
        db.query (sql, params, (err, row) => {
            if (err) {
                console.log(err)
            }
            console.log(row)
            this.viewAllDepartments()
        })
    }
    
};

module.exports = Department;
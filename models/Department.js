const db = require('../db/connection');
const cTable = require('console.table');

class Department {
    constructor (name) {
        this.name = name;
    };

    viewAllDepartments() {
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
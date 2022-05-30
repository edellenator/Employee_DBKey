// Import classes
const Department = require('./models/Department');
const department = new Department();
const Employee = require('./models/Employee');
const employee = new Employee();
const Role = require ('./models/Role');
const role = new Role();

// Import npm dependencies
const db = require ('./db/connection');
const cTable = require('console.table');
const inquirer = require ('inquirer');
const ui = new inquirer.ui.BottomBar();

async function returnToMain() {
    let prompt = inquirer.prompt([
        {
            type: 'list',
            name: 'returnToMain',
            message: 'Return to main menu',
            choices: ['X']
        }
    ])

    let answers = await prompt;

    if (answers.returnToMain === 'X') {
        init();
    }
    
};

async function addNewDeptPrompt() {
    console.log(`
    ==========================================
    FOLLOW THE PROMPTS TO ADD A NEW DEPARTMENT
    ==========================================
    `)
    let prompt = inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the Department Name?'
        }
    ])

    let answers = await prompt

    department.makeNewDepartment(answers.deptName)
    returnToMain();
};

async function addNewRolePrompt() {
    let sql = `SELECT * FROM department`; 
    let arr = []
    db.query({sql: sql, rowAsArray:true}, (err, rows, fields) => { 
       for (let i = 0; i < rows.length; i++) {
           let concatRow = rows[i].id + '. ' + rows[i].name;
           arr.push(concatRow)
       }
    });
    console.log(`
    ====================================
    FOLLOW THE PROMPTS TO ADD A NEW ROLE
    ====================================
    `)
    let prompt = inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the Title of the Role?'
        },
        {
            type: "number",
            name: "salary",
            message: "Please Input Salary for the Position"
        },
        {
            type: "list",
            name: "dept",
            message: "Please select the department this role belongs to.",
            choices: arr
        }
    ])
    let answers = await prompt
    deptId = answers.dept.charAt(0)
    role.makeNewRole(answers.title, answers.salary, deptId)
    returnToMain();
};
async function addNewEmployeePrompt() {
    let mgrSql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, 
    department.name AS department_name, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON m.id = employee.manager_id
    WHERE title = "Manager"`;

    let roleSql = `SELECT * FROM role`

    let mgrArr = []

    db.query({sql: mgrSql, rowAsArray:true}, (err, rows, fields) => { 
       for (let i = 0; i < rows.length; i++) {
           let concatRow = `${rows[i].id}. ${rows[i].first_name} ${rows[i].last_name}`;
           mgrArr.push(concatRow)
       }
    });

    let roleArr = []
    db.query({sql: roleSql, rowAsArray:true}, (err, rows, fields) => { 
       for (let i = 0; i < rows.length; i++) {
           let concatRow = rows[i].id + '. ' + rows[i].title;
           roleArr.push(concatRow)
       }
    });

    console.log(`
    ========================================
    FOLLOW THE PROMPTS TO ADD A NEW EMPLOYEE
    ========================================
    `)

    let prompt = inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Employee first name?'
        },
        {
            type: "input",
            name: "last_name",
            message: "Employee last name?"
        },
        {
            type: 'confirm',
            name: 'confirmMgr',
            message: 'Is the employee a Manager?'
        },
        {
            type: "list",
            name: "role",
            message: "Please select the employee role.",
            choices: roleArr
        },
        {
            type: "list",
            name: "manager",
            message: "Please select the employee manager if the employee does not have a manager select null.",
            choices: mgrArr,
            when: ({confirmMgr}) => {
                if (confirmMgr === true) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    ])

    let answers = await prompt
    roleId = answers.role.charAt(0)
    if (answers.confirmMgr === true) {
        employee.makeNewEmployee(answers.first_name, answers.last_name, null, roleId);
        returnToMain();
    }
    else {
        mgrId = answers.manager.charAt(0);
        employee.makeNewEmployee(answers.first_name, answers.last_name, mgrId, roleId);
        returnToMain();
    };

    
};

async function updateDepartmentName() {
    let sql = `SELECT * FROM department`; 
    let arr = []
    db.query({sql: sql, rowAsArray:true}, (err, rows, fields) => { 
        for (let i = 0; i < rows.length; i++) {
            let concatRow = rows[i].id + '. ' + rows[i].name;
            arr.push(concatRow);
        }
    });   
    

    console.log(`
    =====================================================
    FOLLOW THE PROMPTS TO UPDATE THE NAME OF A DEPARTMENT
    =====================================================
    `)
    let prompt = inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmChange',
            message: 'Would you like to update a departments name?',
        },
        {
            type: 'list',
            name: 'dept',
            message: 'Which department would you like to update?',
            choices: arr
        },
        {
            type: "input",
            name: "name",
            message: "Input the updated name"
        }
    ])
    let answers = await prompt
    deptId = answers.dept.charAt(0)
    department.updateDepartment(answers.name, deptId)
    returnToMain();
};

async function updateRoleSalary() {
    let sql = `SELECT * FROM role`; 
    let arr = []
    db.query({sql: sql, rowAsArray:true}, (err, rows, fields) => { 
        for (let i = 0; i < rows.length; i++) {
            let concatRow = rows[i].id + '. ' + rows[i].title;
            arr.push(concatRow);
        }
    });   
    

    console.log(`
    =================================================
    FOLLOW THE PROMPTS TO UPDATE THE SALARY OF A ROLE
    =================================================
    `)
    let prompt = inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmChange',
            message: 'Would you like to update the salary associated with a role?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'Which role would you like to update?',
            choices: arr
        },
        {
            type: "number",
            name: "salary",
            message: "Input the updated salary"
        }
    ])
    let answers = await prompt
    roleId = answers.role.charAt(0)
    role.updateRoles(answers.salary, roleId)
    returnToMain();
};

async function updateEmployeeRole() {
    let empSql = `SELECT * FROM employee`; 
    let empArr = []
    db.query({sql: empSql, rowAsArray:true}, (err, rows, fields) => { 
        for (let i = 0; i < rows.length; i++) {
            let concatRow = rows[i].id + '. ' + rows[i].first_name + ' ' + rows[i].last_name;
            empArr.push(concatRow);
        }
    });   

    let roleSql = `SELECT * FROM role`; 
    let roleArr = []
    db.query({sql: roleSql, rowAsArray:true}, (err, rows, fields) => { 
        for (let i = 0; i < rows.length; i++) {
            let concatRow = rows[i].id + '. ' + rows[i].title;
            roleArr.push(concatRow);
        }
    });    
    

    console.log(`
    =================================================
    FOLLOW THE PROMPTS TO UPDATE THE SALARY OF A ROLE
    =================================================
    `)
    let prompt = inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmChange',
            message: 'Would you like to update the role of an employee?',
        },
        {
            type: 'list',
            name: 'employee',
            message: 'Whose role would you like to update',
            choices: empArr
        },
        {
            type: "list",
            name: "role",
            message: "What is the employees new role?",
            choices: roleArr
        }
    ])
    let answers = await prompt
    roleId = answers.role.charAt(0);
    empId = answers.employee.charAt(0);
    employee.updateEmployeeRole(roleId, empId);
    returnToMain();
};

async function init() {
    let prompt = inquirer.prompt([
        {
            type: 'list',
            name: "menuSelect",
            message: `
            ==============================
         |- CHOOSE AN OPTION FROM THE MENU -|
            ==============================
            `,
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a New Department',
                'Add a New Role',
                'Add a New Employee',
                'Update a Department Name',
                'Update the Salary of a Role',
                'Update the Role of an Employee'
            ]
            
        }
    ])

    let answers = await prompt

    if (answers.menuSelect === 'View All Departments') {
        department.viewAllDepartments();
        returnToMain();
    }
    else if (answers.menuSelect === 'View All Roles') {
        role.viewAllRoles();
        returnToMain();
    }
    else if (answers.menuSelect === 'View All Employees') {
        employee.viewAllEmployees();
        returnToMain();
    }
    else if (answers.menuSelect === 'Add a New Department') {
        addNewDeptPrompt();
    }
    else if (answers.menuSelect === 'Add a New Role') {
        addNewRolePrompt();
    }
    else if (answers.menuSelect === 'Add a New Employee') {
        addNewEmployeePrompt();
    }
    else if (answers.menuSelect === 'Update a Department Name') {
        updateDepartmentName();
    }
    else if (answers.menuSelect === 'Update the Salary of a Role') {
        updateRoleSalary();
    }
    else if (answers.menuSelect === 'Update the Role of an Employee') {
        updateEmployeeRole();
    }
    
}

init();

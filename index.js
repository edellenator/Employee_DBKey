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

async function returnToMain() {
    let prompt = inquirer.prompt([
        {
            type: 'list',
            name: 'returnToMain',
            choices: ['Return to Main Menu']
        }
    ])

    let response = await prompt;

    if (response.returnToMain === 'Return to Main Menu') {
        init();
    }
    
}
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

    let response = await prompt
    console.log(response.menuSelect)

    if (response.menuSelect === 'View All Departments') {
        department.viewAllDepartments();
        returnToMain();
    }
    else if (response.menuSelect === 'View All Roles') {
        role.viewAllRoles();
        returnToMain();
    }
    
}

init();

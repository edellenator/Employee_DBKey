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






var test = role.viewAllRoles();

console.log(test);

// async function mainMenu() {
//     let response = await inquirer.prompt([
//         {
//             type: 'input',
//             name: "email",
//             message: "input an email"
//         }
//     ])

//     console.log(response)
// }

// mainMenu().then(response => {
//     if (response === )
// })

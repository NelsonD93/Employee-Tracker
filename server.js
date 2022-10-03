import connection from './config/connections.js'
import inquirer from 'inquirer'
import 'console.table'

const dbArray = [];

function choices() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'actions',
            message: 'Hello, what action would you like to take?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a department',
                'Add a role',
                'Update employee role',
                'Delete an employee',
                'EXIT'
            ]
        }
    ]).then(function (answers) {
     switch(answers.actions) {
        case 'View all employees':
            viewEmployees()
            break;
     }
    })
}

function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res.length + ' employees found!');
        console.table('All Employees:', res);
        choices();
    })
};
choices()
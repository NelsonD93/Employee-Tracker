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
                'EXIT'
            ],
            pageSize: 8,
            loop: false
        }
    ]).then(function (answers) {
        switch (answers.actions) {
            case 'View all employees':
                viewEmployees()
                break;
            case 'View all departments':
                viewDepartments()
                break;
            case 'View all roles':
                viewRoles()
                break;
            case 'Add an employee':
                addEmployee()
                break;
            case 'Add a department':
                addDepartments()
                break;
            case 'Add a role':
                addRoles()
                break;
            case 'Update employee role':
                updateEmployee()
                break;
            default:
                exit()
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
function viewDepartments() {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        choices()
    })
}

function viewRoles() {
    const query = 'SELECT * FROM roles'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table('All roles', res)
        choices()
    })
}

function addDepartments() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the department you would like to add?'
        }
    ]).then((answers) => {
        var query = 'INSERT INTO department(department_name) VALUES (?)'
        connection.query(query, answers.departmentName, (err, res) => {
            if (err) throw err
            console.log('Added department', res)
            choices()
        })
    })
}

function addRoles() {
    connection.query('SELECT * FROM department;', (err, res) => {

        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the title of the role you would like to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role you would like to add?'
            },
            {
                type: 'list',
                name: 'deptID',
                message: 'Which department would you like to add this role to?',
                choices: res.map(d => {
                    return {
                        name: d.department_name,
                        value: d.department_id
                    }
                })
            }
        ]).then((answers) => {
            var query = 'INSERT INTO roles(title, salary, dept_id) VALUES (?,?,?)'
            connection.query(query, [answers.roleName, answers.salary, answers.deptID], (err, res) => {
                if (err) throw err
                console.log('Added role', res)
                choices()
            })
        })
    })
}

function addEmployee() {
    connection.query('SELECT * FROM roles;', (err, res1) => {
        connection.query('SELECT * FROM employee;', (err, res2) => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the first name of the employee you would like to add?'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the last name of the employee you would like to add?'
                },
                {
                    type: 'list',
                    name: 'roleID',
                    message: 'Which role would you like to add this role employee?',
                    choices: res1.map(r => {
                        return {
                            name: r.title,
                            value: r.role_id
                        }
                    })
                },
                {
                    type: 'list',
                    name: 'managerID',
                    message: 'Which manager would you like to assign to this employee?',
                    choices: res2.map(e => {
                        return {
                            name: e.first_name + ' ' + e.last_name,
                            value: e.employee_id
                        }
                    })
                }
            ]).then((answers) => {
                var query = 'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)'
                connection.query(query, [answers.firstName, answers.lastName, answers.roleID, answers.managerID], (err, res) => {
                    if (err) throw err
                    console.log('Added employee', res)
                    choices()
                })
            })
        })
    })
}

function updateEmployee() {
    connection.query('SELECT * FROM roles;', (err, res1) => {
        connection.query('SELECT * FROM employee;', (err, res2) => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeID',
                    message: 'Which employee would you like to update role?',
                    choices: res2.map(e => {
                        return {
                            name: e.first_name + ' ' + e.last_name,
                            value: e.employee_id
                        }
                    })
                },
                {
                    type: 'list',
                    name: 'roleID',
                    message: "What is the employee's new role?",
                    choices: res1.map(r => {
                        return {
                            name: r.title,
                            value: r.role_id
                        }
                    })
                },
                
            ]).then((answers) => {
                var query = 'UPDATE employee SET role_id=(?) WHERE employee_id=(?)'
                connection.query(query, [answers.roleID,answers.employeeID], (err, res) => {
                    if (err) throw err
                    console.log('Updated employee role', res)
                    choices()
                })
            })
        })
    })
}


function exit() {
    process.exit()
}
choices()
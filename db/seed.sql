INSERT INTO department(department_id, department_name)
VALUES 
(001, 'Sales'),
(002, 'Marketing'),
(003, 'Legal'),
(004, 'Human Resources'),
(005, 'Finance');

INSERT INTO roles(role_id, title, salary, dept_id)
VALUES 
(22, 'Account Manager', 75000, 001),
(33, 'Marketing Specialist', 65000, 002),
(44, 'Legal Advisor', 100000, 003 ),
(55, 'HR Generalist', 50000, 004),
(66, 'AP Specialist', 62000, 005);

INSERT INTO employee(employee_id, first_name, last_name, role_id, manager_id)
VALUES 
(501, 'Brook', 'Longbottom', 66, null),
(234, 'Jim', 'Smith', 22, null),
(102, 'Bob', 'Brown', 33, 501),
(402, 'Michael', 'Scott', 44, null),
(409, 'Alice', 'White', 55, 501);

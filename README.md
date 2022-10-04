# Employee-Tracker

## Description
In this application, you are able to use your command-line to navigate a business database. The database allows for viewing and adding of employees and their departments. The application uses inquirer, mysql2, and console.table. 

## Installation
In order to use your database, clone the repo down to your local. From there, run npm install in order to install the dependencies listed in package.json. To begin using the application, input 'npm start' into the command-line without the quotes. Just answer all prompts with your desired actions.

### Existing Tables
The database uses the following tables: 

Department:
department_id,
department_name

Roles:
role_id,
title,
salary,
dept_id

Employee:
employee_id, 
first_name,
last_name,
role_id,
manager_id

[Video Walkthrough](https://github.com/NelsonD93/Employee-Tracker)
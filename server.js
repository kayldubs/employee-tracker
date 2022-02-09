const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");
const express = require('express');

//connect server 
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//create database 
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password:'Kdubbies3000!',
    database: 'employeesDB'
},
console.log('Connected to the employee database.')
);

//runs the program as parent function 
runApp();


function runApp() {
    inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "Would you like to do?",
      choices: [
        "View Employees",
        "View Employees by Department",
        "Add Employee",
        "Remove Employees",
        "Update Employee Role",
        "Add Role",
        "End"]
    })
    .then(function ({ task }) {   //funnels in other functions to be defined when selected
        switch (task) {
          case "View Employees":
            viewEmployee();
            break;
          case "View Employees by Department":
            viewEmployeeByDepartment();
            break;
          case "Add Employee":
            addEmployee();
            break;
          case "Remove Employees":
            removeEmployees();
            break;
          case "Update Employee Role":
            updateEmployeeRole();
            break;
          case "Add Role":
            addRole();
            break;
          case "End":
            db.end();
            break;
        }
      });
}
//shows all employees 
function viewEmployee() {
    console.log("Viewing employees\n");
  
    var query =
    db.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Employees viewed!\n");
  
      runApp();
    });
  }
  //filter by department 
  function viewEmployeeByDepartment() {
    console.log("Viewing employees by department\n");
    var query =
    db.query(query, function (err, res) {
      if (err) throw err;
      const departmentChoices = res.map(data => ({
        value: data.id, name: data.name
      }));
      console.table(res);
      console.log("Department view succeed!\n");
      promptDepartment(departmentChoices);
    });
  }
//department choices
  function promptDepartment(departmentChoices) {

    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Select a department",
          choices: departmentChoices
        }
      ])
      .then(function (answer) {
        console.log("answer ", answer.departmentId);
  
        var query =
        db.query(query, answer.departmentId, function (err, res) {
          if (err) throw err;
  
          console.table("response ", res);
          console.log(res.affectedRows + "Employees are viewed!\n");
  
          runApp();
        });
      });
  }
  // adds empolyee and defines the needed information for input
  function addEmployee() {
    console.log("Inserting an employee!")
  
    var query =
  
    db.query(query, function (err, res) {
      if (err) throw err;
  
      const roleChoices = res.map(({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`
      }));
  
      console.table(res);
      console.log("RoleToInsert!");
  
      promptInsert(roleChoices);
    });
  }
  //Prompts for user to answer when adding a new employee
  function promptInsert(roleChoices) {
  
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "roleId",
          message: "What is the employee's job title?",
          choices: roleChoices
        },
      ])
      .then(function (answer) {
        console.log(answer);
        var query = `INSERT INTO employee SET ?`
        db.query(query,
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.roleId,
            manager_id: answer.managerId,
          },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log(res.insertedRows + "Inserted successfully!\n");
  
            runApp();
          });
      });
  }
  
  function removeEmployees() {
    console.log("Deleting an employee");
    var query =
    db.query(query, function (err, res) {
      if (err) throw err;
      const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${id} ${first_name} ${last_name}`
      }));
      console.table(res);
      console.log("ArrayToDelete!\n");
      promptDelete(deleteEmployeeChoices);
    });
  }
  
  function promptDelete(deleteEmployeeChoices) {
  
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select what team member are you deleting?",
          choices: deleteEmployeeChoices
        }
      ])
      .then(function (answer) {
        var query = `DELETE FROM employee WHERE ?`;
        db.query(query, { id: answer.employeeId }, function (err, res) {
          if (err) throw err;
          console.table(res);
          console.log(res.affectedRows + "Deleted!\n");
          runApp();
        });
      });
  }
  
  function updateEmployeeRole() { 
    employeeArray();
  }
  
  function employeeArray() {
    console.log("Updating an employee");
    var query =
    db.query(query, function (err, res) {
      if (err) throw err;
      const employeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${first_name} ${last_name}`      
      }));
      console.table(res);
      console.log("employeeArray To Update!\n")
      roleArray(employeeChoices);
    });
  }
  
  function roleArray(employeeChoices) {
    console.log("Updating an role");
    var query =
      `SELECT r.id, r.title, r.salary 
    FROM role r`
    let roleChoices;

    db.query(query, function (err, res) {
      if (err) throw err;
  
      roleChoices = res.map(({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`      
      }));
      console.table(res);
      console.log("roleArray to Update!\n")
  
      promptEmployeeRole(employeeChoices, roleChoices);
    });
  }
  
  function promptEmployeeRole(employeeChoices, roleChoices) {
  
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Who is the team member that you want to update?",
          choices: employeeChoices
        },
        {
          type: "list",
          name: "roleId",
          message: "What role is changing?",
          choices: roleChoices
        },
      ])
      .then(function (answer) {
  
        var query = `UPDATE employee SET role_id = ? WHERE id = ?`
        db.query(query,
          [ answer.roleId,  
            answer.employeeId
          ],
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log(res.affectedRows + "Updated successfully!");
  
            runApp();
          });
      });
  }
  
  function addRole() {
  
    var query =
  
    db.query(query, function (err, res) {
      if (err) throw err;
      const departmentChoices = res.map(({ id, name }) => ({
        value: id, name: `${id} ${name}`
      }));
  
      console.table(res);
      console.log("Department array!");
  
      promptAddRole(departmentChoices);
    });
  }
  
  function promptAddRole(departmentChoices) {
  
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleTitle",
          message: "Role title?"
        },
        {
          type: "input",
          name: "roleSalary",
          message: "Role Salary"
        },
        {
          type: "list",
          name: "departmentId",
          message: "Department?",
          choices: departmentChoices
        },
      ])
      .then(function (answer) {
  
        var query = `INSERT INTO role SET ?`
  
        db.query(query, {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentId
        },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log("Role Inserted!");
  
            runApp();
          });
  
      });
  }
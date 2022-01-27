INSERT INTO department (name)
VALUES 
("Marketing"),
("Engineering"), 
("Finance"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES
 ("Marketing Lead", 100000, 1),
("Lead Engineer", 150000, 2),
 ("Software Engineer", 120000, 2),
 ("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Jane", "Doe", 1, 3),
("Jon", "Doe", 2, 1),
("Kaylee", "Stevens", 3, null),
 ("Traivon", "Smith", 4, 3),
 ("Brianna", "Ferraro", 5, null),
("Tris", "Bogges", 2, null),
("Lauryn", "Vega", 4, 7),
("Justus", "Pea", 1, 2);
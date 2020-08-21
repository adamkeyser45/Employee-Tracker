INSERT INTO department (deptName)
VALUES 
    ('Sales'),
    ('Engineering'), 
    ('Finance'), 
    ('Legal')
;

INSERT INTO role (title, salary, dept_id)
VALUES 
    ('Sales Lead', 100000, 1), 
    ('Salesperson', 80000, 1), 
    ('Lead Engingeer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4)
;

INSERT INTO employee (firstName, lastName, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, 3),
    ('Mike', 'Chan', 1, 1),
    ('Ashley', 'Rodriguez', 2, NULL),
    ('Kevin', 'Tupik', 2, 3),
    ('Malia', 'Brown', 3, NULL),
    ('Sarah', 'Lourd', 4, NULL),
    ('Tom', 'Allen', 4, 6),
    ('Tammer', 'Galal', 1, 4),
;
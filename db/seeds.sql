INSERT INTO department (deptName)
VALUES 
    ('Sales'),
    ('Engineering'), 
    ('Finance'), 
    ('Legal')
;

INSERT INTO eRole (title, salary, department_id)
VALUES 
    ('Sales Lead', 100000, 1), 
    ('Salesperson', 80000, 1), 
    ('Lead Engingeer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4)
;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 3, null),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, 1),
    ('Kevin', 'Tupik', 4, 3),
    ('Malia', 'Brown', 5, 3),
    ('Sarah', 'Lourd', 6, 6),
    ('Tom', 'Allen', 7, 6),
    ('Tammer', 'Galal', 4, 2)
;
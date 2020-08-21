DROP DATABASE IF EXISTS manager_db;
CREATE DATABASE manager_db;
USE manager_db;

CREATE TABLE department(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    deptName VARCHAR(30) NOT NULL
);

CREATE TABLE eRole(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES eRole(id)
    -- CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES id
);

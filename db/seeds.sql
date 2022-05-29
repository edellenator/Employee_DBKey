INSERT INTO department (name) 
VALUES  ("Engineering")


INSERT INTO role (title, salary, department_id) 
VALUES  ("Manager", 125000, 1), 
        ("Engineer", 120000, 1), 
        ("Junior Engineer", 100000, 1), 
        ("Intern", 75000, 1);

INSERT INTO employee (`first_name`, `last_name`, `role_id`) 
VALUES  ('Daniella', 'Dell', '1');

INSERT INTO employee (first_name, last_name, manager_id, role_id) 
VALUES  ('Erik', 'Dell', '1', '2'),
        ('Matilda', 'Dell', '1', '3'),
        ('Yojimbo', 'Dell', '1', '4');

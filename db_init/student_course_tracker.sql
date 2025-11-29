DROP DATABASE IF EXISTS student_course_tracker;
CREATE DATABASE student_course_tracker;
USE student_course_tracker;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    description TEXT,
    instructor VARCHAR(100)
);

CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    grade CHAR(2),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

INSERT INTO students (first_name, last_name, email) VALUES
('Alice', 'Smith', 'alice.smith@example.com'),
('Bob', 'Johnson', 'bob.johnson@example.com'),
('Charlie', 'Brown', 'charlie.brown@example.com'),
('David', 'Williams', 'david.williams@example.com'),
('Eva', 'Jones', 'eva.jones@example.com'),
('Frank', 'Garcia', 'frank.garcia@example.com'),
('Grace', 'Martinez', 'grace.martinez@example.com'),
('Hannah', 'Rodriguez', 'hannah.rodriguez@example.com'),
('Ian', 'Lopez', 'ian.lopez@example.com'),
('Jane', 'Gonzalez', 'jane.gonzalez@example.com'),
('Kevin', 'Wilson', 'kevin.wilson@example.com'),
('Laura', 'Anderson', 'laura.anderson@example.com'),
('Mike', 'Thomas', 'mike.thomas@example.com'),
('Nina', 'Taylor', 'nina.taylor@example.com'),
('Oscar', 'Moore', 'oscar.moore@example.com'),
('Paula', 'Jackson', 'paula.jackson@example.com'),
('Quinn', 'Martin', 'quinn.martin@example.com'),
('Rachel', 'Lee', 'rachel.lee@example.com'),
('Steve', 'Perez', 'steve.perez@example.com'),
('Tina', 'Thompson', 'tina.thompson@example.com'),
('Uma', 'White', 'uma.white@example.com'),
('Victor', 'Harris', 'victor.harris@example.com'),
('Wendy', 'Sanchez', 'wendy.sanchez@example.com'),
('Xavier', 'Clark', 'xavier.clark@example.com'),
('Yara', 'Lewis', 'yara.lewis@example.com'),
('Zane', 'Robinson', 'zane.robinson@example.com'),
('Amy', 'Walker', 'amy.walker@example.com'),
('Brian', 'Hall', 'brian.hall@example.com'),
('Cathy', 'Allen', 'cathy.allen@example.com'),
('Derek', 'Young', 'derek.young@example.com');

INSERT INTO courses (name, code, description, instructor) VALUES
('Introduction to Computer Science', 'CS101', 'Basics of computer science.', 'Dr. John Doe'),
('Data Structures', 'CS102', 'Learn about data structures and algorithms.', 'Prof. Jane Smith'),
('Database Systems', 'CS103', 'Introduction to relational databases.', 'Dr. Emily Davis'),
('Operating Systems', 'CS104', 'Learn OS concepts.', 'Dr. Mark Lee'),
('Software Engineering', 'CS105', 'Principles of software engineering.', 'Prof. Sarah Johnson');

INSERT INTO enrollments (student_id, course_id) VALUES
(1,1),(1,2),(1,3),
(2,1),(2,3),(2,4),
(3,2),(3,3),
(4,1),(4,5),
(5,2),(5,3),
(6,1),(6,2),(6,4),
(7,3),(7,5),
(8,1),(8,2),(8,3),
(9,4),(9,5),
(10,1),(10,3),
(11,2),(11,4),
(12,3),(12,5),
(13,1),(13,2),
(14,2),(14,3),
(15,3),(15,4),(15,5),
(16,1),(16,5),
(17,2),(17,4),
(18,1),(18,3),(18,5),
(19,2),(19,3),
(20,1),(20,4),
(21,3),(21,5),
(22,1),(22,2),(22,5),
(23,4),(23,5),
(24,1),(24,3),
(25,2),(25,4),(25,5),
(26,1),(26,3),
(27,2),(27,5),
(28,1),(28,2),(28,3),
(29,4),(29,5),
(30,1),(30,5);

UPDATE enrollments
SET grade = CASE
    WHEN RAND() < 0.2 THEN 'A'
    WHEN RAND() < 0.4 THEN 'B'
    WHEN RAND() < 0.6 THEN 'C'
    WHEN RAND() < 0.8 THEN 'D'
    ELSE 'F'
END;
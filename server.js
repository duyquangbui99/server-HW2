require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const users = [{
    id: 1,
    username: "admin",
    password: "admin123"
}];

const JWT_SECRET = process.env.JWT_SECRET;


const students = [
    { id: 1, name: "Shane", email: "shane@gmail.com" },
    { id: 2, name: "John", email: "john@gmail.com" },
    { id: 3, name: "Ariel", email: "ariel@gmail.com" },
];

const courses = [
    { id: 4, title: "HTML", description: "description" },
    { id: 5, title: "CSS", description: "description" },
    { id: 6, title: "Java", description: "description" },
];

const enrollments = [{ studentId: 1, courseId: 4 }];

// Register a new user
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (users.find((user) => user.username === username)) {
        return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);

    res.status(201).json({ message: "User registered successfully", user: newUser });
});

// Log in and get JWT
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username && user.password === password);
    if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "15m" });

    res.json({ message: "Login successful", token });
});

/// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Token required" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid or expired token" });

        req.user = user;
        next();
    });
};


// Protected Route: Get Students (Requires Authentication)
app.get("/students", authenticateToken, (req, res) => {
    res.json({ students });
});

// Add a new student (Requires Authentication)
app.post("/students", authenticateToken, (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    const newStudent = { id: students.length + 1, name, email };
    students.push(newStudent);

    res.status(201).json({ message: "Student added successfully", student: newStudent });
});

// Get courses (Public Route)
app.get("/courses", (req, res) => {
    res.json({ courses });
});

// Enroll a student in a course (Requires Authentication)
app.post("/enrollments", authenticateToken, (req, res) => {
    const { studentId, courseId } = req.body;

    if (!students.some((s) => s.id === studentId)) {
        return res.status(400).json({ error: "Invalid student ID" });
    }

    if (!courses.some((c) => c.id === courseId)) {
        return res.status(400).json({ error: "Invalid course ID" });
    }

    enrollments.push({ studentId, courseId });
    res.status(201).json({ message: "Enrollment successful" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

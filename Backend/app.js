const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample tasks data
const taskCollection = [
  {
    id: 1,
    name: "Task 1",
    details: "Details of Task 1",
    deadline: "2024-06-25",
  },
  {
    id: 2,
    name: "Task 2",
    details: "Details of Task 2",
    deadline: "2024-06-26",
  },
  {
    id: 3,
    name: "Task 3",
    details: "Details of Task 3",
    deadline: "2024-06-26",
  },
  {
    id: 4,
    name: "Task 4",
    details: "Details of Task 4",
    deadline: "2024-06-26",
  },
  {
    id: 5,
    name: "Task 5",
    details: "Details of Task 5",
    deadline: "2024-06-26",
  },
];

// Route to render HTML page with tasks
app.get("/", (req, res) => {
  const tasksList = taskCollection
    .map(
      (task) => `
    <div>
      <h3>Name: ${task.name}</h3>
      <p>Details: ${task.details}</p>
      <p>Deadline: ${task.deadline}</p>
    </div>
  `
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Task Manager</title>
    </head>
    <body>
      <h1>Task Manager</h1>
      ${tasksList}
    </body>
    </html>
  `;

  res.send(html);
});

// API routes for tasks
app.get("/api/tasks", (req, res) => {
  res.json(taskCollection);
});

app.post("/api/tasks", (req, res) => {
  const { name, details, deadline } = req.body;
  const newTask = { id: taskCollection.length + 1, name, details, deadline };
  taskCollection.push(newTask);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, details, deadline } = req.body;
  const taskToUpdate = taskCollection.find((task) => task.id === id);
  if (!taskToUpdate) {
    return res.status(404).json({ message: "Task not found" });
  }
  taskToUpdate.name = name;
  taskToUpdate.details = details;
  taskToUpdate.deadline = deadline;
  res.json(taskToUpdate);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = taskCollection.findIndex((task) => task.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  const deletedTask = taskCollection.splice(index, 1);
  res.json(deletedTask[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Initialize with some sample tasks
let tasks = [
  {
    id: uuidv4(),
    title: 'Implement Authentication',
    description: 'Add user authentication using JWT',
    status: 'todo',
    priority: 'high',
    dueDate: '2024-03-20',
    isAIAssisted: false
  },
  {
    id: uuidv4(),
    title: 'Design Dashboard',
    description: 'Create wireframes for the main dashboard',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2024-03-25',
    isAIAssisted: true
  },
  {
    id: uuidv4(),
    title: 'API Documentation',
    description: 'Write comprehensive API documentation',
    status: 'done',
    priority: 'low',
    dueDate: '2024-03-15',
    isAIAssisted: false
  }
];

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');
  
  // Send initial tasks to the connected client
  socket.emit('initialTasks', tasks);

  socket.on('updateTask', (task) => {
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      io.emit('taskUpdated', task);
    }
  });

  socket.on('addTask', (task) => {
    const newTask = { ...task, id: uuidv4() };
    tasks.push(newTask);
    io.emit('taskAdded', newTask);
  });

  socket.on('removeTask', (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
    io.emit('taskRemoved', taskId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// REST API endpoints
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = { ...req.body, id: uuidv4() };
  tasks.push(newTask);
  io.emit('taskAdded', newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const index = tasks.findIndex(t => t.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...req.body, id: taskId };
    io.emit('taskUpdated', tasks[index]);
    res.json(tasks[index]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  tasks = tasks.filter(task => task.id !== taskId);
  io.emit('taskRemoved', taskId);
  res.status(204).send();
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
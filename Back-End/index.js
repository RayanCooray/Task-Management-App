const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const taskController = require('./controllers/taskController');
const authenticate = require('./middleware/authenticate');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/BackEndDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection failed:', err));

app.post('/register', userController.register);
app.post('/login', userController.login);

app.post('/tasks', authenticate, taskController.createTask);
app.put('/tasks/:id', authenticate, taskController.updateTask);
app.delete('/tasks/:id', authenticate, taskController.deleteTask);

app.get('/', (req, res) => res.send('Hello, this is the API!'));

app.listen(3000, () => console.log('Server is running on port 3000'));

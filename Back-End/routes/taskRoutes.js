const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {
    createTask,
    updateTask,
    deleteTask,
    getTasks
} = require('../controllers/taskController');
router.post('/tasks', authenticate, createTask);
router.put('/tasks/:id', authenticate, updateTask);
router.delete('/tasks/:id', authenticate, deleteTask);
router.get('/tasks', authenticate, getTasks);

module.exports = router;

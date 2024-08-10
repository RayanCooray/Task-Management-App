const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticate = require('../middleware/authenticate');

router.post('/tasks', authenticate, taskController.createTask);
router.put('/tasks/:id', authenticate, taskController.updateTask);
router.delete('/tasks/:id', authenticate, taskController.deleteTask);

module.exports = router;

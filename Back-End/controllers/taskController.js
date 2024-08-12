const Task = require('../models/task');

exports.createTask = async (req, res) => {
    const { title, description, priority } = req.body;
    const userId = req.userId;

    try {
        const newTask = new Task({
            user: userId,
            title,
            description,
            priority
        });

        await newTask.save();
        res.status(201).json({
            message: 'Task created successfully',
            task: newTask
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to create task',
            error: err.message
        });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, isCompleted } = req.body;
    const userId = req.userId;

    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, user: userId },
            { title, description, priority, isCompleted },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }

        res.status(200).json({
            message: 'Task updated successfully',
            task: updatedTask
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to update task',
            error: err.message
        });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const task = await Task.findOne({ _id: id, user: userId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }

        if (!task.isCompleted) {
            return res.status(400).json({ message: 'Task must be completed before it can be deleted' });
        }

        await Task.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Task deleted successfully',
            task
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to delete task',
            error: err.message
        });
    }
};

exports.getTasks = async (req, res) => {
    const userId = req.userId;

    try {
        const tasks = await Task.find({ user: userId });
        res.status(200).json({ tasks });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to retrieve tasks',
            error: err.message
        });
    }
};

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/BackEndDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection failed:', err));

app.use('/api', userRoutes);
app.use('/api', taskRoutes);

app.listen(3000, () => console.log('Server is running on port 3000'));

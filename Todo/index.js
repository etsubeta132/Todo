const express = require('express');
const mongoose = require('mongoose');
const Task = require('./task.js');
const connectDB = require('./db');
const { v4: uuidv4 } = require('uuid');



const app = express();
const PORT = 3001;

app.use(express.json());



connectDB()


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});




app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById({ id })
        res.json(task);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/tasks', async (req, res) => {
    const { title, desciption } = req.body;
    const id = uuidv4(); 

    try {
        const newTask = new Task({
            id,
            title,
            desciption
            
        });

        await newTask.save();
        res.status(201).json(newTask);
        console.log("added", newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const { title, desciption } = req.body;
  
    try {
      const updatedTask = await Task.findOneAndUpdate(
        { id },
        {
          title,
          desciption,
        },
        { new: true }
      );
  
      if (!updatedTask) {
        console.log("Task not found");
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.json(updatedTask);
      console.log('Task updated successfully:', updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.delete('/tasks/:id', async (req, res) => {
    
    const { id } = req.params;
    console.log(id)
    
    try {
      const removeTask = await Task.findOneAndDelete({ id });
  
      if (!removeTask) {
        console.log("task not found");
        return res.status(404).json({ error: 'task not found' });
      }
  
      res.json(removeTask);
      console.log('task updated successfully:', removeTask);
    } catch (error) {
      console.error('Error removing task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

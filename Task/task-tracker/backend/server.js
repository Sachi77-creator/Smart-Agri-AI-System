const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/taskTrackerDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const TaskSchema = new mongoose.Schema({
title:String,
description:String,
status:String
});

const Task = mongoose.model("Task",TaskSchema);

// CREATE TASK
app.post("/tasks", async(req,res)=>{
const task = new Task(req.body);
await task.save();
res.json(task);
});

// READ TASKS
app.get("/tasks", async(req,res)=>{
const tasks = await Task.find();
res.json(tasks);
});

// UPDATE TASK
app.put("/tasks/:id", async(req,res)=>{
const task = await Task.findByIdAndUpdate(
req.params.id,
req.body,
{ returnDocument:"after"}
);
res.json(task);
});

// DELETE TASK
app.delete("/tasks/:id", async(req,res)=>{
await Task.findByIdAndDelete(req.params.id);
res.json({message:"Task Deleted"});
});

app.listen(5000,()=>{
console.log("Server running on port 5000");
});
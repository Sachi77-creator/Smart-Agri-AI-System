import React, { useState } from "react";
import axios from "axios";

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/tasks", {
      title,
      description,
      status: "Pending",
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  return (
    <div style={styles.form}>
      <h2 style={styles.heading}>Add Task</h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.textarea}
      />

      <button onClick={addTask} style={styles.button}>
        Add Task
      </button>
    </div>
  );
}

const styles = {
  form: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },

  heading: {
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default TaskForm;
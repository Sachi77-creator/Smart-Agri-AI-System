import React, { useState } from "react";
import axios from "axios";

function TaskList({ tasks, fetchTasks }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id) => {
    await axios.put(`http://localhost:5000/tasks/${id}`, {
      title: editTitle,
      description: editDescription,
      status: editStatus,
    });

    setEditingId(null);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={styles.container}>
      <h2>Task List</h2>

      {tasks.length === 0 && <p>No matching tasks found</p>}

      {tasks.map((task) => (
        <div key={task._id} style={styles.card}>
          {editingId === task._id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={styles.input}
              />

              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                style={styles.textarea}
              />

              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                style={styles.select}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>

              <button onClick={() => saveEdit(task._id)} style={styles.save}>
                Save
              </button>

              <button onClick={cancelEdit} style={styles.cancel}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <p>
                Status:{" "}
                <span
                  style={{
                    color:
                      task.status === "Pending" ? "red" : "green",
                  }}
                >
                  {task.status}
                </span>
              </p>

              <button onClick={() => startEdit(task)} style={styles.edit}>
                Edit
              </button>

              <button onClick={() => deleteTask(task._id)} style={styles.delete}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
  },

  card: {
    background: "#f9f9f9",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
  },

  input: {
    width: "100%",
    marginBottom: "5px",
  },

  textarea: {
    width: "100%",
    marginBottom: "5px",
  },

  select: {
    width: "100%",
    marginBottom: "5px",
  },

  edit: {
    background: "#ffc107",
    border: "none",
    marginRight: "5px",
  },

  delete: {
    background: "#dc3545",
    color: "white",
    border: "none",
  },

  save: {
    background: "#28a745",
    color: "white",
    border: "none",
  },

  cancel: {
    background: "gray",
    color: "white",
    border: "none",
  },
};

export default TaskList;
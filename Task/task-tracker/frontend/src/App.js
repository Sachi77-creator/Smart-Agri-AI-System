import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔍 Filter tasks based on search
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.app}>
      <h1 style={styles.title}>🚀 Task Tracker Dashboard</h1>

      {/* 🔍 SEARCH BAR */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.container}>
        <TaskForm fetchTasks={fetchTasks} />
        <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
      </div>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "Arial",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    minHeight: "100vh",
    padding: "20px",
  },

  title: {
    textAlign: "center",
    color: "white",
    marginBottom: "20px",
  },

  searchBox: {
    textAlign: "center",
    marginBottom: "20px",
  },

  searchInput: {
    width: "300px",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  },
};

export default App;
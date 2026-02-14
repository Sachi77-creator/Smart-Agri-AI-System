let tasks = {};
const container = document.getElementById("taskContainer");
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const filter = document.getElementById("filter");
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  displayTasks();
} else {
  fetch("tasks.json")
    .then(res => res.json())
    .then(data => {
      tasks = data;
      saveTasks();
      displayTasks();
    });
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function displayTasks() {
  container.innerHTML = "";
  const filterVal = filter.value;
  Object.keys(tasks).forEach(id => {
    const task = tasks[id];
    if (
      filterVal === "completed" && !task.completed ||
      filterVal === "pending" && task.completed
    ) return;
    const card = document.createElement("div");
    card.className = "task-card";
    const text = document.createElement("div");
    text.className = "task-text";
    if (task.completed) text.classList.add("completed");
    text.innerText = task.text;
    const completeBtn = document.createElement("button");
    completeBtn.innerText = "✔";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => toggleComplete(id);
    const editBtn = document.createElement("button");
    editBtn.innerText = "✎";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editTask(id);
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "✖";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTask(id);

    card.appendChild(text);
    card.appendChild(completeBtn);
    card.appendChild(editBtn);
    card.appendChild(deleteBtn);

    container.appendChild(card);
  });
}
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  const id = "t" + Date.now();
  tasks[id] = { text, completed: false };
  input.value = "";
  saveTasks();
  displayTasks();
});
function toggleComplete(id) {
  tasks[id].completed = !tasks[id].completed;
  saveTasks();
  displayTasks();
}
function editTask(id) {
  const newText = prompt("Edit task:", tasks[id].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[id].text = newText.trim();
    saveTasks();
    displayTasks();
  }
}

function deleteTask(id) {
  delete tasks[id];
  saveTasks();
  displayTasks();
}
filter.addEventListener("change", displayTasks);

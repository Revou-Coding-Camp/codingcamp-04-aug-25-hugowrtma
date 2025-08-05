const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const filterBtn = document.getElementById('filterBtn');
const taskTableBody = document.getElementById('taskTableBody');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(list = tasks) {
  taskTableBody.innerHTML = '';
  if (list.length === 0) {
    taskTableBody.innerHTML = '<tr><td colspan="4">No task found</td></tr>';
    return;
  }

  list.forEach((task, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.date}</td>
      <td>${task.completed ? 'Completed' : 'Pending'}</td>
      <td>
        <button class="btn-complete" onclick="toggleComplete(${index})">✔</button>
        <button class="btn-delete" onclick="deleteTask(${index})">🗑</button>
      </td>
    `;
    taskTableBody.appendChild(row);
  });
}

function addTask() {
  const name = taskInput.value.trim();
  const date = dateInput.value;

  if (!name || !date) {
    alert("Please enter a task and select a date.");
    return;
  }

  tasks.push({ name, date, completed: false });
  saveToLocalStorage();
  taskInput.value = '';
  dateInput.value = '';
  renderFilteredTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveToLocalStorage();
  renderFilteredTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveToLocalStorage();
  renderFilteredTasks();
}

function deleteAllTasks() {
  if (confirm("Delete all tasks?")) {
    tasks = [];
    saveToLocalStorage();
    renderFilteredTasks();
  }
}

function renderFilteredTasks() {
  const filter = filterBtn.value;

  if (filter === 'all') {
    renderTasks(tasks);
  } else {
    const filtered = tasks.filter(task =>
      filter === 'completed' ? task.completed : !task.completed
    );
    renderTasks(filtered);
  }
}

// Event listeners
addBtn.addEventListener('click', addTask);
deleteAllBtn.addEventListener('click', deleteAllTasks);
filterBtn.addEventListener('change', renderFilteredTasks);

// Initial render
renderFilteredTasks();

// Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add Task
  form.addEventListener('submit', addTask);
  // Remove Task Event
  taskList.addEventListener('click', removeTask);
  // Clear Task Event
  clearBtn.addEventListener('click', clearTasks);
  // Filter Tasks Event
  filter.addEventListener('keyup', filterTasks);
}

// Functions

// Get Tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    // Create li element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create Text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add Class to link
    link.className = 'delete-item secondary-content';
    // Add Icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === '') {
    alert('Add a task')
  }

  // Create li element
  const li = document.createElement('li');
  // Add Class
  li.className = 'collection-item';
  // Create Text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add Class to link
  link.className = 'delete-item secondary-content';
  // Add Icon
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store to LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear Input
  taskInput.value = '';
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task (event delegation)
function removeTask(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you want to delete this task?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks = tasks.filter(task => {
    return task !== taskItem.textContent;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(e) {
  e.preventDefault();
  // taskList.innerHTML = '';

  // Much faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }

  clearTasksFromLocalStorage();
}

// Clear Tasks From LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  e.preventDefault();
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
// Select dom elements
const todo_input = document.getElementById('todo_input');
const addBtn = document.getElementById('addBtn');
const todo_list = document.getElementById('todo_list');

// Try to load todos from localStorage (if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

// Save todos
function saveTodos() {
  // Save todos to localStorage
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Create a dom element for a todo and add it to the list
function createTodoNode(todo, index) {
  const li = document.createElement('li');
  li.className = 'todo_item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = !!todo.completed;

  checkbox.addEventListener('change', function () {
    todo.completed = this.checked;

    // TODO: Visual feedback

    saveTodos();
  });

  // Text of the todo
  const span = document.createElement('span');
  span.textContent = todo.text;
  span.className = 'todo_text';

  if (todo.completed) {
    span.style.textDecoration = 'line-through';
  }
  // Add double click event to edit the todo
  span.addEventListener('dblclick', () => {
    const newText = prompt('Edit todo: ', todo.text);
    if (newText !== null && newText.trim() !== '') {
      todo.text = newText.trim();
      span.textContent = todo.text;
    }
  });

  // Delete todo button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    todos.splice(index, 1);
    renderTodos();
    saveTodos();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

// Render the todo list
function renderTodos() {
  todo_list.innerHTML = '';

  // Recreate each todos
  todos.forEach((todo, index) => {
    const todoNode = createTodoNode(todo, index);
    todo_list.appendChild(todoNode);
  });
}

function addTodo() {
  const text = todo_input.value.trim();
  if (!text) {
    return;
  }

  todos.push({ text: text, completed: false });
  todo_input.value = '';
  renderTodos();
  saveTodos();
}

addBtn.addEventListener('click', addTodo);
renderTodos();

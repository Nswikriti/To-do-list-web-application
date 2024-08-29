document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load saved tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTaskToList(task.text, task.completed));

    // Add new task
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText !== '') {
            addTaskToList(taskText);
            saveTask(taskText);
            todoInput.value = '';
        }
    });

    // Add task to the list
    function addTaskToList(text, completed = false) {
        const li = document.createElement('li');
        li.textContent = text;
        if (completed) li.classList.add('completed');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            li.remove();
            deleteTask(text);
        });

        li.appendChild(deleteButton);
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            toggleTaskCompleted(text);
        });
        todoList.appendChild(li);
    }

    // Save task to local storage
    function saveTask(text) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Delete task from local storage
    function deleteTask(text) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== text);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Toggle task completion in local storage
    function toggleTaskCompleted(text) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks.find(task => task.text === text);
        if (task) {
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
});

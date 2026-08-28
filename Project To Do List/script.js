const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');

// 1. LOAD DATA (Sekarang isinya array of objects)
let savedTodos = JSON.parse(localStorage.getItem('myAdvancedTodos')) || [];
let currentFilter = 'all'; // Default filter

// 2. FUNGSI GAMBAR LAYAR (RENDER)
function renderTodos() {
    todoList.innerHTML = "";
    
    savedTodos.forEach(function(todo, index) {
        
        if (currentFilter === 'active' && todo.completed) return;
        if (currentFilter === 'completed' && !todo.completed) return;

        const li = document.createElement('li');
        li.innerText = todo.text;

        
        if (todo.completed) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";
            li.style.borderLeft = "5px solid #2ecc71"; 
        }

        
        const actionContainer = document.createElement('div');

        
        const checkBtn = document.createElement('button');
        checkBtn.innerText = todo.completed ? '🔄' : '✅';
        checkBtn.style.marginRight = '5px';
        checkBtn.addEventListener('click', function() {
            toggleTodo(index);
        });

        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = '🗑️';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function() {
            deleteTodo(index);
        });

        actionContainer.appendChild(checkBtn);
        actionContainer.appendChild(deleteBtn);
        li.appendChild(actionContainer);
        todoList.appendChild(li);
    });
}


function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === "") return;

    
    savedTodos.push({
        text: todoText,
        completed: false
    });

    saveToLocalStorage();
    renderTodos();
    todoInput.value = "";
}


function toggleTodo(index) {
    
    savedTodos[index].completed = !savedTodos[index].completed;
    saveToLocalStorage();
    renderTodos();
}


function deleteTodo(index) {
    savedTodos.splice(index, 1);
    saveToLocalStorage();
    renderTodos();
}


function saveToLocalStorage() {
    localStorage.setItem('myAdvancedTodos', JSON.stringify(savedTodos));
}


filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
    
        filterBtns.forEach(b => b.classList.remove('active'));
       
        e.target.classList.add('active');
        
      
        currentFilter = e.target.getAttribute('data-filter');
        renderTodos();
    });
});


addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTodo();
});


renderTodos();
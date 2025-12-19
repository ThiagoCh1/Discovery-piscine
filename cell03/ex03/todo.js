function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}

const ft_list = document.getElementById('ft_list');
const newBtn = document.getElementById('new');

function loadTodos() {
    const todoCookie = getCookie('todos');
    if (todoCookie) {
        const todos = JSON.parse(todoCookie);
        todos.forEach(todoText => addTodoToDOM(todoText));
    }
}

function saveTodos() {
    const todos = Array.from(ft_list.children).map(div => div.textContent);
    setCookie('todos', JSON.stringify(todos), 7); 
}

function addTodoToDOM(text) {
    const todoDiv = document.createElement('div');
    todoDiv.textContent = text;
    
    todoDiv.addEventListener('click', () => {
        if (confirm('Do you want to delete this TO DO?')) {
            todoDiv.remove();
            saveTodos();
        }
    });

    ft_list.insertBefore(todoDiv, ft_list.firstChild);
}

newBtn.addEventListener('click', () => {
    const todoText = prompt('Enter a new TO DO:');
    if (todoText && todoText.trim() !== '') {
        addTodoToDOM(todoText.trim());
        saveTodos();
    }
});

loadTodos();

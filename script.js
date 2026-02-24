// DOM SELECTOR
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");
const clearCompleted = document.querySelector("#clearCompleted");

// Ambil data dari localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render saat pertama kali load
renderTasks();

// EVENT HANDLING - Tambah tugas
addBtn.addEventListener("click", function() {

    const text = taskInput.value.trim();

    // VALIDATION
    if (text === "") {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);
    saveToLocalStorage();
    renderTasks();
    taskInput.value = "";
});

// FUNCTION RENDER
function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.innerText = task.text;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            task.completed = !task.completed;
            saveToLocalStorage();
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Hapus";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function() {
            tasks = tasks.filter(t => t.id !== task.id);
            saveToLocalStorage();
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    taskCount.innerText = tasks.length + " tugas";
}

// Hapus semua yang selesai
clearCompleted.addEventListener("click", function() {
    tasks = tasks.filter(task => !task.completed);
    saveToLocalStorage();
    renderTasks();
});

// Simpan ke localStorage
function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
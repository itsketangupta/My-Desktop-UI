const monthDisplay = document.getElementById('monthDisplay');
const daysContainer = document.getElementById('daysContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let date = new Date();

function renderCalendar() {
    daysContainer.innerHTML = "";

    const year = date.getFullYear();
    const month = date.getMonth();

    monthDisplay.innerText = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    // 1. Fill empty slots for previous month's trailing days
    for (let x = firstDayIndex; x > 0; x--) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty');
        daysContainer.appendChild(emptyDiv);
    }

    for (let i = 1; i <= lastDay; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.innerText = i;

        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayDiv.classList.add('today');
        }

        daysContainer.appendChild(dayDiv);
    }
}

prevBtn.addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

renderCalendar();

let isChanged = false;

function calender() {
    let box = document.getElementById("calendar_box");
    const div = document.querySelector('.calendar_dot');

    if (!isChanged) {
        box.style.display = "none";
        div.classList.remove('dot');
        isChanged = true;
    } else {
        box.style.display = "block";
        div.classList.add('dot');
        isChanged = false;
    }
}

let state = JSON.parse(localStorage.getItem("todo_tabs")) || { tabs: [], active: null };

function save() {
    localStorage.setItem("todo_tabs", JSON.stringify(state));
}

function renderTabs() {
    const tabsDiv = document.getElementById("tabs");
    tabsDiv.innerHTML = "";
    state.tabs.forEach((t, i) => {
        const div = document.createElement("div");
        div.className = "tab" + (t.name === state.active ? " active" : "");

        const closeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        closeSvg.setAttribute("viewBox", "0 0 24 24");
        closeSvg.innerHTML = `<path d="M18 6L6 18M6 6l12 12" stroke="#f87171" stroke-width="5" stroke-linecap="round"/>`;
        closeSvg.onclick = (e) => {
            e.stopPropagation();
            deleteTab(i);
        };

        const nameDiv = document.createElement("div");
        nameDiv.className = "tab-name";
        nameDiv.textContent = t.name;
        nameDiv.onclick = () => {
            state.active = t.name;
            save();
            render();
        };

        div.appendChild(closeSvg);
        div.appendChild(nameDiv);
        tabsDiv.appendChild(div);
    });
}

function renderTasks() {
    const tasksDiv = document.getElementById("tasks");
    tasksDiv.innerHTML = "";
    const tab = state.tabs.find(t => t.name === state.active);
    if (!tab) return;
    tab.tasks.forEach((task, i) => {
        const div = document.createElement("div");
        div.className = "task" + (task.done ? " completed" : "");
        div.innerHTML = `
      <div class="task-info">
        <div class="task-text">${task.text}</div>
        ${task.time ? `<small>${task.time}</small>` : ""}
      </div>
      <div class="right">
        <input type="checkbox" class="checkbox" ${task.done ? "checked" : ""} onchange="toggleDone(${i})">
        <button class="delete-btn" onclick="deleteTask(${i})">×</button>
      </div>
    `;
        tasksDiv.appendChild(div);
    });
}

function render() {
    renderTabs();
    renderTasks();
}

function addTab() {
    const name = document.getElementById("tabInput").value.trim();
    if (!name) return;
    if (state.tabs.some(t => t.name === name)) return;
    state.tabs.push({ name, tasks: [] });
    state.active = name;
    document.getElementById("tabInput").value = "";
    save();
    render();
}

function deleteTab(index) {
    const deleted = state.tabs[index];
    state.tabs.splice(index, 1);
    if (state.active === deleted.name) {
        state.active = state.tabs[0]?.name || null;
    }
    save();
    render();
}

document.getElementById("addTabBtn").onclick = addTab;
document.getElementById("tabInput").addEventListener("keypress", e => {
    if (e.key === "Enter") addTab();
});

function addTask() {
    const text = document.getElementById("taskText").value.trim();
    const time = document.getElementById("taskDate").value;
    if (!text) return;
    const tab = state.tabs.find(t => t.name === state.active);
    if (!tab) return;
    tab.tasks.push({ text, time, done: false });
    document.getElementById("taskText").value = "";
    document.getElementById("taskDate").value = "";
    save();
    render();
}

document.getElementById("addTaskBtn").onclick = addTask;
document.getElementById("taskText").addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});

function toggleDone(index) {
    const tab = state.tabs.find(t => t.name === state.active);
    if (!tab) return;
    tab.tasks[index].done = !tab.tasks[index].done;
    save();
    render();
}

function deleteTask(index) {
    const tab = state.tabs.find(t => t.name === state.active);
    if (!tab) return;
    tab.tasks.splice(index, 1);
    save();
    render();
}

render();

const tabs = document.getElementById('tabs-section');
const btn = document.getElementById('hambergur');

let moved = false;

btn.addEventListener('click', () => {
    if (moved) {
        tabs.style.transform = 'translateX(-300px)';
        btn.src = 'hambergur.svg';
    } else {
        tabs.style.transform = 'translateX(0)';
        btn.src = 'close.svg';
    }
    moved = !moved;
});
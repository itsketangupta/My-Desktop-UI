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

function To_Do() {
    let box = document.getElementById("todo_container");
    const div = document.querySelector('.To_do_dot');

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

function clock() {
    let box = document.getElementById("clock");
    const div = document.querySelector('.clock_dot');

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

function dictionary() {
    let box = document.getElementById("dictionary");
    const div = document.querySelector('.note_dot');

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

function addTask() {
    const input = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (input.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement('li');
    li.textContent = input.value;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function () {
        taskList.removeChild(li);
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    input.value = "";
}

function updateTime() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    const numericHours = hours;
    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let dayOfWeek = now.getDay();


    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    let greeting;
    if (numericHours < 12) {
        greeting = "Good Morning";
    } else if (numericHours < 17) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    const shiftEl = document.querySelector(".shift");
    if (shiftEl) shiftEl.textContent = greeting;


    if (dayOfWeek == 0) { dayOfWeek = "Sun" };
    if (dayOfWeek == 1) { dayOfWeek = "Mon" };
    if (dayOfWeek == 2) { dayOfWeek = "Tue" };
    if (dayOfWeek == 3) { dayOfWeek = "Wed" };
    if (dayOfWeek == 4) { dayOfWeek = "Thur" };
    if (dayOfWeek == 5) { dayOfWeek = "Fri" };
    if (dayOfWeek == 6) { dayOfWeek = "Sat" };


    const hrEL = document.getElementById("hr");
    const minEL = document.getElementById("min");
    const dayEl = document.getElementById("day");
    const dateEl = document.getElementById("date");

    if (dateEl) dateEl.textContent = `${date}-${month}-${year}`;
    if (hrEL) hrEL.textContent = `${hours}`;
    if (minEL) minEL.textContent = `${minutes}`;
    if (dayEl) dayEl.textContent = `${dayOfWeek}`;
}

updateTime();

setInterval(updateTime, 1000);

document.getElementById("search").addEventListener("click", async () => {
    let word = document.getElementById("word").value.trim();
    if (!word) return;

    try {
        let mean = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        let data = await mean.json();

        let meaningData = data[0]?.meanings[0];
        if (!meaningData) {
            document.getElementById("result").innerText = "Not found";
            return;
        }

        let partOfSpeech = meaningData.partOfSpeech || "Unknown";
        let definition = meaningData.definitions[0]?.definition || "Not found";
        let example = meaningData.definitions[0]?.example || "No example available";

        document.getElementById("result").innerHTML = `
        <b>Meaning</b> ${definition}<br>
        <b>Part of Speech:</b> ${partOfSpeech}<br>
        <b>Example:</b> <p>${example}</p>
    `;
    } catch (err) {
        document.getElementById("result").innerText = "Use correct word";
    }
});

const display = document.getElementById("display");

function append(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}
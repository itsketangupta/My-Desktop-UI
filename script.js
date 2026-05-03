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
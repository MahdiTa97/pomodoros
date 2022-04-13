let tasks = [];

function secondsToTime(t) {
  const diff = 25 * 60 - t;
  if (diff < 0) return "Finished";
  const m = Math.floor((diff % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(diff % 60)
      .toString()
      .padStart(2, "0");
  return m + ":" + s;
}

const time = document.getElementById("time");

function updateTime() {
  chrome.storage.local.get(["timer"]).then((res) => {
    time.textContent = secondsToTime(res.timer);
  });
}

updateTime();
setInterval(() => {
  updateTime();
}, 1000);

chrome.storage.local.get(["isRunning"]).then((res) => {
  startTimerBtn.textContent = res.isRunning ? "Pause Timer" : "Start Timer";
});

const startTimerBtn = document.getElementById("start-timer-btn");
startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"]).then((res) => {
    chrome.storage.local.set({ isRunning: !res.isRunning });
    startTimerBtn.textContent = res.isRunning ? "Start Timer" : "Pause Timer";
  });
});

const resetTimerBtn = document.getElementById("reset-timer-btn");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
  });
  startTimerBtn.textContent = "Start Timer";
});

const addTaskBtn = document.getElementById("add-task-btn");

addTaskBtn.addEventListener("click", () => {
  addTask();
});

chrome.storage.sync.get(["tasks"]).then((res) => {
  tasks = res.tasks ?? [];
  renderTasks();
});

function saveTasks() {
  chrome.storage.sync.set({ tasks });
}

function renderTask(taskNum) {
  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter task here ...";
  text.value = tasks[taskNum];
  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  renderTask(taskNum);
  saveTasks();
}

function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks();
}

function renderTasks() {
  // make the task container empty and the fill it with tasks again
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((taskText, TaskNum) => {
    renderTask(TaskNum);
  });
}

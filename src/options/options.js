const timeOption = document.getElementById("time-option");

chrome.storage.local.get(["timeOption"]).then((res) => {
  timeOption.value = res.timeOption ?? 25;
});

timeOption.addEventListener("change", (e) => {
  const value = e.target.value;
  if (value < 1 || value > 60) {
    timeOption.value = 25;
  }
});

const saveBtn = document.getElementById("save-btn");

saveBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    timeOption: timeOption.value,
    isRunning: false,
  });
});

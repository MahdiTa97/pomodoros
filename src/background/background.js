const alarmsKeys = ["timer", "isRunning", "timeOption"];

chrome.alarms.create("pomodoros", { periodInMinutes: 1 / 60 });

chrome.alarms.onAlarm.addListener((alarms) => {
  if (alarms.name === "pomodoros") {
    chrome.storage.local.get(alarmsKeys).then((res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = res.isRunning;
        if (timer === res.timeOption * 60) {
          chrome.notifications.create("pomodoros", {
            type: "basic",
            title: "Pomodoros Message",
            message: `${res.timeOption} minutes has passed!!`,
            iconUrl: "../assets/icon.png",
          });
          timer = 0;
          isRunning = false;
        }
        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

chrome.storage.local.get(alarmsKeys).then((res) => {
  chrome.storage.local.set({
    timer: res.timer ?? 0,
    timeOption: res.timeOption ?? 25,
    isRunning: res.isRunning ?? false,
  });
});

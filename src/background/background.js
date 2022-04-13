const alarmsKeys = ["timer", "isRunning"];

chrome.alarms.create("pomodoros", { periodInMinutes: 1 / 60 });

chrome.alarms.onAlarm.addListener((alarms) => {
  if (alarms.name === "pomodoros") {
    chrome.storage.local.get(alarmsKeys).then((res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = res.isRunning;
        if (timer === 25 * 60) {
          this.registration.showNotification("pomodoros", {
            title: "Pomodoros Message",
            type: "basic",
            iconUrl: "../assets/icon.png",
            message: "25 minutes has passed!!",
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
    isRunning: res.isRunning ?? false,
  });
});

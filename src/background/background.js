const alarmsKeys = ["timer", "isRunning"];

chrome.alarms.create("pomodoros", { periodInMinutes: 1 / 60 });

chrome.alarms.onAlarm.addListener((alarms) => {
  if (alarms.name === "pomodoros") {
    chrome.storage.local.get(alarmsKeys).then((res) => {
      if (res.isRunning) {
        console.log("=====> res.timer+1 <=====", res.isRunning, res.timer + 1);
        chrome.storage.local.set({
          timer: res.timer + 1,
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

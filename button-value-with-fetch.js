document.addEventListener("DOMContentLoaded", function () {
  let interval;
  let value = 0;
  const getElementById = (elementId) => document.getElementById(elementId);

  function sendValue() {
    fetch("/server-endpoint-here", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    })
      .then(({ ok, statusText, json }) => {
        if (!ok) {
          throw new Error(`Network response was not ok ${statusText}`);
        }
        return json();
      })
      .then((data) => {
        console.log(`Value sent to server: ${value}, ${data}`);
      })
      .catch((error) => {
        console.log(
          `Error sending value to server: ${value}, ${error.message}`
        );
      });
  }

  function startSendingValue() {
    value = 1;
    getElementById("value").textContent = value;
    sendValue();
    interval = setInterval(sendValue, 10);
  }

  function stopSendingValue() {
    clearInterval(interval);
    value = 0;
    getElementById("value").textContent = value;
    sendValue();
  }

  const holdButton = getElementById("holdButton");
  const startEvents = ["mousedown", "touchstart"];
  const stopEvents = ["mouseup", "touchend", "mouseleave"];

  const addEventListener = (element, event, callbackFunction) =>
    element.addEventListener(event, callbackFunction);

  startEvents.forEach((event) =>
    addEventListener(holdButton, event, startSendingValue)
  );
  stopEvents.forEach((event) =>
    addEventListener(holdButton, event, stopSendingValue)
  );
});

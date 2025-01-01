document.addEventListener("DOMContentLoaded", function () {
  let interval;
  let value = 0;

  function sendValue() {
    fetch("/server-endpoint-here", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: value }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Value sent to server:", value, data);
      })
      .catch((error) => {
        console.log("Error sending value to server:", value, error);
      });
  }

  function startSendingValue() {
    value = 1;
    document.getElementById("value").textContent = value;
    sendValue();
    interval = setInterval(sendValue, 10);
  }

  function stopSendingValue() {
    clearInterval(interval);
    value = 0;
    document.getElementById("value").textContent = value;
    sendValue();
  }

  const holdButton = document.getElementById("holdButton");
  const startEvents = ["mousedown", "touchstart"];
  const stopEvents = ["mouseup", "touchend", "mouseleave"];

  startEvents.forEach((event) =>
    holdButton.addEventListener(event, startSendingValue)
  );
  stopEvents.forEach((event) =>
    holdButton.addEventListener(event, stopSendingValue)
  );
});

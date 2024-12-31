document.addEventListener("DOMContentLoaded", () => {
  const valueDisplay = document.getElementById("value");
  const holdButton = document.getElementById("holdButton");
  let holdTimeout;

  function setValueToOne() {
    valueDisplay.textContent = "1";
  }

  function resetValue() {
    valueDisplay.textContent = "0";
  }

  // decktop events with mouse

  holdButton.addEventListener("mousedown", () => {
    holdTimeout = setTimeout(setValueToOne, 1); // Change to 1 after 1 second
  });

  holdButton.addEventListener("mouseup", () => {
    clearTimeout(holdTimeout);
    resetValue();
  });

  holdButton.addEventListener("mouseleave", () => {
    clearTimeout(holdTimeout);
    resetValue();
  });

  // touch based events, iphone, ipad etc.

  holdButton.addEventListener("touchstart", () => {
    holdTimeout = setTimeout(setValueToOne, 1); // Change to 1 after 1 second
  });

  holdButton.addEventListener("touchend", () => {
    clearTimeout(holdTimeout);
    resetValue();
  });

  holdButton.addEventListener("touchcancel", () => {
    clearTimeout(holdTimeout);
    resetValue();
  });
});

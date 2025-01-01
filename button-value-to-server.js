$(document).ready(function () {
  let interval;
  let value = 0;

  function sendValue() {
    $.ajax({
      url: "/server-endpoint-here",
      method: "POST",
      data: { value: value },
      success: function (response) {
        console.log("Value sent to server:", value, response);
      },
      error: function (_, textStatus, errorThrown) {
        console.log(
          "Error sending value to server:",
          value,
          textStatus,
          errorThrown
        );
      },
    });
  }

  function startSendingValue() {
    value = 1;
    $("#value").text(value);
    sendValue();
    interval = setInterval(sendValue, 10);
  }

  function stopSendingValue() {
    clearInterval(interval);
    value = 0;
    $("#value").text(value);
    sendValue();
  }

  $("#holdButton").on("mousedown touchstart", function () {
    startSendingValue();
  });

  $("#holdButton").on("mouseup touchend mouseleave", function () {
    stopSendingValue();
  });
});

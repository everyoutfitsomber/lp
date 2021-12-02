let screenWidth = 0,
  screenHeight = 0;

window.onload = function () {
  fod.complete(function (data) {
    screenWidth = data.device["screenmmwidth"];
    screenHeight = data.device["screenmmheight"];
    if (screenWidth != 0 && screenHeight != 0) {
      document.querySelector("#accurate").style.display = "block";
      const ratioW = window.innerWidth / screenWidth;
      const ratioH = window.innerHeight / screenHeight;
      const size = 10;
      document.querySelectorAll(".circle").forEach((circle) => {
        circle.style.width = size * ratioW + "px";
        circle.style.height = size * ratioW + "px";
      });
    }
  });
};
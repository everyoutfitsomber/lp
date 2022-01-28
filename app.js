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
      const size = 3.15;
      document.querySelectorAll(".circle").forEach((circle) => {
        circle.style.width = size * ratioW + "px";
        circle.style.height = size * ratioW + "px";
      });
    }
  });
};

// Live Chat
// Start of Tawk.to Script

var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/61e5d921b84f7301d32b82b8/1fpktgb2m";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();

//End of Tawk.to Script

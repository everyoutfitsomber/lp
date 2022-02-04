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
let tawkLoadFlag = false;
document.querySelector(".contact-us").addEventListener("click", (e) => {
  if (!tawkLoadFlag) {
    tawkLoadFlag = true;
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
      s1.onload = ()=>{
        setTimeout(() => {
          window.Tawk_API.toggle();
        }, 500);
      }
    })();
  }else{
    window.Tawk_API.toggle();
  }
});

document.querySelector('#email_signup').addEventListener('submit', e=>{
  e.preventDefault();

  console.log('asd')

  // const initiateSend = function(){
  //   var settings = {
  //       "async": true,
  //       "crossDomain": true,
  //       "url": "https://manage.kmail-lists.com/ajax/subscriptions/subscribe",
  //       "method": "POST",
  //       "headers": {
  //       "content-type": "application/x-www-form-urlencoded",
  //       "cache-control": "no-cache"
  //       },
  //       "data": {
  //       "g": "TksrLy",
  //       // "$fields": "$first_name,$last_name,Favorite Color,Favorite Book,$source",
  //       "email": `${document.querySelector('#k_id_email').innerText}`,
  //       "$source": "Custom Form"
  //       }
  //   }
  //   $.ajax(settings).done(function (response) {
  //       console.log(response);
  //   });
  //   }
})


// Live Chat
// Start of Tawk.to Script

//End of Tawk.to Script

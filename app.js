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
    let Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      let s1 = document.createElement("script"),
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



function toTimeZone(time, zone) {
  let format = 'YYYY/MM/DD HH:mm:ss';
  return moment(time, format).tz(zone).format(format);
}

// For Testing Purposes, uncomment all comments starting and ending with starred comments and comment all code
// starting with a comment saying to do so for testing
/*
let customDate = '2022/03/05 23:59:55'
let now = new Date(customDate);
let timeInDenver =  new Date(toTimeZone(now, 'America/Denver'));
*/


//Comment This code in case of testing:
let now = new Date();
let timeInDenver =  new Date(toTimeZone(now, 'America/Denver'));
setInterval(() => {
  now = new Date();
  timeInDenver =  new Date(toTimeZone(now, 'America/Denver'));
}, 1000);
//Until here


const dailyCutoffTime = '15:00:00',//3 PM
      specialOrderCutoff = '10:00:00',//10 AM
      weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function timeUpdate(){
    let currentDay = timeInDenver.getDate(),
    currentMonth = timeInDenver.getMonth(),
    currentYear = timeInDenver.getFullYear(),
    weekDay = timeInDenver.getDay(),
    todayDate = now.getDate(),
    cutoffTime;

    //If saturday
    if(weekDay === 6){
    cutoffTime = new Date(`${currentYear}, ${currentMonth + 1}, ${currentDay}, ${specialOrderCutoff}`)
    }else{
    cutoffTime = new Date(`${currentYear}, ${currentMonth + 1}, ${currentDay}, ${dailyCutoffTime}`)
    }

    //If before cutoff time and not a sunday
    if(timeInDenver < cutoffTime && weekDay != 0){
    if(now.getDate() === timeInDenver.getDate()){
      document.querySelector('.day-designator').innerText = 'today';
      document.querySelector('.ship-date').innerText = `${weekdays[weekDay]} ${months[currentMonth]} ${currentDay}`
    }else if (now.getDate() > timeInDenver.getDate()){
      document.querySelector('.day-designator').innerText = 'on';
      document.querySelector('.ship-date').innerText = `${weekdays[weekDay]} ${months[currentMonth]} ${currentDay} (Denver Time)`
    }else{
      document.querySelector('.day-designator').innerText = 'tomorrow';
      document.querySelector('.ship-date').innerText = `${weekdays[weekDay]} ${months[currentMonth]} ${currentDay}`
    }

    //3 Hours flexibility 
    if(Math.abs(timeInDenver-cutoffTime)/1000 > (3600*3)){
      let countDownDate = cutoffTime.getTime()-(3600*1000*3);
      let countdown = setInterval(function() {
        /*
        now.setTime(now.getTime() + 1000)
        timeInDenver = new Date(toTimeZone(now, 'America/Denver'));
        */

        let timeLeft = countDownDate - timeInDenver;
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById('hour').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
        if(timeLeft < 0 || todayDate != now.getDate()){
          clearInterval(countdown);
          timeUpdate();
        }
      }, 1000)
    }else{
      let countDownDate = cutoffTime.getTime();
      let countdown = setInterval(function() {
        /*
        now.setTime(now.getTime() + 1000)
        timeInDenver = new Date(toTimeZone(now, 'America/Denver'));
        */

        let timeLeft = countDownDate - timeInDenver;
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById('hour').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
        if(timeLeft < 0 || todayDate != now.getDate()){
          clearInterval(countdown);
          timeUpdate();
        }
      }, 1000)
    }
    }
    //If Saturday over cutoff time
    else if(weekDay === 6 && timeInDenver > cutoffTime){
    document.querySelector('.day-designator').innerText = 'Monday AM';
    document.querySelector('.order-deadline').style.display = 'none';
    let nextCutoff = new Date(timeInDenver);
    nextCutoff.setDate(nextCutoff.getDate() + 2);
    document.querySelector('.ship-date').innerText = `${months[nextCutoff.getMonth()]} ${nextCutoff.getDate()}`;
    let countDownDate = nextCutoff.getTime()-(3600*1000*3);
    let countdown = setInterval(function() {
      /*
      now.setTime(now.getTime() + 1000)
      timeInDenver = new Date(toTimeZone(now, 'America/Denver'));
      */
      let timeLeft = countDownDate - timeInDenver;
      if(timeLeft < 0 || todayDate != now.getDate() || timeInDenver.getDay() != weekDay){
        clearInterval(countdown);
        document.querySelector('.order-deadline').style.display = 'block';

        timeUpdate();
      }
    }, 1000)
    }
    //Otherwise, if over cutoff time and not saturday
    else{
    if(now.getDate() === timeInDenver.getDate()){
      document.querySelector('.day-designator').innerText = 'tomorrow';
    }else if(now.getDate() < timeInDenver.getDate()){
      document.querySelector('.day-designator').innerText = 'the day after tomorrow';
    }else if(now.getDate() > timeInDenver.getDate()){
      document.querySelector('.day-designator').innerText = 'today';

    }

    let nextCutoff;
    if(weekDay === 5){
      nextCutoff = new Date(`${currentYear}, ${currentMonth + 1}, ${currentDay}, ${specialOrderCutoff}`)
    }else{
      nextCutoff = new Date(`${currentYear}, ${currentMonth + 1}, ${currentDay}, ${dailyCutoffTime}`)
    }
    nextCutoff.setDate(nextCutoff.getDate() + 1);
    if(Math.abs(timeInDenver-nextCutoff)/1000 > (3600*3)){
      let countDownDate = nextCutoff.getTime()-(3600*1000*3);
      let countdown = setInterval(function() {
        /*
        now.setTime(now.getTime() + 1000)
        timeInDenver = new Date(toTimeZone(now, 'America/Denver'));
        */


        let timeLeft = countDownDate - timeInDenver;
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById('hour').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
        if(timeLeft < 0|| todayDate != now.getDate()){
          clearInterval(countdown);
          timeUpdate();
        }
      }, 1000)
    }else{
      let countDownDate = nextCutoff.getTime();
      let countdown = setInterval(function() {
        /*
        now.setTime(now.getTime() + 1000)
        timeInDenver = new Date(toTimeZone(now, 'America/Denver'));
        */

        let timeLeft = countDownDate - timeInDenver;
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementById('hour').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
        if(timeLeft < 0 || todayDate != now.getDate()){
          clearInterval(countdown);
          timeUpdate();
        }
      }, 1000)
    }
    document.querySelector('.ship-date').innerText = `${weekdays[nextCutoff.getDay()]} ${months[nextCutoff.getMonth()]} ${nextCutoff.getDate()}`
    }

}

timeUpdate();

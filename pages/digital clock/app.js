function clock() {
    var time = new Date();

    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var ampm = "AM";

    // date section
    var date = time.getDate();
    var month = time.getMonth() + 1;
    var year = time.getFullYear();

    // day section
    var dayNumber = time.getDay();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = days[dayNumber];

    if (hours >= 12) {
        ampm = "PM";
    }

    if (hours > 12) {
        hours = hours - 12;
    }

    if (hours == 0) {
        hours = 12;
    }

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if(month < 10){
  
        month = "0"+ month

    }

    document.getElementById("hours").innerText = hours + " : ";
    document.getElementById("min").innerText = minutes + " : ";
    document.getElementById("sec").innerText = seconds + " ";
    document.getElementById("ampm").innerText = ampm;

    document.getElementById("day").innerText = day;
    document.getElementById("date").innerText = date + '  :';
    document.getElementById("month").innerText = month + '  :';
    document.getElementById("year").innerText = year + '  :';
}

setInterval(clock, 1000);

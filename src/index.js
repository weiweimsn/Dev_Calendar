import CanadaStatHolidays from '../libs/CanadaStatHolidays';
import Lunar from '../libs/lunarCalendar';

// make date a string type so it is compatible with invalid date
var currentDate = "";
var YearChangeEvent;
var currentYear;
var statHolidays;
var holidays = [];

window.onload = function () {
    currentDate = new Date().getLocaleDateInString();
    preLoad();
    var rowsOfCurrentMonth = CountOfRow(currentDate);
    RenderCalanderFrame(rowsOfCurrentMonth);
    renderCalendarDays(currentDate);
}


function preLoad() {
    YearChangeEvent = new CustomEvent('onYearChanged', { "year": currentDate.getYear() });
    var prevMonth = document.getElementsByClassName("previousMonth")[0];
    var nextMonth = document.getElementsByClassName("nextMonth")[0];
    currentYear = document.getElementById('currentYear');
    currentYear.addEventListener('onYearChanged', setYearInfo);
    prevMonth.addEventListener('click', goToPrevMonth);
    nextMonth.addEventListener('click', goToNextMonth);
    currentYear.dispatchEvent(YearChangeEvent);
    holidays = updateStatHolidays(currentDate.getYear());
}

function renderCalendarDays(date) {

    var year = date.getYear();
    var month = date.getMonth();
    var today = date.getToday();


    var firstDay = new Date(year, month - 1, 1).getDay();
    var numberOfDays = new Date(year, month, 0).getDate();

    var count = 1;
    firstDay = firstDay == 0 ? 7 : firstDay;
    var startIndex = firstDay + 6;
    var currentDay;
    var gap = firstDay - 1 + 6;
    currentDate = date;

    while (count <= numberOfDays) {
        var calendarCell = document.getElementsByClassName("col");
        var span = document.createElement('div');
        span.classList.add('font-weight-bold');
        span.classList.add('text-center');
        span.innerText = count;
        // if today is Saturday or Sunday, make it red
        if ((startIndex - 5) % 7 === 0 || (startIndex - 6) % 7 === 0) {
            span.style.color = "red";
        }
        // if today is a stat holiday or reserved stat holiday, make it red
        count = count < 10 ? "0" + count : count.toString();
        month = month < 10 ? "0" + month : month.toString();
        if (holidays.indexOf(year.toString() + month + count) > -1) {
            span.style.color = "red";
        }
        calendarCell[startIndex].appendChild(span);

        var lunarDate = document.createElement('div');
        lunarDate.className = 'lunarDate';
        const lunarInfo = Lunar.toLunar(year, month, count);

        const statHolidayName = getStatHolidayNameByDate(year.toString() + month + count);

        if (holidays.indexOf(year.toString() + month + count) > -1 && statHolidayName !== "") {
            lunarDate.innerHTML = statHolidayName;
            lunarDate.className = "statHolidayName";
            lunarDate.style.color = "red";
        }

        else if (lunarInfo[8] !== "") {
            lunarDate.innerHTML = lunarInfo[8];
            lunarDate.className = 'lunarDate';
            lunarDate.style.color = "red";
        }
        else {
            lunarDate.innerHTML = lunarInfo[8] === "" ? lunarInfo[5] + ' ' + lunarInfo[6] : lunarInfo[8];
        }
        calendarCell[startIndex].appendChild(lunarDate);
        if (today <= numberOfDays) {
            calendarCell[today + gap].classList.add('today');
        }

        currentDay = calendarCell[today + gap];
        count++;
        startIndex++;

        month++;
        month--;
    }
    // SetTime(currentDay, today, hour, minutes,seconds);

    setDisplayMonth(month - 1);
}

function SetTime(currentDay, today, hour, minute, second) {
    setInterval(() => {
        second++;
        if (second >= 60) {
            second = second % 60;
            minute++;
        }
        if (minute >= 60) {
            minute = minute % 60;
            hour++;
        }
        hour = hour >= 24 ? hour % 24 : hour;
        var time = hour + ' : ' + minute + ' ' + second;
        currentDay.innerHTML = today + '</br>' + '</br>' + '<div>' + time + '</div>';
    }, (1000));
}

function CountOfRow(date) {
    var year = date.getYear();
    var month = date.getMonth();
    var numberOfDays = new Date(year, month, 0).getDate();
    var firstDay = new Date(year, month - 1, 1).getDay();
    firstDay = firstDay == 0 ? 7 : firstDay;

    var rows = Math.ceil((numberOfDays + firstDay - 1) / 7);
    return rows;
}

// create all days / cells in a month in the calendar
function RenderCalanderFrame(rows) {
    var calendar = document.getElementsByClassName('calendarBody')[0];
    calendar.innerHTML = '';

    for (var i = 0; i < rows; i++) {
        // create rows
        var row = document.createElement('div');
        row.className = 'row';

        // create days in a row
        for (var j = 0; j < 7; j++) {
            var cell = document.createElement('div');
            cell.className = 'col';
            row.appendChild(cell);
        }
        calendar.appendChild(row);
    }
}

function setDisplayMonth(month) {
    var currentMonth = document.getElementById('currentMonth');
    switch (month) {
        case 0:
            currentMonth.innerHTML = 'Janary';
            break;
        case 1:
            currentMonth.innerHTML = 'February';
            break;
        case 2:
            currentMonth.innerHTML = 'March';
            break;
        case 3:
            currentMonth.innerHTML = 'April';
            break;
        case 4:
            currentMonth.innerHTML = 'May';
            break;
        case 5:
            currentMonth.innerHTML = 'June';
            break;
        case 6:
            currentMonth.innerHTML = 'July';
            break;
        case 7:
            currentMonth.innerHTML = 'August';
            break;
        case 8:
            currentMonth.innerHTML = 'September';
            break;
        case 9:
            currentMonth.innerHTML = 'October';
            break;
        case 10:
            currentMonth.innerHTML = 'November';
            break;
        case 11:
            currentMonth.innerHTML = 'December';
            break;
        default:
            currentMonth.innerHTML = 'Error';
            break;
    }
}

function goToPrevMonth() {
    let localeDateString;
    let prevMonth = currentDate.getMonth() - 1;
    let day = currentDate.getToday();
    let year = currentDate.getYear();
    let isYearChanged = false;

    if (prevMonth < 1) {
        prevMonth = 12;
        year--;
        isYearChanged = true;
    }

    currentDate = localeDateString = prevMonth.toString() + '/' + day + '/' + year;

    if (isYearChanged) {
        currentYear.dispatchEvent(YearChangeEvent);
    }

    var rowsOfCurrentMonth = CountOfRow(localeDateString);
    RenderCalanderFrame(rowsOfCurrentMonth);
    renderCalendarDays(localeDateString);
}

function goToNextMonth() {
    let localeDateString;
    let nextMonth = currentDate.getMonth() + 1;
    let day = currentDate.getToday();
    let year = currentDate.getYear();
    let isYearChanged = false;

    if (nextMonth > 12) {
        nextMonth = 1;
        year++;
        isYearChanged = true;
    }
    currentDate = localeDateString = nextMonth.toString() + '/' + day + '/' + year;

    if (isYearChanged) {
        currentYear.dispatchEvent(YearChangeEvent);
    }

    var rowsOfCurrentMonth = CountOfRow(localeDateString);
    RenderCalanderFrame(rowsOfCurrentMonth);
    renderCalendarDays(localeDateString);
}

function setYearInfo() {
    currentYear.innerHTML = currentDate.getYear() + '&nbsp&nbsp';

    // upate stat holidays in a new year
    holidays = updateStatHolidays(currentDate.getYear());
}

// function createCORSRequest() {
//     var url = "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-CA";
//     var httpRequest = HttpRequest;

//     httpRequest.onload = function (response) {
//         console.log(response);
//     }

//     httpRequest.onerror = function (error) {
//         console.log(error);
//     }

//     httpRequest.send();
// }

function updateStatHolidays(year) {
    // mount stat holidays
    statHolidays = [];
    var tempHolidays = [];

    statHolidays = CanadaStatHolidays.getStatHolidays(year);
    for (var i = 0; i < statHolidays.length; i++) {
        // holidays.push(statHolidays[i].id);
        if (statHolidays[i].reservedDate) {
            tempHolidays.push(statHolidays[i].reservedDate);
        }
        // else {
        //     tempHolidays.push(statHolidays[i].id);
        // }
        tempHolidays.push(statHolidays[i].id);
    }
    return tempHolidays;
}

function getStatHolidayNameByDate(dateInString) {
    if (!statHolidays) return "";

    for (var i = 0; i < statHolidays.length; i++) {
        const statHoliday = statHolidays[i];
        if (statHoliday.id === dateInString) {
            // if (statHoliday.id === dateInString) {
            return statHoliday.name;
        }
    }
    return "";
}

String.prototype.getYear = function () {
    return parseInt(this.substr(this.lastIndexOf('/') + 1));
}
String.prototype.getMonth = function () {
    return parseInt(this.substring(0, this.indexOf('/')));
}
String.prototype.getToday = function () {
    return parseInt(this.substring(this.indexOf('/') + 1, this.lastIndexOf('/')));
}
Date.prototype.getLocaleDateInString = function () {
    return this.getMonth() + 1 + '/' + this.getDate() + '/' + this.getFullYear()
}
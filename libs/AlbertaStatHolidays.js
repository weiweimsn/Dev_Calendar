// input: year, province
// output: an array of stat holidays

var AlbertaStatHolidays = {
    statHolidays: [],
    getStatHolidays: function (year, province = "Alberta") {
        this.statHolidays.push(this.getNewYearsDay(year));
        this.statHolidays.push(this.getFamilyDay(year));
        this.statHolidays.push(this.getVictoriaDay(year));
        this.statHolidays.push(this.getCanadaDay(year));
        this.statHolidays.push(this.getLabourDay(year));
        this.statHolidays.push(this.getThanksgivingDay(year));
        this.statHolidays.push(this.getRemembranceDay(year));
        this.statHolidays.push(this.getChrismasDay(year));

        return this.statHolidays;
    },
    getNewYearsDay: function (year) {
        const date = new Date(year, 0, 1);

        // The getDay() method returns the day of the week (from 0 to 6) for the specified date.
        var weekday = date.getDay();

        // today's date
        var today = date.getDate();

        // Saturday
        if (weekday === 6) {
            // return [{ '0101': 'New Years Day' }, { '0103': 'New Years Day' }];
            return { id: year + "0101", name: "New Years Day", observed: true, observedDate: year - 1 + "1231" };
        }
        // Sunday
        else if (weekday === 0) {
            // return [{ '0101': 'New Years Day' }, { '0102': 'New Years Day' }];
            return { id: year + "0101", name: "New Years Day", observed: true, observedDate: year + "01" + (today + 1)};
        }
        else {
            return { id: year + "0101", name: "New Years Day", observed: false};
        }
    },
    getFamilyDay: function (year, province = "Alberta") {
        const date = new Date(year, 1, 1);

        // The getDay() method returns the day of the week (from 0 to 6) for the specified date.
        var weekday = date.getDay();

        // today's date
        var today = date.getDate();
        let key;

        switch (weekday) {
            case 0:
                key = year + "02" + (today + 22);
                return { id: key, name: "Family Day", observed: true, observedDate: year + "02" + (today + 23) };
            case 1:
                key = year + "02" + (today + 21);
                return { id: key, name: "Family Day", observed: false};
            case 2:
                key = year + "02" + (today + 20);
                return { id: key, name: "Family Day", observed: false};
            case 3:
                key = year + "02" + (today + 19);
                return { id: key, name: "Family Day", observed: false};
            // Thursday
            case 4:
                key = year + "02" + (today + 18);
                return { id: key, name: "Family Day", observed: false};
            case 5:
                key = year + "02" + (today + 17);
                return { id: key, name: "Family Day", observed: false};
            case 6:
                key = year + "02" + (today + 16);
                return { id: key, name: "Family Day", observed: true, observedDate: year + "02" + (today + 15) };
        }
    },
 
    getGoodFriDay: function (year, province = "Ontario") {
        const easterSunday = this.getEasterSunday(year, province);
        var dayInMonth = easterSunday.getDate() - 2;
        var month = easterSunday.getMonth() + 1;
        if (dayInMonth <= 0) {
            month--;
            dayInMonth += 31; // 31 is from the number of days in March
        }
        // var day = easterSunday - 2;
        if (dayInMonth < 10) {
            var key = year + "0" + month + "0" + dayInMonth;
        }
        else {
            var key = year + "0" + month + dayInMonth;
        }
        return { id: key, name: "Good Friday", observed: false};
    },

    getVictoriaDay: function (year, province = "Alberta") {
        const date = new Date(year, 4, 24);
        const weekday = date.getDay();
        const today = date.getDate();
        let key;
        switch (weekday) {
            case 0:
                key = year + "05" + (today - 6);
                return { id: key, name: "Victoria Day", observed: false};
            case 1:
                key = year + "05" + today;
                return { id: key, name: "Victoria Day", observed: false};
            case 2:
                key = year + "05" + (today - 1);
                return { id: key, name: "Victoria Day", observed: false};
            case 3:
                key = year + "05" + (today - 2);
                return { id: key, name: "Victoria Day", observed: false};
            // Thursday
            case 4:
                key = year + "05" + (today - 3);
                return { id: key, name: "Victoria Day", observed: false};
            case 5:
                key = year + "05" + (today - 4);
                return { id: key, name: "Victoria Day", observed: false};
            case 6:
                key = year + "05" + (today - 5);
                return { id: key, name: "Victoria Day", observed: false};
        }
    },
    getCanadaDay: function (year, province = "Alberta") {
        const date = new Date(year, 6, 1);

        // The getDay() method returns the day of the week (from 0 to 6) for the specified date.
        var weekday = date.getDay();

        // today's date
        var today = date.getDate();

        // Saturday
        if (weekday === 6) {
            return { id: year + "070" + today, name: "Canada Day", observed: true, observedDate: year + "0630" };
        }
        // Sunday
        else if (weekday === 0) {
            return { id: year + "070" + today, name: "Canada Day", observed: true, observedDate: year + "0702" };
        }
        else {
            return { id: year + "070" + today, name: "Canada Day", observed: false };
        }

    },

    getLabourDay: function (year, province = "Alberta") {
        const date = new Date(year, 8, 1);

        // The getDay() method returns the day of the week (from 0 to 6) for the specified date.
        var weekday = date.getDay();

        // today's date
        var today = date.getDate();
        let key;
        switch (weekday) {
            case 0:
                key = today + 1 < 10? year + "090" + (today + 1) :  year + "09" + (today + 1);
                return { id: key, name: "Labour Day", observed: false};
            case 1:
                key = today < 10? year + "090" + today :  year + "09" + today;
                return { id: key, name: "Labour Day", observed: false};
            case 2:
                key = today + 6 < 10? year + "090" + (today + 6) :  year + "09" + (today + 6);
                return { id: key, name: "Labour Day", observed: false};
            case 3:
                key = today + 5 < 10? year + "090" + (today + 5) :  year + "09" + (today + 5);
                return { id: key, name: "Labour Day", observed: false};
            // Thursday
            case 4:
                key = today + 4 < 10? year + "090" + (today + 4) :  year + "09" + (today + 4);
                return { id: key, name: "Labour Day", observed: false};
            case 5:
                key = today + 3 < 10? year + "090" + (today + 3) :  year + "09" + (today + 3);
                return { id: key, name: "Labour Day", observed: false};
            case 6:
                key = today + 2 < 10? year + "090" + (today + 2) :  year + "09" + (today + 2);
                return { id: key, name: "Labour Day", observed: false};
        }
    },
    getThanksgivingDay: function (year, province = "Alberta") {
        const date = new Date(year, 9, 1);

        // The getDay() method returns the day of the week (from 0 to 6) for the specified date.
        var weekday = date.getDay();

        // today's date
        var today = date.getDate();
        let key;

        switch (weekday) {
            case 0:
                key = today + 8 < 10? year + "100" + (today + 8) :  year + "10" + (today + 1);
                return { id: key, name: "Thanksgiving Day", observed: false};
            case 1:
                key = year + "10" + (today + 7);
                key = today + 7 < 10? year + "100" + (today + 7) :  year + "10" + (today + 1);
                return { id: key, name: "Thanksgiving Day", observed: false};
            case 2:
                key = year + "10" + (today + 13);
                return { id: key, name: "Thanksgiving Day", observed: false};
            case 3:
                key = year + "10" + (today + 12);
                return { id: key, name: "Thanksgiving Day", observed: false};
            // Thursday
            case 4:
                key = year + "10" + (today + 11);
                return { id: key, name: "Thanksgiving Day", observed: false};
            case 5:
                key = year + "10" + (today + 10);
                return { id: key, name: "Thanksgiving Day", observed: false};
            case 6:
                key = year + "10" + (today + 9);
                return { id: key, name: "Thanksgiving Day", observed: false};
        }
    },

    getRemembranceDay: function (year, province = "Alberta") {
        const date = new Date(year, 10, 11);

        // The getDay() method returns the day of the week (from 0 to 6) for the specified date.
        var weekday = date.getDay();

        // today's date
        var today = date.getDate();

        // Saturday
        if (weekday === 6) {
            return { id: year + "11" + today, name: "Remembrance Day", observed: true, observedDate: year + "1110" };
        }
        // Sunday
        else if (weekday === 0) {
            return { id: year + "11" + today, name: "Remembrance Day", observed: true, observedDate: year + "1112" };
        }
        else {
            return { id: year + "11" + today, name: "Remembrance Day", observed: false };
        }
    },

    getChrismasDay: function (year, province = "Alberta") {
        const date = new Date(year, 11, 25);

        // The getDay() method returns the day of the week (from 0 to 6) for the specified date.
        var weekday = date.getDay();

        // today's date
        var today = date.getDate();

        // Saturday
        if (weekday === 6) {
            return { id: year + "12" + today, name: "Chrismas Day", observed: true, observedDate: year + "1224" };
        }
        // Sunday
        else if (weekday === 0) {
            return { id: year + "12" + today, name: "Chrismas Day", observed: true, observedDate: year + "1226" };
        }
        else {
            return { id: year + "12" + today, name: "Chrismas Day", observed: false };
        }
    },

    getEasterSunday: function (year, province = "Ontario") {
        var f = Math.floor,
            // Golden Number - 1
            G = year % 19,
            C = f(year / 100),
            // related to Epact
            H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
            // number of days from 21 March to the Paschal full moon
            I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
            // weekday for the Paschal full moon
            J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
            // number of days from 21 March to the Sunday on or before the Paschal full moon
            L = I - J,
            month = 3 + f((L + 40) / 44),
            day = L + 28 - 31 * f(month / 4);

        return new Date(year, month - 1, day);
    }
}
var USStockClosedOrHalfClosedDay = (function(){

    // 2021
    let Veterans_Day = {date: '20211111', isClosed: false, isHalfClosed: false, name: 'Veterans Day'};
    let Thanksgiving_Day = {date: '20211125', isClosed: true, isHalfClosed: false, name: 'Thanksgiving Day'};
    let Day_After_Thanksgiving = {date: '20211126', isClosed: false, isHalfClosed: true, name: 'Day After Thanksgiving'};
    let Christmas_Eve = {date: '20211224', isClosed: true, isHalfClosed: false, name: 'Christmas Eve'};
    let New_Year_Eve = {date: '20211231', isClosed: true, isHalfClosed: false, name: 'New Year\'s Eve'};

    return [Veterans_Day, Thanksgiving_Day, Day_After_Thanksgiving, Christmas_Eve, New_Year_Eve];
})();

export default USStockClosedOrHalfClosedDay;
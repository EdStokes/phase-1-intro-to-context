// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(function (row) {
        return createEmployeeRecord(row)
    })
}

function createTimeInEvent(employee, inputDate) {
    let [date, hour] = inputDate.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee;
}

function createTimeOutEvent(employee, inputDate) {
    let [date, hour] = inputDate.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee;
}

function hoursWorkedOnDate(employee, outputDate) {
    let inEvent = employee.timeInEvents.find(function (e) {
        return e.date === outputDate;
    })
    let outEvent = employee.timeOutEvents.find(function (e) {
        return e.date === outputDate;
    })
    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(employee, dateInput) {
    let wage = hoursWorkedOnDate(employee,dateInput) * employee.payPerHour;
    return parseFloat(wage.toString());
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(function(e) {
        return e.date;
    })
    let pay = dates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d)    
    }, 0);
    return pay;
}

function calculatePayroll(array) {
    return array.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0);
}


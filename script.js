const m = moment();
var scheduleArr = (localStorage.getItem("schedule") === null) ? [] : JSON.parse(localStorage.getItem("schedule"));

var auditTime = function (timeEl, timeInt) {
    timeEl.removeClass("bg-secondary bg-success bg-danger");
    momentInt = parseInt(m.format("HH"));
    if (momentInt > timeInt) {
        timeEl.addClass("bg-secondary");
    } else if (momentInt === timeInt) {
        timeEl.addClass("bg-danger");
    } else if (momentInt < timeInt) {
        timeEl.addClass("bg-success");
    }
};
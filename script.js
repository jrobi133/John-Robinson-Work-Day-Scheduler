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

var saveSchedule = function () {
    var tempScheduleArr = [];
    $("#schedule .row").each(function () {
        var this_row = $(this);
        var row_time = this_row.data("time");
        var row_taskEl = this_row.find("div:nth-child(2)");
        var row_task_text = row_taskEl.text();

        tempScheduleArr.push({
            [row_time]: row_task_text
        });
        auditTime(row_taskEl, row_time);
    });
    localStorage.setItem("schedule", JSON.stringify(tempScheduleArr));
};

var loadSchedule = function () {
    if (scheduleArr.length === 0) {
        return;
    };
    $.each(scheduleArr, function (index, objectData) {
        var hour = Object.keys(objectData)[0];
        var task = Object.values(objectData)[0];
        var targetRow = $("#schedule").find(`[data-time='${hour}']`);
        targetRow.find(".hourly-task").text(task);
    });
};


$("#currentDay").text(m.format("dddd, MMMM Do"));


$(function () {
    loadSchedule();

    $("#schedule .row").each(function () {
        var this_row = $(this);
        var row_time = this_row.data("time");
        var row_task = this_row.find("div:nth-child(2)");
        var row_button = this_row.find("div:nth-child(3)");
        auditTime(row_task, row_time);
    });
});

$(".hourly-task").on("click", function () {
    var childrenCount = $(this).find("textarea").length;
    if (childrenCount > 0) {
        $(this).empty();
    }
    var displayText = $(this).text().trim();
    var textInput = $("<textarea>").val(displayText);
    $(this).empty().append(textInput);
    textInput.trigger("focus");
});

$(".hourly-task").on("blur", "textarea", function () {
    var textInput = $(this).val().trim();
    $(this).closest(".hourly-task").text(textInput);
    saveSchedule();
});
$(".save-btn").on("click", saveSchedule);
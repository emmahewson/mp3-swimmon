// JavaScript functionality for forms

$(document).ready(function(){
    // form dropdown
    $('select').formSelect();

    // form datepicker
    let currentDate = new Date()
    $('.datepicker').datepicker({
        format: "dd/mm/yyyy",
        showClearBtn: true,
        autoclose: true,
        yearRange: [2023, 2026],
        minDate: currentDate,
    });

    // form timepicker
    $('.timepicker').timepicker();

  });
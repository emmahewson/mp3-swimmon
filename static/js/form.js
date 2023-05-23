// JavaScript functionality for forms

$(document).ready(function(){
    // form dropdown (select)
    $('select').formSelect();

    // handles validation on dropdown (select) inputs
    // gives user a message if dropdown item not selected
    // credit to: https://github.com/Dogfalo/materialize/issues/1861 
    $("select[required]").css({
        display: 'inline',
        position: 'absolute',
        float: 'left',
        padding: 0,
        margin: 0,
        border: '1px solid rgba(255,255,255,0)',
        height: 0, 
        width: 0,
        top: '2em',
        left: '50%'
    });

    // form datepicker
    let currentDate = new Date()
    let pickerDate;
    let dateInput = document.getElementById("event_date")

    // checks if input already contains date
    if (dateInput.value.length != 0) {
        // if so grabs that date, splits & reformats to Y,M,D
        // adapted from https://github.com/Dogfalo/materialize/issues/5974
        let oldDate = dateInput.value.split("/");
        pickerDate = new Date(oldDate[2], oldDate[1]-1, oldDate[0]);
    } 

    // date picker settings
    $('.datepicker').datepicker({
        format: "dd/mm/yyyy",
        autoClose: true,
        yearRange: [currentDate.getFullYear(), currentDate.getFullYear()+3],
        minDate: currentDate,
        defaultDate: pickerDate,
        setDefaultDate: true
    });

    // form timepicker
    $('.timepicker').timepicker({
        autoClose: true
    });
    
  });
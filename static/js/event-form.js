// JavaScript functionality for event forms

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
    let timeInput = document.getElementById("event_time")

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

    // Checks for event being added in the past on date & time input change
    dateInput.addEventListener('change', checkDateTime)
    timeInput.addEventListener('change', checkDateTime)

    // Runs validation on event time/date
    // Stops event in the past being submitted
    function checkDateTime() {

        // checks date & time have both been inputted
        if (dateInput.value.length != 0 && timeInput.value.length != 0) {

            // Splits the date string up
            const [day, month, year] = dateInput.value.split("/");

            // gets the inputted time value
            timeStr = timeInput.value

            // converts AM/PM time to 24hr
            // credit: https://www.tutorialspoint.com/converting-12-hour-format-time-to-24-hour-format-in-javascript
            const convertTime = timeStr => {
                const [time, modifier] = timeStr.split(' ');
                let [hours, minutes] = time.split(':');
                if (hours === '12') {
                    hours = '00';
                }
                if (modifier === 'PM') {
                    hours = parseInt(hours, 10) + 12;
                }
                return `${hours}:${minutes}`;
            };
        
            // creates 24hr time string
            time = convertTime(timeStr);

            // converts time & date to JS friendly format
            let dateTimeStr = `${year}-${month}-${day}T${time}:00.000`

            // gets present time/date
            now = new Date();

            // text warning element
            let warning = document.getElementById("past-event-message")
            let submitBtn = document.getElementById("event-submit")
        
            // compares current date/time to inputted date/time (parsed to milliseconds since Jan 1 1970)
            if (Date.parse(dateTimeStr) < Date.parse(now)) {
                // if date/time is in the past shows warning, adds invalid styling & disables submit button
                warning.classList.remove("hidden")
                submitBtn.setAttribute("disabled", "disabled");
                dateInput.classList.add("invalid")
                timeInput.classList.add("invalid")

                // adds extra event listener to date to allow user to fix by changing date
                dateInput.addEventListener('change', checkDateTime)

            } else {
                // if date/time is not in past hides warning, removes invalid styling, adds valid styling & enables submit button
                warning.classList.add("hidden")
                submitBtn.removeAttribute("disabled")
                dateInput.classList.remove("invalid")
                timeInput.classList.remove("invalid")
                dateInput.classList.add("valid")
                timeInput.classList.add("valid")
            }

        }
    }
  });



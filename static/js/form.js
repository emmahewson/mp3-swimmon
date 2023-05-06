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
    $('.datepicker').datepicker({
        format: "dd/mm/yyyy",
        autoClose: true,
        yearRange: [2023, 2026],
        minDate: currentDate,
        setDefaultDate: true
    });

    // form timepicker
    $('.timepicker').timepicker({
        autoClose: true
    });
    
    // scroll to popover info boxes on small screen devices
    // limited to small screens as on large screens the scroll moves hover trigger away from the cursor & the box disappears
    if (window.innerWidth <= 600) {
        const popTriggers = Array.from(document.querySelectorAll(".popover-wrapper"));
        for (let i = 0; i < popTriggers.length; i++) {
            popTriggers[i].addEventListener('click', () => {
                let popUp = popTriggers[i].querySelector('.popover-content');
                popUp.scrollIntoView({block: 'center'});
            })
        }
    }
  });
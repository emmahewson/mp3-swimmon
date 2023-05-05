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
    

    // scroll popover info boxes in to view on small screen devices
    // avoids losing the hover effect on larger screens as cursor scrolls off trigger
    // if (window.innerWidth <= 600) {
        const popTriggers = Array.from(document.getElementsByClassName("popover-trigger"));

        for (let i = 0; i < popTriggers.length; i++) {
            popTriggers[i].addEventListener('click', () => {
                popTriggers[i].nextElementSibling.scrollIntoView({block: 'center'});
            })
        }

        // popTriggers.forEach(trigger => {
        //     trigger.addEventListener('click', () => {
        //         trigger.nextElementSibling.scrollIntoView({block: 'center'});
        //     })
        // });

        // function addClickListener(item) {
        //     item.addEventListener('click', function() {
        //         item.nextElementSibling.scrollIntoView({block: 'center'});
        //     });
        // }

        // let locationTrigger = document.getElementById('pop-trigger-location');
        // locationTrigger.addEventListener("click", function() {
        //     document.getElementById('pop-location').scrollIntoView({block: 'center'});
        // });

        // let whoTrigger = document.getElementById('pop-trigger-who');
        // whoTrigger.addEventListener("click", function() {
        //     document.getElementById('pop-who').scrollIntoView({block: 'center'});
        // });

        // let challengeTrigger = document.getElementById('pop-trigger-challenge');
        // challengeTrigger.addEventListener("click", function() {
        //     document.getElementById('pop-challenge').scrollIntoView({block: 'center'});  
        // });
    // }

  });
$(document).ready(function(){
    $('.sidenav').sidenav({edge: "right"});
    $(".dropdown-trigger").dropdown();
    $('select').formSelect();

    let currentDate = new Date()
    $('.datepicker').datepicker({
        format: "dd/mm/yyyy",
        showClearBtn: true,
        autoclose: true,
        yearRange: [2023, 2026],
        minDate: currentDate,
    });

    $('.timepicker').timepicker();

    modalControl();
    collapse();
    scrollToTop();
  });

// collapsible content - taken from https://www.w3schools.com/howto/howto_js_collapsible.asp
function collapse() {
    let coll = document.getElementsByClassName("swim-collapsible");
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
          this.classList.toggle("collapse-open");
          var content = this.nextElementSibling;
          if (content.style.maxHeight){
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      }
}

// scroll to top button
function scrollToTop() {
    let button = document.getElementById("btt-btn");
    button.onclick = function() {
        window.scrollTo({top: 0, behaviour: 'smooth'});
    };
}


// Modal (infobox) functionality (multiple on a page)
// Adapted from https://stackoverflow.com/questions/40645032/creating-multiple-modals-on-a-single-page
function modalControl() {
    let triggers = document.querySelectorAll(".swim-modal-trigger");
    let modals = document.querySelectorAll('.swim-modal');
    let closers = document.getElementsByClassName("close");

    // When the user clicks the button, open the correct modal
    for (let i = 0; i < triggers.length; i++) {
        triggers[i].onclick = function(e) {
            modal = document.querySelector(e.target.getAttribute("href"));
            modal.style.display = "block";
        }
    }

    // When the user clicks on (x), close the modal
    for (let i = 0; i < closers.length; i++) {
        closers[i].onclick = function() {
            for (let index in modals) {
                if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
            }
        }
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target.classList.contains('swim-modal')) {
            for (let index in modals) {
                if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
            }
        }
    }
}

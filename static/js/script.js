$(document).ready(function(){
    $('.sidenav').sidenav({edge: "right"});
    $(".dropdown-trigger").dropdown();
    $('select').formSelect();
    infoBox();
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
    button.addEventListener("click", function() {
        window.scrollTo({top: 0, behaviour: 'smooth'});
    });
}

// info box modal trigger
function infoBox() {
    // Get the modal
    var modal = document.getElementById("location-modal");

    // Get the button that opens the modal
    var btn = document.getElementById("location-trigger");

    // Get the <span> element that closes the modal
    var close = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.classList.remove("hidden");
    }

    // When the user clicks on <span> (x), close the modal
    close.onclick = function() {
        modal.classList.add("hidden");
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.add("hidden");
    }
    }
}
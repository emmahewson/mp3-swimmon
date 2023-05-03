// JavaScript functionality for scroll to top button

$(document).ready(function(){
    scrollToTop();
  });

// scroll to top button
function scrollToTop() {
    let button = document.getElementById("btt-btn");
    button.onclick = function() {
        window.scrollTo({top: 0, behaviour: 'smooth'});
    };
}
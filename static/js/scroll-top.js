// JavaScript functionality for scroll to top button

$(document).ready(function(){
    scrollToTop();
  });

// scroll to top button
function scrollToTop() {
    $('#btt-btn').click(function() {
        window.scrollTo({top: 0, behaviour: 'smooth'});
    })
};
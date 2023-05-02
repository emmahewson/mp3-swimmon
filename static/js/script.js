$(document).ready(function(){
    $('.sidenav').sidenav({edge: "right"});
    $(".dropdown-trigger").dropdown();
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
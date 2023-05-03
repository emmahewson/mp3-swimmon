// JavaScript functionality for collapsible elements (search bar)

$(document).ready(function(){
    // search bar collapsible
    collapse();
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
$(document).ready(function(){

    // search bar collapsible
    collapse();

    // search filter button functionality
    searchEvents();
    
  });

      
  
// collapsible content - taken from https://www.w3schools.com/howto/howto_js_collapsible.asp
function collapse() {
    let coll = document.getElementsByClassName("swim-collapsible");
    for (i = 0; i < coll.length; i++) {

        coll[i].addEventListener("click", function() {
            this.classList.toggle("collapse-open");

            let content = this.nextElementSibling;

            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}

// search functionality

function searchEvents() {
    let searchFilterBtns = Array.from(document.getElementsByClassName("search-filter-btn"));

    for (let i = 0; i < searchFilterBtns.length; i++) {
        searchFilterBtns[i].addEventListener("click", function() {
            console.log("clicked")
            this.classList.toggle("swim-selected")
        })
    }
}
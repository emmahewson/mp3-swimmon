// Form info boxes (popovers)
$(document).ready(function(){
    
    /**
     * scroll to popover info boxes on small screen devices
     * limited to small screens as on large screens the scroll moves
     * hover trigger away from the cursor & the box disappears
     */
    if (window.innerWidth <= 600) {
        const popTriggers = Array.from(document.querySelectorAll(".popover-wrapper"));
        for (let i = 0; i < popTriggers.length; i++) {
            popTriggers[i].addEventListener('click', () => {
                let popUp = popTriggers[i].querySelector('.popover-content');
                popUp.scrollIntoView({block: 'center'});
            });
        }
    }
  });
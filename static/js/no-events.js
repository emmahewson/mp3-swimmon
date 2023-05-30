// Reveals 'no events' if no events are returned from the database
$(document).ready(function(){
    // no results message (nothing returned from database)
    noEvents();
});


function noEvents() {
    // creates an array of the event cards
    let cardResults = Array.from(document.getElementsByClassName('event-card'));
    // gets the error message
    let nothingReturnedMsg = document.getElementById('nothing-returned');

    // if no cards returned or visible then show 'no events' message
    if (cardResults.length == 0) {
        nothingReturnedMsg.classList.remove('hidden');
    } else {
        nothingReturnedMsg.classList.add('hidden');
    }
}

// search bar collapsible
collapse();


// search filter button functionality
// create array from search buttons
let searchBtns = Array.from(document.getElementsByClassName("search-filter-btn"));

// creates an array of the event cards
let eventCards = Array.from(document.getElementsByClassName('event-card'));

// creates an array for filtering events
let filteredEventCards = [];


// Adds an event listener to search buttons
for (let btn of searchBtns) {
    btn.addEventListener("click", function() {

        // adds a class of swim-selected to the clicked button
        addSelectedClass(this);
        
        // starts search functionality
        startSearch()
    })
}


// resets all event cards and visibility & instigates search
function startSearch() {

    // resets filter results
    resetSearch()

    // Creates an array of 'selected' buttons
    let selectedBtns = [];
    populateSelectedBtn(searchBtns, selectedBtns);
    console.log("selectedBtns Length: " + selectedBtns.length)

    
    // filters events if buttons are selected
    // stops all events disappearing when all buttons are 'deselected'
    if (selectedBtns.length > 0) {
        // Runs function to show/hide filtered events
        showFilteredEvents(selectedBtns, filteredEventCards)
    }
    
}
    


function showFilteredEvents(selectedBtns, filteredEventCards) {
    
    let btnCategory;
    let searchId;
    let targetElement;


    for (let btn of selectedBtns) {
        console.log(btn.innerText)

        // find out which category each button is in
        btnCategory = getBtnCategory(btn);
        console.log(btnCategory)

        // declare id for targeting where to search for matching event info
        searchId = "event-card-" + btnCategory;


        // Loop through event cards
        for (let i = 0; i < filteredEventCards.length; i++) {

            // sets the element on card to search - based on category
            targetElement = filteredEventCards[i].getElementsByClassName(searchId)[0];

            // removes any matching card from the eventCards array
            if (btn.innerText === targetElement.innerText) {
                filteredEventCards.splice(i, 1)
            }
        }
        console.log("filteredEventCards Array length - after each selected button is looped through: " + filteredEventCards.length);
    }

    console.log("filteredEventCards Array length - at the end of the showFilteredEvents function: " + filteredEventCards.length);


    // hides any cards left in the array (which didn't match any filter)
    for (let card of filteredEventCards) {
        card.classList.add("hidden");
    }


    
    


    
}


function resetSearch() {

    // remove hidden class from all cards to reset visibility
    for (let card of eventCards) {
        card.classList.remove("hidden");
    }

    // empties the filteredEventCards Array
    filteredEventCards = []

    // fills the filtered Event Cards array with all events
    filteredEventCards = [...eventCards];
    
}


// Adds 'selected' class to button
function addSelectedClass(btn) {
    btn.classList.toggle("swim-selected")
}


// Pushes 'selected' buttons to a new array
function populateSelectedBtn(searchBtns, selectedBtns) {

    // checks all search buttons for 'selected' class
    for (let btn of searchBtns) {

        // Pushes 'selected' buttons to selectedBtns array
        if (btn.classList.contains("swim-selected")) {
            selectedBtns.push(btn);
        }
    }

    return selectedBtns
}



// Finds the button's category (location, who, challenge)
function getBtnCategory(btn) {

    if (btn.classList.contains("location-btn")) {
        category = 'location'
    } else if (btn.classList.contains("who-btn")) {
        category = 'who'
    } else if (btn.classList.contains("challenge-btn")) {
        category = "challenge"
    }

    return category
}


 
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
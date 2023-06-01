// Events page search functionality
$(document).ready(function(){

    // search bar collapsible
    collapse();

    // search bar filter functionality
    searchEvents();

    // no results message (nothing returned from database)
    nothingReturned();
});

// collapsible search bar - taken from https://www.w3schools.com/howto/howto_js_collapsible.asp
function collapse() {
    let coll = document.getElementsByClassName("swim-collapsible");
    for (let i = 0; i < coll.length; i++) {

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

function nothingReturned() {

    // creates an array of the event cards
    let cardResults = Array.from(document.getElementsByClassName('event-card'));
    // gets the error message
    let nothingReturnedMsg = document.getElementById('nothing-returned')

    // checks if any of the cards are hidden (search filters)
    let visibleCards = [];
    for (let card of cardResults) {
        if (!card.classList.contains("hidden")) {
            visibleCards.push(card);
        }
    }
    
    // if no cards returned or visible then show 'no events/locations' message
    if (cardResults.length == 0 || visibleCards.length == 0) {
        nothingReturnedMsg.classList.remove('hidden')
    } else {
        nothingReturnedMsg.classList.add('hidden')
    }
}

/**
 * Handles all filtering of events based on user selecting filter buttons in different categories
 * User can filter by multiple selections within a category
 * e.g. women-only & all-welcome & see both results at once
 * When multiple categories are filtered, e.g. location & challenge,
 * events must match at least 1 selected filter in each category
 */
function searchEvents() {

    // create array from search buttons
    let searchBtns = Array.from(document.getElementsByClassName("search-filter-btn"));
    // creates an array of the event cards
    let eventCards = Array.from(document.getElementsByClassName('event-card'));

    // Adds an event listener to search buttons
    for (let btn of searchBtns) {
        btn.addEventListener("click", function() {
            // adds a class of swim-selected to the clicked button
            addSelectedClass(this);
            // starts search functionality
            runSearch();
        });
    }

    // reset button - on click removes all search filters & classes
    let resetBtn = document.getElementById("search-reset");
    resetBtn.addEventListener("click", function() {
        for (let btn of searchBtns) {
            btn.classList.remove("swim-selected");
        }
        showAllCards();
        nothingReturned();
    });

    // Handles all search functionality
    function runSearch() {

        // Creates arrays containing the 'selected' buttons in each category
        let locationSelectedBtns = populateSelectedBtn(searchBtns, "location-btn");
        let whoSelectedBtns = populateSelectedBtn(searchBtns, "who-btn");
        let challengeSelectedBtns = populateSelectedBtn(searchBtns, "challenge-btn");

        // creates an array of arrays of categories with 'selected' buttons
        let activeCategoryBtns = getActiveCategories(locationSelectedBtns, whoSelectedBtns, challengeSelectedBtns);

        // filters events based on each category's selected buttons
        let locationFilteredCards = filterCategory(locationSelectedBtns, "location");
        let whoFilteredCards = filterCategory(whoSelectedBtns, "who");
        let challengeFilteredCards = filterCategory(challengeSelectedBtns, "challenge");

        // creates an array of arrays of all categories' filtered results
        let allFilteredCardArrays = [locationFilteredCards, whoFilteredCards, challengeFilteredCards];

        // resets all cards to hidden
        hideAllCards();

        // checks how many categories are active & shows results accordingly
        calculateMatchingCards(activeCategoryBtns, allFilteredCardArrays);

        // adds 'no results' text if no events match chosen filters
        nothingReturned();
    }

    // calculates which event cards match chosen filters & reveals the results
    function calculateMatchingCards(activeCategoryBtns, allFilteredCardArrays) {

        // if no buttons are selected then all events appear
        if (activeCategoryBtns.length == 0) {
            showAllCards();

        /**
         * if filters in only 1 category are selected - reveals results
         * allows user to filter by multiple selections within a category
         * (e.g. show results for multiple locations at once)
         */
        } else if (activeCategoryBtns.length == 1){

            // reveals the matching events for the filtered card array that contains results
            for (let i = 0; i < allFilteredCardArrays.length; i++) {
                if (allFilteredCardArrays[i].length >= 1) {
                    cardReveal(allFilteredCardArrays[i]);
                }
            }
            
        // if filters in more than 1 category have been selected - reveals results
        } else if (activeCategoryBtns.length >= 2) {

            // finds the categories which produced matching results & pushes them in to 'categoriesWithResults' array of arrays
            let categoriesWithResults = [];
            for (let i = 0; i < allFilteredCardArrays.length; i++) {
                if (allFilteredCardArrays[i].length >= 1) {
                    categoriesWithResults.push(allFilteredCardArrays[i]);
                }
            }
            // array to contain the matching results to reveal
            let matches = [];

            /**
             * checks how many arrays contained results & matches them against the eventCards array
             * checks if all of the selected categories have produced results (if not there will be no matches) - Bug 7 fix
             */
            if (activeCategoryBtns.length === categoriesWithResults.length) {

                // if filters in 2 categories selected & both produce results
                if (categoriesWithResults.length == 2) {

                    /**
                     * loops through all events from original eventCards array
                     * if event appears in both selected categories' results - pushes it to 'matches' array
                     */ 
                    for (let card of eventCards) {
                        if (categoriesWithResults[0].includes(card) && categoriesWithResults[1].includes(card)) {
                            matches.push(card);
                        }
                    }

                // if filters in 3 categories selected & all produce results
                } else if (categoriesWithResults.length == 3) {

                    /** 
                     * loops through all events from original eventCards array
                     * if event appears in all selected categories' results - pushes it to 'matches' array
                     */
                    for (let card of eventCards) {
                        if (categoriesWithResults[0].includes(card) && categoriesWithResults[1].includes(card) && categoriesWithResults[2].includes(card)) {
                            matches.push(card);
                        }
                    }
                } 
            } 
            // removes 'hidden' class from matches to reveal results
            cardReveal(matches);
        }
    }

    // Pushes 'selected' buttons to a new array
    function populateSelectedBtn(originalButtonArray, categoryName) {

        let finalButtonArray = [];

        // checks all search buttons for 'selected' class
        for (let btn of originalButtonArray) {

            // Pushes 'selected' buttons to selectedBtns array
            if (btn.classList.contains("swim-selected") && btn.classList.contains(categoryName)) {
                finalButtonArray.push(btn);
            }
        }
        return finalButtonArray;
    }

    // Creates an array of arrays of categories' 'selected' buttons
    function getActiveCategories(locationSelectedBtns, whoSelectedBtns, challengeSelectedBtns) {
        let result = [];

        if (locationSelectedBtns.length > 0) {
            result.push(locationSelectedBtns);
        }
        if (whoSelectedBtns.length > 0) {
            result.push(whoSelectedBtns);
        }
        if (challengeSelectedBtns.length > 0) {
            result.push(challengeSelectedBtns);
        }

        return result;
    }

    // filters the event results for a single category
    function filterCategory(selectedBtnArray, btnCategory) {

        let filteredEvents = [];
        for (let btn of selectedBtnArray) {
            // Loop through event cards
            for (let card of eventCards) {
                // declare class for targeting element to search for matching event info
                let searchClass = "event-card-" + btnCategory;
                // sets the element on card to search - based on category
                let targetElement = card.getElementsByClassName(searchClass)[0];
                // removes any matching card from the eventCards array
                if (btn.innerText.toLowerCase() === targetElement.innerText.toLowerCase()) {
                    filteredEvents.push(card);
                }
            }
        }
        return filteredEvents;
    }

    // Reveals event cards that match filters
    function cardReveal(array) {
        for (let card of array) {
            card.classList.remove("hidden");
        }
    }

    // Adds 'selected' class to button
    function addSelectedClass(btn) {
        btn.classList.toggle("swim-selected");
    }

    // Hides all cards
    function hideAllCards() {
        // remove hidden class from all cards to reset visibility
        for (let card of eventCards) {
            card.classList.add("hidden");
        }
    }

    // shows all cards
    function showAllCards() {
        for (let card of eventCards) {
            card.classList.remove("hidden");
        }
    }
}
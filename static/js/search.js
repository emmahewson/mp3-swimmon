$(document).ready(function(){
    // search bar collapsible
    collapse();

    // search bar filter functionality
    eventSearch();

});



// collapsible search bar - taken from https://www.w3schools.com/howto/howto_js_collapsible.asp
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


// search filter button functionality
function eventSearch() {

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
            startSearch()
        })
    }

    let resetBtn = document.getElementById("search-reset") 
    resetBtn.addEventListener("click", function() {
        console.log("clicked on reset button")
        for (let btn of searchBtns) {
            btn.classList.remove("swim-selected")
        }
        for (let card of eventCards) {
            card.classList.remove("hidden")
        }
        noResultsMessageToggle();
    })


    // resets all event cards and visibility & instigates search
    function startSearch() {

        // Creates arrays containing the 'selected' buttons in each category
        let locationSelectedBtns = populateSelectedBtn(searchBtns, "location-btn");
        let whoSelectedBtns = populateSelectedBtn(searchBtns, "who-btn");
        let challengeSelectedBtns = populateSelectedBtn(searchBtns, "challenge-btn");

        // calculates how many categories have 'selected' buttons
        let activeCategoryBtns = getActiveCategories(locationSelectedBtns, whoSelectedBtns, challengeSelectedBtns);

        // filters each category's results based on selected buttons
        let locationFilteredCards = filterCategory(locationSelectedBtns, "location")
        let whoFilteredCards = filterCategory(whoSelectedBtns, "who")
        let challengeFilteredCards = filterCategory(challengeSelectedBtns, "challenge")

        // creates an array of arrays of each category's filtered results
        let allFilteredCardArrays = [locationFilteredCards, whoFilteredCards, challengeFilteredCards]

        
        // checks how many categories have had a button selected (location, challenge, who)

        // if all buttons are deselected then all results show
        if (activeCategoryBtns.length == 0) {
            showAllCards();

        // if buttons in only 1 category have been selected
        // results can be filtered by multiple selections within that category at once
        } else if (activeCategoryBtns.length == 1){
            
            // resets all cards to hidden
            hideAllCards();

            // reveals cards that match any of the selected button filters within a single category
            // loops through all 3 categories' filtered results
            for (i = 0; i < allFilteredCardArrays.length; i++) {
                // reveals the cards within the filtered results
                cardReveal(allFilteredCardArrays[i])
            }

        // if buttons in more than 1 category had been selected
        // results must match all active categories
        } else if (activeCategoryBtns.length >= 2) {

            // resets all cards to hidden
            hideAllCards();

            // finds the arrays which produced card results & pushes them in to 'usedCategories' array of arrays
            let usedCategories = [];
            for (i = 0; i < allFilteredCardArrays.length; i++) {
                if (allFilteredCardArrays[i].length >= 1) {
                    usedCategories.push(allFilteredCardArrays[i]);
                }
            }

            // checks how many arrays contained results & matches them against the eventCards array
            let matches = [];
            if (usedCategories.length == 2) {
                for (let card of eventCards) {
                    if (usedCategories[0].includes(card) && usedCategories[1].includes(card)) {
                        matches.push(card);
                    }
                }
            } else if (usedCategories.length == 3) {
                for (let card of eventCards) {
                    if (usedCategories[0].includes(card) && usedCategories[1].includes(card) && usedCategories[2].includes(card)) {
                        matches.push(card);
                    }
                }
            } else {
                // if 1 or less arrays have produced results (whilst more than 1 category button selected) - no matches
                noResultsMessageToggle();
            }
            cardReveal(matches);
        }

    }


    // makes all filtered cards visible & triggers 'no results message' if none
    function cardReveal(array) {
        for (card of array) {
            card.classList.remove("hidden");
        }
        noResultsMessageToggle();
    }

    // Triggers 'no results' message if no events are visible
    function noResultsMessageToggle() {
        let visibleCards = [];
        for (card of eventCards) {

            if (!card.classList.contains("hidden")) {
                visibleCards.push(card);
            }
        }

        if (visibleCards.length == 0) {
            document.getElementById("results-message").classList.remove("hidden");
        } else {
            document.getElementById("results-message").classList.add("hidden");
        }
    }


    // Adds 'selected' class to button
    function addSelectedClass(btn) {
        btn.classList.toggle("swim-selected")
    }


    // hides all cards
    function hideAllCards() {
        // remove hidden class from all cards to reset visibility
        for (let card of eventCards) {
            card.classList.add("hidden");
        }
    }


    // makes all cards visible
    function showAllCards() {
        for (let card of eventCards) {
            card.classList.remove("hidden");
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


    // filters the event results for a single category
    function filterCategory(selectedBtnArray, btnCategory) {

        let filteredEvents = [];

        for (let btn of selectedBtnArray) {
            // Loop through event cards
            for (let card of eventCards) {
                // declare class for targeting element to search for matching event info
                searchClass = "event-card-" + btnCategory;
                // sets the element on card to search - based on category
                targetElement = card.getElementsByClassName(searchClass)[0];
                // removes any matching card from the eventCards array
                if (btn.innerText.toLowerCase() === targetElement.innerText.toLowerCase()) {
                    filteredEvents.push(card);
                }
            }
        }
        return filteredEvents
    }


    // Creates an array of arrays of categories' selected buttons
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
}


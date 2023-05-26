// Location Picker - for generating Latitude & Longitude values for Add/Edit Location Forms
// Get variables for open/close location picker
let latBox = document.getElementById("latitude");
let lngBox = document.getElementById("longitude");
let overlayBoxes = Array.from(document.getElementsByClassName("coord-clicker"));
let modal = document.getElementById("lp-modal");


// Open Location Picker when user clicks on latitude / longitude input fields or div overlay (bug fix - readonly)
let boxes = [latBox, lngBox];
boxes.push(...overlayBoxes)
for (box of boxes) {
    // opens the modal on user click
    box.addEventListener('click', function(){
        modal.classList.remove("hidden");
    })
    // opens the modal on focus (for use of 'tab' key)
    box.addEventListener('focus', function(){
        modal.classList.remove("hidden");
    })
}

// Close location picker box (cross icon)
document.getElementById("lp-close").addEventListener('click', function(){
    modal.classList.add("hidden");
})

// Close location picker box (click outside box)
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.add("hidden");
    }
}

// Google Map Main Function - Map Picker (Uses Google Maps API)
function initMap() {

    // sets value for centre of Anglesey
    let centerMon = {
        lat: 53.286409181339444,
        lng: -4.359635469750749
    }

    // sets start position on map
    // if data in boxes is valid sets map to that position, else centre of Anglesey
    let startPosition = {}
    let latInput = Number(latBox.value);
    let lngInput = Number(lngBox.value);
    if (typeof latInput == 'number' &&
        latInput >= 53.1 &&
        latInput <= 53.5 &&
        typeof lngInput == 'number' &&
        lngInput >= -4.8 &&
        lngInput <= -4.0) {
            startPosition = {
                lat: latInput,
                lng: lngInput
            }
    } else {
        startPosition = centerMon;
    }

    // sets map zoom level based on screen size (so whole island is visible)
    let zoomLevel;
    let width = screen.width;
    if (width <= 600) {
        zoomLevel = 9;
    } else {
        zoomLevel = 10;
    }
    
    // creates map with above zoom & position settings
    const map = new google.maps.Map(document.getElementById("lp-map"), {
        zoom: zoomLevel,
        center: startPosition,
        gestureHandling: "greedy",
    });

    // declare new google Maps marker (draggable for relocation)
    let marker = new google.maps.Marker({
        map: map,
        position: startPosition,
        draggable: true,
    });


    // Handles location selection on drag & drop of maker
    let chosenLat;
    let chosenLng;

    if (startPosition != centerMon) {
        chosenLat = marker.getPosition().lat();
        chosenLng = marker.getPosition().lng();
    }


    // User drops marker
    google.maps.event.addListener(marker, 'dragend', function(){

        // centres the map on the dropped marker
        map.setCenter(marker.getPosition());

        // gets the marker's new location
        let mLat = marker.getPosition().lat();
        let mLng = marker.getPosition().lng();

        // Stops user selecting a location outside Anglesey
        if (mLat >= 53.1 && mLat <= 53.5 && mLng >= -4.8 && mLng <= -4.0) {
            chosenLat = marker.getPosition().lat();
            chosenLng = marker.getPosition().lng();
        } else {
            // Error message if user selects location outside of Anglesey
            locErrorOn();
            // resets map
            resetMap();
            // removes error message
            setTimeout(locErrorOff, 1500);
        }
    });

    // error message functions: if user drags marker outside designated co-ordinates
    let errorMessage = document.getElementById("lp-error-message");
   
    // Reveal error message
    function locErrorOn() {
        errorMessage.classList.remove("hidden");
        errorMessage.classList.add("lp-animate");
    }

    // Hide error message
    function locErrorOff() {
        errorMessage.classList.remove("lp-animate");
        setTimeout(function() {
            errorMessage.classList.add("hidden")
        }, 350);
    }


    // Save button: closes box and fills form inputs with marker location
    let saveBtn = document.getElementById("lp-save");
    saveBtn.addEventListener('click', function(){
        latBox.value = chosenLat;
        lngBox.value = chosenLng;
        modal.classList.add("hidden");
    });


    // reset button: sets the marker & map back to the centre of Anglesey
    let resetBtn = document.getElementById("lp-reset");
    resetBtn.addEventListener('click', function() {
        resetMap();
        if (startPostion === centerMon) {
            latBox.value = '';
            lngBox.value = '';
        }
    });

    
    // Function to reset map to start position (if previously set) or centre of Anglesey
    function resetMap() {
        marker.setPosition(startPosition);
        map.setCenter(startPosition);
        map.setZoom(zoomLevel);
    }
};


// gets input box elements for lat / long
let latBox = document.getElementById("latitude");
let lngBox = document.getElementById("longitude");

// gets modal element
let modal = document.getElementById("lp-modal");

// Adds a click event to boxes to open modal
let boxes = [latBox, lngBox];
for (box of boxes) {

    // opens the modal on user click
    box.addEventListener('click', function(){
        modal.classList.remove("hidden");
        // removes focus on box to prevent mobile keyboard opening
        box.blur();
    })
    // opens the modal on focus (for use of 'tab' key)
    box.addEventListener('focus', function(){
        modal.classList.remove("hidden");
        // removes focus on box to prevent mobile keyboard opening
        box.blur();
    })
}


// Google Map Functionality
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
        center: startPosition
    });

    // declare new google Maps marker (draggable for relocation)
    let marker = new google.maps.Marker({
        map: map,
        position: startPosition,
        draggable:true,
    });

    let chosenLat;
    let chosenLng;
    // centres the map on the marker when the marker is dropped
    google.maps.event.addListener(marker, 'dragend', function(){
        map.setCenter(marker.getPosition());
        let mLat = marker.getPosition().lat();
        let mLng = marker.getPosition().lng();

        if (mLat >= 53.1 && mLat <= 53.5 && mLng >= -4.8 && mLng <= -4.0) {
            chosenLat = marker.getPosition().lat();
            chosenLng = marker.getPosition().lng();
        } else {
            alert("Your location must be on The Island of Anglesey / Ynys Môn")
            marker.setPosition(centerMon);
            map.setCenter(centerMon);
            map.setZoom(zoomLevel);
        }
    });

    // Save button closes box and fills form inputs with marker location
    let saveBtn = document.getElementById("lp-save");
    saveBtn.addEventListener('click', function(){
        latBox.value = chosenLat;
        lngBox.value = chosenLng;
        modal.classList.add("hidden");
    });

    // reset button sets the marker & map back to the centre of Anglesey
    let resetBtn = document.getElementById("lp-reset");
    resetBtn.addEventListener('click', function(){
        marker.setPosition(centerMon);
        map.setCenter(centerMon);
        map.setZoom(zoomLevel);
        latBox.value = '';
        lngBox.value = '';
    });
};

    // close location picker box (cross icon) - doesn't save location
    document.getElementById("lp-close").addEventListener('click', function(){
        modal.classList.add("hidden");
    })

    // close location picker box (click outside box) - doesn't save location
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.add("hidden");
        }
    }

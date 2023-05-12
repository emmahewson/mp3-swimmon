
// gets input box elements for lat / long
let latBox = document.getElementById("latitude");
let lngBox = document.getElementById("longitude");

let modal = document.getElementById("lp-modal");

// Opens the location picker modal when lat/long input boxes are clicked
let boxes = [latBox, lngBox];
for (box of boxes) {
    box.addEventListener('click', function(){
        modal.classList.remove("hidden");
    })
}

// closes the modal if user clicks outside of map
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.add('hidden');
    }
}

// Handles Google Map creation & population
function initMap() {

    // sets value for centre of Anglesey
    let centerMon = {
        lat: 53.286409181339444,
        lng: -4.359635469750749
    }

    // sets start position on map
    // if data in boxes is valid sets map to that position, else centre of Anglesey
    let startPosition = {}
    if (latBox.checkValidity() && lngBox.checkValidity()) {
        startPosition = {
            lat: latBox.value,
            lng: lngBox.value
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
        position: {lat: 53.286409181339444, lng: -4.359635469750749},
        draggable:true,
    });

    // centres the map on the marker when the marker is dropped
    google.maps.event.addListener(marker, 'dragend', function(){
        map.setCenter(marker.getPosition());
    });

    // reset button sets the marker & map back to the centre of Anglesey
    let resetBtn = document.getElementById("lp-reset");
    resetBtn.addEventListener('click', function(){
        marker.setPosition(centerMon);
        map.setCenter(centerMon);
        map.setZoom(zoomLevel);
    });

    // select button populates the form inputs & closes the modal
    let selectBtn = document.getElementById("lp-select");
    selectBtn.addEventListener('click', function(){
        latBox.value = marker.getPosition().lat();
        lngBox.value = marker.getPosition().lng();
        modal.classList.add("hidden");
    });

};




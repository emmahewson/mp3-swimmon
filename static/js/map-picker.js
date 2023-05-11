
// Function for location picker

function initMap() {

    let zoomLevel;
    let width = screen.width;
    if (width <= 600) {
        zoomLevel = 9;
    } else {
        zoomLevel = 10;
    }
    
    const map = new google.maps.Map(document.getElementById("location-picker"), {
        zoom: zoomLevel,
        center: {
            lat: 53.286409181339444,
            lng: -4.359635469750749
        }
    });

    // declare new google Maps marker
    let marker = new google.maps.Marker({
        map: map,
        position: {lat: 53.286409181339444, lng: -4.359635469750749},
        draggable:true,
    });


    let myLatLong = [];

    google.maps.event.addListener(marker, 'dragend', function(){
        let lat = marker.getPosition().lat();
        let lng = marker.getPosition().lng();
        
        myLatLong = [lat, lng];
        console.log("lat:" + lat)
        console.log("long:" + lng)
        console.log("myLatLong: "+myLatLong);
        document.getElementById("latitude").value = lat;
        document.getElementById("longitude").value = lng;
    });
};




// Event Page Map
function initMap() {

    latitude = Number(document.getElementById('latitude').innerHTML);
    longitude = Number(document.getElementById('longitude').innerHTML);
    
    const map = new google.maps.Map(document.getElementById("map-event"), {
        zoom: 11,
        center: {
            lat: latitude,
            lng: longitude
        }
    });

    // declare new google Maps marker
    let marker = new google.maps.Marker({
        map: map,
        position: {lat: latitude, lng: longitude},
    });
};
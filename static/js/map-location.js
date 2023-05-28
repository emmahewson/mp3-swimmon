// Location Page Map
function initMap() {

    let latitude = Number(document.getElementById('latitude').innerHTML);
    let longitude = Number(document.getElementById('longitude').innerHTML);
    
    const map = new google.maps.Map(document.getElementById("map-location"), {
        zoom: 15,
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
}
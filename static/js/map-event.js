function initMap() {

    latitude = Number(document.getElementById('latitude').innerHTML);
    longitude = Number(document.getElementById('longitude').innerHTML);
    // declaring map settings
    const options = { 
        zoom: 11,
        center: {
            lat: latitude,
            lng: longitude
        }
    };


// Fetch request connects GoogleMaps with the MongoDB database
// Creates a JSON file with the collection
// Adapted from https://github.com/isntlee/Sagacity/blob/master/templates/home.html
// Credit Lee Martina
    fetch('/fetch')
        .then(response => response.json())
        .then(data => { 
            fetchFunction(data);
        })
        .catch(err => console.log(err));


    function fetchFunction(data) {

        let nameText = document.getElementById("name-text").innerText;
        let location;
        for(let i = 0; i < data.length; i++){
            let locationName = data[i].name
            if(locationName.toLowerCase() == nameText.toLowerCase()) {
                location = data[i];
            }
        }
        console.log(location.name);

        // declare new google Maps marker
        let marker = new google.maps.Marker({
            map: map,
            position: {lat: parseFloat(location.lat), lng: parseFloat(location.long)},
            title: location.name
        });
    };
    
    // create map
    map = new google.maps.Map(document.getElementById("map-event"), options);
}
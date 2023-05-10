
function initMap() {
    
    // declaring map settings
    const options = { 
        zoom: 10,
        center: {
            lat: 53.286409181339444,
            lng: -4.359635469750749
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

        // declare variables for infoWindow from JSON 'data'
        for(let i = 0; i < data.length; i++){
            let popupLocation = {lat: parseFloat(data[i].lat), lng: parseFloat(data[i].long)};
            let popupName = data[i].name;
            let popupImage = data[i].image_url;
            let popupDescriptionFull = data[i].description;
            let popupDescription = popupDescriptionFull.slice(0, 150)+"..."
            let locationId = data[i]._id;

            // declare HTML content for infoWindow using JSON data
            let infoContent =

                '<div id="iw-container">' +
                '<div class="iw-title swim-bg-dblue swim-txt-white">' +
                    '<a href="/location/'+locationId+'" class="swim-iw-link-head"><h2 class="font-title weight-300 swim-txt-white">'+popupName.toUpperCase()+'</h2></a>' +
                '</div>' +
                '<a href="/location/'+locationId+'" class="swim-iw-link">' +
                    '<div class="iw-content swim-bg-white">' +
                        '<div class="iw-img-div">' +
                            '<img src='+popupImage+'&width=400/>' +
                        '</div>' +
                        '<p class="map_reader font-body swim-txt-dblue weight-500">'+popupDescription+'</p>'+
                    '</div>' +
                '</a>'
            
        
            // declare new google Maps marker
            let marker = new google.maps.Marker({
            position: popupLocation,
            map: map,
            title: popupName, 
            info : infoContent
            });
        
            // declare new infoWindow
            let infoWindow = new google.maps.InfoWindow({
            content: infoContent
            });
        
            // add marker click event listener - show infoWindow
            google.maps.event.addListener(marker, "click", function () {
                infoWindow.setContent( this.info );
                infoWindow.open( map, this );
                google.maps.event.addListener(map, "click", function(event) {
                    infoWindow.close();
                });
            });
        }
    }
    
    // create map
    let map = new google.maps.Map(document.getElementById("map-home"), options);
}
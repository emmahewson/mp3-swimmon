// Function for map on Home Page with multiple markers

function initMap() {

    // Sets zoom level - zoomed out on smaller screens to show all markers
    let zoomLevel;
    let width = screen.width;
    if (width <= 600) {
        zoomLevel = 9;
    } else {
        zoomLevel = 10;
    }
    
    // declaring map settings
    const options = { 
        zoom: zoomLevel,
        center: {
            lat: 53.286409181339444,
            lng: -4.359635469750749
        }
    };

    /**
     * Fetch request connects GoogleMaps API with the MongoDB database
     * Creates a JSON file with the collection
     * Creates a JSON file with the collection
     * Adapted from https://github.com/isntlee/Sagacity/blob/master/templates/home.html
     * Credit Lee Martina
     */
    fetch('/fetch')
        .then(response => response.json())
        .then(data => { 
            fetchFunction(data);
    });

    function fetchFunction(data) {
        // create new infoWindow
        // (solution to bug 3 - adapted from https://www.aspsnippets.com/Articles/Google-Maps-API-V3-Open-Show-only-one-InfoWindow-at-a-time-and-close-other-InfoWindow.aspx)
        let infoWindow = new google.maps.InfoWindow();

        // loop through JSON data to create markers & infoWindow content
        for(let i = 0; i < data.length; i++){
            // declare variables from JSON data
            let popupLocation = {lat: parseFloat(data[i].lat), lng: parseFloat(data[i].long)};
            let popupName = data[i].name;
            let popupImage = data[i].image_url;
            let popupDescriptionFull = data[i].description;
            let popupDescription = popupDescriptionFull.slice(0, 150)+"...";
            let locationId = data[i]._id;

            // declare HTML content for infoWindow using JSON data
            let infoContent =

                '<div id="iw-container">' +
                '<div class="iw-title swim-bg-dblue swim-txt-white">' +
                    '<div class="iw-location-name-div">'+
                        '<h2 class="font-title weight-300 swim-txt-white">' +
                            '<a href="/location/'+locationId+'" class="swim-iw-link-head">'+popupName.toUpperCase()+'</a>' +
                        '</h2>' +
                    '</div>' +
                '</div>' +
                '<a href="/location/'+locationId+'" class="swim-iw-link">' +
                    '<div class="iw-content swim-bg-white">' +
                        '<div class="iw-img-div">' +
                            '<img src='+popupImage+' alt="Image of '+popupName+'" onerror="this.onerror=null; this.src=`https://swim-mon.herokuapp.com/static/images/sm-beach.jpg`;">' +
                        '</div>' +
                        '<p class="map_reader font-body swim-txt-dblue weight-500">'+popupDescription+'</p>'+
                    '</div>' +
                '</a>';
            
        
            // declare new google Maps marker with attached infoWindow content
            let marker = new google.maps.Marker({
            position: popupLocation,
            map: map,
            title: popupName, 
            info : infoContent
            });
            
            // add marker click event listener - show infoWindow
            google.maps.event.addListener(marker, "click", function () {
                infoWindow.setContent( this.info );
                infoWindow.open( map, this );

                // close infoWindow when user clicks outside of current infoWindow
                google.maps.event.addListener(map, "click", function() {
                    infoWindow.close();
                });
            });
        }
    }
    
    // create map
    let map = new google.maps.Map(document.getElementById("map-home"), options);
}
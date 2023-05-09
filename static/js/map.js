// This is the GoogleMaps API, see: https://developers.google.com/maps/documentation/javascript/overview. 

function initMap() {
     
    var options = { 
        zoom: 10,
        center: {
            lat: 53.286409181339444,
            lng: -4.359635469750749
        }
    };


//  Fetch request connects GoogleMaps with the database:
// https://github.com/isntlee/Sagacity/blob/master/templates/home.html CREDIT TO GO HERE
    fetch('/fetch')
        .then(response => response.json())
        .then(data => { 
            fetchFunction(data);
        })
        .catch(err => console.log(err));


    function fetchFunction(data) {
        console.log(data); // REMOVE LATER!!!


        // Google Maps markers & info window

        for(var i = 0; i < data.length; i++){
            var popupLocation = {lat: parseFloat(data[i].lat), lng: parseFloat(data[i].long)};
            var popupName = data[i].name;
            var popupImage = data[i].image_url;
            var popupDescription = data[i].description;
            // var locationId = (data[i]._id);
            // var fullSaga = "{{url_for('singleSaga',saga_id=id)}}";
            // var singleSagaLink = fullSaga.concat(id);
            var infoContent =

                '<div id="iw-container">' +
                '<div class="iw-title swim-bg-dblue swim-txt-white">' +
                    '<h2 class="font-title weight-300">'+popupName.toUpperCase()+'</h2>' +
                '</div>' +
                '<div class="iw-content">' +
                    '<img src='+popupImage+'/>' +
                    '<p class="map_reader font-body swim-txt-dblue weight-500">'+popupDescription+'</p>'+
                '</div>'
            
        
            var marker = new google.maps.Marker({
            position: popupLocation,
            map: map,
            title: popupName, 
            info : infoContent
            });
        
            var infoWindow = new google.maps.InfoWindow({
            content: infoContent
            });
        
        
            google.maps.event.addListener(marker, "click", function () {
            infoWindow.setContent( this.info );
            infoWindow.open( map, this );
            });
            }
    }
        var map = new google.maps.Map(document.getElementById("map-home"), options);
  }
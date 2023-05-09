const locationData = [
    {
        id: "1",
        name: "llanddwyn",
        lat: 53.1383738620242,
        lng: -4.40956218341748,
        url: "https://www.fotovue.com/wp-content/uploads/2016/10/IMGP1890-scaled.jpg",
        description: "Llanddwyn is backed by impressive sand dunes and boasts spectacular views of Snowdonia National Park.  The shore is mostly fine sand with small amounts of shingle.  Parking is at a car park in the forest and their is a toll to pay.  Swimming is generally safe on the main section of the beach but there are currents towards Abermenai point."
    },
    {
        id: "2",
        name: "bull bay",
        lat: 53.4223532764305,
        lng: -4.37036784126376,
        url: "https://www.walestouristsonline.co.uk/pictures/mainpics/2338_DGG72M57DCQ5.jpg",
        description: "The beach here is small but it is right in the centre of the village so has great access. It's very sheltered and often has beautifully clear water so great for snorkelling. You can often see porpoises & seals along the coast here."
    },
    {
        id: "3",
        name: "porth dafarch",
        lat: 53.2889214034311,
        lng: -4.65112218520668,
        url: "https://www.angleseyoutdoors.com/images/art/porth-dafarch/porth-dafarch-pan-1.jpg",
        description: "Porth Dafarch a sheltered west facing sandy beach nestled below rugged headlands with safe paddling and swimming. The beach is mainly soft sand on the upper shore with some shale and with plenty of rockpools to explore the amazing sea life. Porth Dafarch is one of just 6 beaches on Anglesey to have Blue Flag status for its water quality and cleanliness.  The beach is cleaned every morning during high season and there are good waste facilities."
    },
    {
        id: "4",
        name: "porth trecastell",
        lat: 53.2082921401576,
        lng: -4.49852597745766,
        url: "https://www.holidaysanglesey.co.uk/perch/resources/porth-trecastell-beach-1-corrected-w720pxh520px.jpg",
        description: "Also known as Cable Bay this beach is one of those more remote beaches on this side of the island. This clean and sandy beach is very popular in the summer with families as it is sheltered and safe for swimming and snorkelling. Like many beaches on this side of Anglesey the water quality is excellent."
    },
    {
        id: "5",
        name: "porth swtan",
        lat: 53.3718075388366,
        lng: -4.55572407457489,
        url: "https://www.visitanglesey.co.uk/ImageGen.ashx?image=/media/445871/church-bay-1280-x-618.jpg&width=1280&height=618&altimage=/assets/images/missing-things-to-do.jpg",
        description: "Also known as Church Bay, a popular beach, mostly sand with rock pools to either side.  A Beach Warden is in attendance from late May until early September.  Swimming is generally safe and the high cliffs provide good shelter from the wind.  Facilities include a car park, toilets cafe and seafood restaurant."
    },
    {
        id: "6",
        name: "cemaes bay",
        lat: 53.4151880659892,
        lng: -4.44763758496992,
        url: "https://www.cluedinwithkids.co.uk/wp-content/uploads/2019/05/AdobeStock_52856375.jpeg-1600.jpeg",
        description: "There are actually two beaches at Cemaes; this one, Traeth Mawr which means “big beach”, and another, Traeth Bach, just around from the harbour. Traeth Bach (Little Beach) has a mix of sand, pebbles and rocks, making it perfect for children to explore. Build sandcastles, collect shells, explore the rich life of the rockpools or just clamber over the rocks. The beach all but disappears at high tide, but you can still discover Samson's Rock, which is steeped in village folklore."
    },
]

console.log(locationData[0].lat)

function initMap() {
    const map = new google.maps.Map(document.getElementById("map-home"), {
        zoom: 10,
        center: {
            lat: 53.286409181339444,
            lng: -4.359635469750749
        }
    });

    const locations = [];
    const labels = [];
    for (let i = 0; i < locationData.length; i++) {
        latLong = {
            lat: locationData[i].lat,
            lng: locationData[i].lng
        }
        locations.push(latLong);
        labels.push(locationData[i].name);
    }
;

const locationPopup = document.getElementById('location-popup');
const locationName = document.getElementById('location-popup-name');
const locationDescription = document.getElementById('location-popup-description');
const image = document.getElementById('location-popup-image');

// Populating the Map with Highlight Markers & attaching text & photos to each marker ready to be called on click
for (let i = 0; i < locationData.length; i++) {
    let data = locationData[i];
    let myLatlng = new google.maps.LatLng(data.lat, data.lng);
    let marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        name: data.name,
        description: data.description,
        url: data.url
    });

    //Attach click event to the marker & populate popup with data
    (function (marker, data) {
        google.maps.event.addListener(marker, "click", function (e) {
            locationName.innerText = this.name;
            locationDescription.innerText = this.description;
            image.src = this.url;
            locationPopup.classList.toggle("hidden");
        });
    })(marker, data);
}



    // const markers = locations.map((position, i) => {
    //     const label = labels[i % labels.length];
    //     const marker = new google.maps.Marker({
    //       position,
    //       label,
    //     });
    
    //     marker.addListener("click", () => {
    //       infoWindow.setContent(label);
    //       infoWindow.open(map, marker);
    //     });
    //     return marker;
    //   });

    //   const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });

}

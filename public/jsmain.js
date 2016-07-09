var complaints = [{
    name: "Vivek",
    location: "bangalore",
    tsp: "vodafone",
    time: "",
    ticketID: "1001",
    status: "unresolved",
    issue: "Network problem"
}, {
    name: "Sreejith",
    location: "mumbai",
    tsp: "airtel",
    time: "",
    ticketID: "1002",
    status: "unresolved",
    issue: "Network problem"

}, {
    name: "Rishi",
    location: "new delhi",
    tsp: "idea",
    time: "",
    ticketID: "1003",
    status: "resolved",
    issue: "Dnd"
}];



var styles = [{
    stylers: [
        { saturation: -100 },
        { invert_lightness: false },
        { lightness: 0 }
    ]
}, {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
        { visibility: "on" }
    ]
}, {
    featureType: "road",
    elementType: "geometry",
    stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
    ]
}, {
    featureType: "road",
    elementType: "labels",
    stylers: [
        { visibility: "off" }
    ]
}];


var map;

window.onload = function() {
    var unresolved = complaints.filter(function(item) {
        return item.status === "unresolved";
    }).length;
    var resolved = complaints.length - unresolved;

    $("#resolved").text(resolved);
    $("#unresolved").text(unresolved);

}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 23.916258, lng: 78.411350 },
        zoom: 4,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var geocoder = new google.maps.Geocoder();

    //var yellow_marker = "https://dl.dropboxusercontent.com/u/94305825/markers/1.png";




    function addMarker(results, tsp) {
        var icons = {
            idea: { icon: "res/1.png" },
            relience: { icon: "res/4.png" },
            aircel: { icon: "res/2.png" },
            vodafone: { icon: "res/3.png" },
            airtel: { icon: "res/5.png" }
        };
        console.log(icons)
        var marker = new google.maps.Marker({
            position: results[0].geometry.location,
            icon: icons[tsp].icon,
            map: map
        });
    }


    complaints.forEach(function(item, index) {
        geocoder.geocode({ 'address': item.location }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                console.log(item);
                addMarker(results, item["tsp"]);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    });


    /*
    var collegeCircle = new google.maps.Circle({
        fillColor: '#e74c3c',
        fillOpacity: 0.9,
        strokeWeight: 0.7,
        map: map,
        center: { "lat": lat, "lng": lng },
        radius: 40000
    });

    var collegeCircle = new google.maps.Circle({
        fillColor: '#f1c40f',
        fillOpacity: 0.9,
        strokeWeight: 0.7,
        title: "Geographical Centroid of Teams",
        map: map,
        center: { "lat": legitlat, "lng": legitlng },
        radius: 40000
    });
    var collegeCircle = new google.maps.Circle({
        fillColor: '#eeeeee',
        fillOpacity: 0.9,
        strokeWeight: 0.7,
        map: map,
        center: home,
        radius: 20000
    });
    */

    map.setOptions({ styles: styles });
};

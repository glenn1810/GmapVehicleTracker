

var map;
var directionsService;
var marker = [];
var polyLine = [];
var poly2 = [];
var startLocation = [];
var endLocation = [];
var timerHandle = [];
var infoWindow = null;

var startLoc = [];
var endLoc = [];

var lastVertex = 1;
var step = 5; // 5; // metres
var eol = [];

var VehiclesRoutesList = [];


var vehicleViewModel = {
  vehicleName: "",
  companyName: "",
  revenue: 0,
  duration: 0,
  distance: 0
};

window.initializeGoogleMap = initializeGoogleMap;
window.setRoutes = onChangeRoute;
window.highlight = onHighlightRouteByCompany;


function initializeGoogleMap() {


  infoWindow = new google.maps.InfoWindow({
    size: new google.maps.Size(150, 50)
  });
  var options = {
    zoom: 10
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), options);

  var address = 'Market! Market! McKinley Pkwy Taguig 1630 Metro Manila Philippines'

  // Geocoder is used to encode or actually geocode textual addresses to lat long values
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': address }, function (results, status) {
    map.fitBounds(results[0].geometry.viewport);
  });
}

function createMarker(latlng, vehicleViewModel, html) {

  updateDistanceAndDurationInUI(vehicleViewModel);
  updateVehicleStatusInUI(vehicleViewModel, 'Transit');

  var contentString = '<b>' + vehicleViewModel.companyName + ' - ' + vehicleViewModel.vehicleName + '</b><br>' +
    '<b>Revenue: </b>$' + vehicleViewModel.revenue + '<br>' +
    '<b>Duration: </b>' + vehicleViewModel.duration + '<br>' +
    '<b>Distance: </b>' + vehicleViewModel.distance + '<br>'
    + html;

  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    zIndex: 10,
    title: vehicleViewModel.companyName,
    label: {
      text: vehicleViewModel.vehicleName,
      color: '#ffffff',
      fontSize: '8px',
      fontWeight: 'bold'
    }
  });
  marker.myname = vehicleViewModel.vehicleName;

  google.maps.event.addListener(marker, 'click', function () {
    infoWindow.setContent(contentString);
    infoWindow.open(map, marker);
  });

  return marker;
}

function updateDistanceAndDurationInUI(vehicleViewModel) {
  var pElements = document.querySelector('p[id="' + vehicleViewModel.companyName + '-' + vehicleViewModel.vehicleName + '"]');
  if (pElements)
    pElements.innerText = vehicleViewModel.distance + ' | ' + vehicleViewModel.duration;
}

function updateVehicleStatusInUI(vehicleViewModel, status) {
  var pElements = document.querySelector('p[id="status-' + vehicleViewModel.companyName + '-' + vehicleViewModel.vehicleName + '"]');
  if (pElements)
    pElements.innerText = 'Status - ' + status;
}


function toggleError(msg) {
  document.getElementById('error-msg').innerText = msg;
}

function onHighlightRouteByCompany(company) {
  var elements = document.querySelectorAll('div[aria-label="' + company.companyName + '"]');
  var border = '0';

  if (company.isChecked)
    border = '2px solid black';

  for (i = 0; i < elements.length; i++) {
    elements[i].style.border = border;
  }
}

function onChangeRoute(vehicles) {
  map && initializeGoogleMap();
  // empty out the error msg
  toggleError("");
  // set the values and check if any is empty, and if yes, show error and return

  startLoc = [];
  endLoc = [];


  for (var i = 0; i < vehicles.length; i++) {
    var origin = vehicles[i].origin;
    var destination = vehicles[i].destination;

    if (!origin || !destination) {
      toggleError("Please enter both start and end locations.");
      return;
    }
    // just to avoid weird case of same start and end location
    if (origin === destination) {
      toggleError("Please enter different locations in both inputs");
      return;
    }

    VehiclesRoutesList = vehicles;

    startLoc.push(origin);
    endLoc.push(destination);
  }

  // empty out previous values
  startLocation = [];
  endLocation = [];
  polyLine = [];
  poly2 = [];
  timerHandle = [];

  var directionsDisplay = new Array();
  for (var i = 0; i < startLoc.length; i++) {
    var rendererOptions = {
      map: map,
      suppressMarkers: true,
      preserveViewport: true
    };
    directionsService = new google.maps.DirectionsService();
    var travelMode = google.maps.DirectionsTravelMode.DRIVING;
    var request = {
      origin: startLoc[i],
      destination: endLoc[i],
      travelMode: travelMode
    };

    directionsService.route(request, makeRouteCallback(i, directionsDisplay[i]), rendererOptions);
  }
}

// called after getting route from directions service, does all the heavylifting
function makeRouteCallback(routeNum, disp, rendererOptions) {
  // check if polyline and map exists, if yes, no need to do anything else, just start the animation
  if (polyLine[routeNum] && (polyLine[routeNum].getMap() != null)) {
    startAnimation(routeNum);
    return;
  }
  return function (response, status) {
    // if directions service successfully returns and no polylines exist already, then do the following
    if (status == google.maps.DirectionsStatus.ZERO_RESULTS) {
      toggleError("No routes available for selected locations");
      return;
    }
    if (status == google.maps.DirectionsStatus.OK) {
      startLocation[routeNum] = new Object();
      endLocation[routeNum] = new Object();
      // set up polyline for current route
      polyLine[routeNum] = new google.maps.Polyline({
        path: [],
        strokeColor: '#FFFF00',
        strokeWeight: 3
      });
      poly2[routeNum] = new google.maps.Polyline({
        path: [],
        strokeColor: '#FFFF00',
        strokeWeight: 3
      });
      // For each route, display summary information.
      var legs = response.routes[0].legs;
      // directionsrenderer renders the directions obtained previously by the directions service
      disp = new google.maps.DirectionsRenderer(rendererOptions);
      disp.setMap(map);
      disp.setDirections(response);


      vehicleViewModel.vehicleName = VehiclesRoutesList[routeNum].name;
      vehicleViewModel.companyName = VehiclesRoutesList[routeNum].companyName;
      vehicleViewModel.revenue = VehiclesRoutesList[routeNum].revenue;



      for (i = 0; i < legs.length; i++) {

        if (i == 0) {
          vehicleViewModel.distance = legs[i].distance.text;
          vehicleViewModel.duration = legs[i].duration.text;
          startLocation[routeNum].latlng = legs[i].start_location;
          startLocation[routeNum].address = legs[i].start_address;
          marker[routeNum] = createMarker(legs[i].start_location,
            vehicleViewModel,
            legs[i].start_address,
            "green");
        }
        endLocation[routeNum].latlng = legs[i].end_location;
        endLocation[routeNum].address = legs[i].end_address;
        var steps = legs[i].steps;
        for (j = 0; j < steps.length; j++) {
          var nextSegment = steps[j].path;
          for (k = 0; k < nextSegment.length; k++) {
            polyLine[routeNum].getPath().push(nextSegment[k]);
          }
        }
      }
    }
    if (polyLine[routeNum]) {
      // render the line to map
      polyLine[routeNum].setMap(map);
      // and start animation
      startAnimation(routeNum);
    }
  }
}

// Spawn a new polyLine every 20 vertices
function updatePoly(i, d) {
  if (poly2[i].getPath().getLength() > 20) {
    poly2[i] = new google.maps.Polyline([polyLine[i].getPath().getAt(lastVertex - 1)]);
  }

  if (polyLine[i].GetIndexAtDistance(d) < lastVertex + 2) {
    if (poly2[i].getPath().getLength() > 1) {
      poly2[i].getPath().removeAt(poly2[i].getPath().getLength() - 1)
    }
    poly2[i].getPath().insertAt(poly2[i].getPath().getLength(), polyLine[i].GetPointAtDistance(d));
  } else {
    poly2[i].getPath().insertAt(poly2[i].getPath().getLength(), endLocation[i].latlng);
  }
}

// updates marker position to make the animation and update the polyline
function animate(index, d) {
  if (d > eol[index]) {
    marker[index].setPosition(endLocation[index].latlng);
    return;
  }
  var polyIndex = polyLine[index];

  if (!polyIndex)
    return;

  var p = polyLine[index].GetPointAtDistance(d);
  marker[index].setPosition(p);
  updatePoly(index, d);
  timerHandle[index] = setTimeout("animate(" + index + "," + (d + step) + ")", 100);
}

// start marker movement by updating marker position every 100 milliseconds i.e. tick value
function startAnimation(index) {
  if (timerHandle[index])
    clearTimeout(timerHandle[index]);
  eol[index] = polyLine[index].Distance();
  map.setCenter(polyLine[index].getPath().getAt(0));

  poly2[index] = new google.maps.Polyline({
    path: [polyLine[index].getPath().getAt(0)],
    strokeColor: "#FFFF00",
    strokeWeight: 3
  });
  timerHandle[index] = setTimeout("animate(" + index + ",20)", 2000);  // Allow time for the initial map display
}



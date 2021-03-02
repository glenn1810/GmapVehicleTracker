
var lastVertex = 1;
var step = 50; // 5; // metres
var eol = [];
var polyLine = [];
var poly2 = [];
var timerHandle = [];

var startLocation = [];
var endLocation = [];

var marker = [];

var requests = [];

var timer = 2000;

var markerGroups = [];



var directionDisplay = new Array();
var directionsService = new google.maps.DirectionsService();
var map;

function initializeDummyGoogleMap() {
  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });

  var myOptions = {
    zoom: 3,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  }

  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
  directionsDisplay.setMap(map);
  calcRoute(-1);
  //calcRoute();
}

function calcRoute(routeIndex) {

  var waypts = [];

  stop = new google.maps.LatLng(14.553868401214913, 121.05211488902596)
  waypts.push({
    location: stop,
    stopover: true
  });
  stop = new google.maps.LatLng(14.55241455705643, 121.04559175685475)
  waypts.push({
    location: stop,
    stopover: true
  });

  

  start = new google.maps.LatLng(14.547180638798155, 121.0545825212618);
  end = new google.maps.LatLng(14.547159869034074, 121.0544752329037);

  //createMarker(start);

  //  startLocation = [];
  //endLocation = [];
  //polyLine = [];
  //poly2 = [];
  //timerHandle = [];


  var request1 = {
    origin: start,
    destination: end,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };

  var rendererOptions = {
    suppressMarkers: true
  };

  if (routeIndex == -1) {
    requests.push(request1);
    requests.push(request1);
    requests.push(request1);

    for (var ctr = 0; ctr < requests.length; ctr++) {
      routeDeplayCallBack(requests[ctr], ctr, rendererOptions, directionsDisplay);
    }
  }
  else {
    routeDeplayCallBack(requests[routeIndex], routeIndex, rendererOptions, directionsDisplay);
  }
 
 // directionsService.route(request, makeRouteCallback(i, directionsDisplay[i]), rendererOptions);

  //directionsService.route(request, function (response, status)
}

function routeDeplayCallBack(request, ctr, rendererOptions, directionsDisplay) {
  if (ctr == 0) {
    directionsService.route(request, makeRouteCallback(ctr, directionsDisplay[ctr]), rendererOptions);
  }
  else {
    timer += (ctr * 500);
    console.log(timer);
    setTimeout(function () { directionsService.route(request, makeRouteCallback(ctr, directionsDisplay[ctr]), rendererOptions); }, timer);
  }
}
function makeRouteCallback(routeNum, disp, rendererOptions) {

  //  if (polyLine[routeNum] && (polyLine[routeNum].getMap() != null)) {
  //  startAnimation(routeNum);
  //  return;
  //}

  return function (response, status) {

    if (status == google.maps.DirectionsStatus.OK) {
      startLocation[routeNum] = new Object();
      endLocation[routeNum] = new Object();
      // set up polyline for current route
      polyLine[routeNum] = new google.maps.Polyline({
        path: [],
        strokeWeight: 1
      });
      poly2[routeNum] = new google.maps.Polyline({
        path: [], 
        strokeWeight: 1
      });
      // For each route, display summary information.
      var legs = response.routes[0].legs;
      // directionsrenderer renders the directions obtained previously by the directions service
      disp = new google.maps.DirectionsRenderer(rendererOptions);
      disp.setMap(map);
      disp.setDirections(response);


      for (i = 0; i < legs.length; i++) {

        if (i == 0) {
          //vehicleViewModel.distance = legs[i].distance.text;
          //vehicleViewModel.duration = legs[i].duration.text;
          startLocation[routeNum].latlng = legs[i].start_location;
          startLocation[routeNum].address = legs[i].start_address;
          marker[routeNum] = createBusMarker(legs[i].start_location,
            '',
            legs[i].start_address);
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
  };
}

function createMarker(latlng) {

  var marker = new google.maps.Marker({
    position: latlng,
    map: map
  });
}


////////////////animated bus ///////////
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
    timer = 2000;
    eol[index] = 0;
    calcRoute(index);
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
    strokeWeight: 3
  });

  timerHandle[index] = setTimeout("animate(" + index + ",100)", 2000);  // Allow time for the initial map display
}

function createBusMarker(latlng, vehicleViewModel, html) {

  //updateDistanceAndDurationInUI(vehicleViewModel);
  //updateVehicleStatusInUI(vehicleViewModel, 'Transit');

  //var contentString = '<b>' + vehicleViewModel.companyName + ' - ' + vehicleViewModel.vehicleName + '</b><br>' +
  //  '<b>Revenue: </b>$' + vehicleViewModel.revenue + '<br>' +
  //  '<b>Duration: </b>' + vehicleViewModel.duration + '<br>' +
  //  '<b>Distance: </b>' + vehicleViewModel.distance + '<br>'
  //  + html;

  var contentString = "Sample A";


  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    zIndex: 10,
    title: "Sample A",
    label: {
      text: "Sample A",
      color: '#ffffff',
      fontSize: '8px',
      fontWeight: 'bold'
    }
  });
  marker.myname = "Sample A";

  markerGroups.push(marker);

  google.maps.event.addListener(marker, 'click', function () {
    infoWindow.setContent(contentString);
    infoWindow.open(map, marker);
  });

  return marker;
}

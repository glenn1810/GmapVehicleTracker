
var lastVertex = 1;
var step = 10; // 5; // metres
var eol = [];
var polyLine = [];
var poly2 = [];
var timerHandle = [];
var startLocation = [];
var endLocation = [];
var marker = [];
var requests = [];
var timer = 2000;
var busesRoutes = [];

var directionDisplay = new Array();
var directionsService = new google.maps.DirectionsService();
var map;

function initializeGoogleMap(busesData) {
  infoWindow = new google.maps.InfoWindow({
    size: new google.maps.Size(150, 50)
  });

  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });

  var myOptions = {
    zoom: 3,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  }

  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
  directionsDisplay.setMap(map);
  busesRoutes = busesData;
  calcRoute(-1);
}

function calcRoute(routeIndex) {
  if (routeIndex == -1) {
      
    const initialBus = busesRoutes[0];
    createMarker(new google.maps.LatLng(initialBus.origin.lat, initialBus.origin.long));

    for (var i = 0; i < busesRoutes.length; i++) {

      var waypts = [];
      var busWayPoints = busesRoutes[i].wayPoints;
      for (var ii = 0; ii < busWayPoints.length; ii++) {
        stop = new google.maps.LatLng(busesRoutes[i].wayPoints[ii].lat, busesRoutes[i].wayPoints[ii].long)
        waypts.push({
          location: stop,
          stopover: true
        });
      }

      var request = {
        origin: new google.maps.LatLng(busesRoutes[i].origin.lat, busesRoutes[i].origin.long),
        destination: new google.maps.LatLng(busesRoutes[i].destination.lat, busesRoutes[i].destination.long),
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      };

      requests.push(request);
    }

    for (var ctr = 0; ctr < requests.length; ctr++) {
      routeDeplayCallBack(requests[ctr], ctr, directionsDisplay);
    }
  }
  else {
    routeDeplayCallBack(requests[routeIndex], routeIndex, directionsDisplay);
  }
}

function routeDeplayCallBack(request, ctr, directionsDisplay) {
  if (ctr == 0) {
    directionsService.route(request, makeRouteCallback(ctr, directionsDisplay[ctr]));
  }
  else {
    timer += (ctr * 500);
    setTimeout(function () { directionsService.route(request, makeRouteCallback(ctr, directionsDisplay[ctr])); }, timer);
  }
}

function makeRouteCallback(routeNum, disp) {

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
      disp = new google.maps.DirectionsRenderer({
        suppressMarkers: true
      });
      disp.setMap(map);
      disp.setDirections(response);


      for (i = 0; i < legs.length; i++) {

        if (i == 0) {
          startLocation[routeNum].latlng = legs[i].start_location;
          startLocation[routeNum].address = legs[i].start_address;
          marker[routeNum] = createBusMarker(legs[i].start_location,
            busesRoutes[routeNum],
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
  var originMarker = new google.maps.Marker({
    position: latlng,
    map: map
  });
}

function onSelectBusByCompany(index, isChecked, companies) {
  var thisMarker = marker[index];

  for (var ii = 0; ii < busesRoutes.length; ii++) {
    var otherMarker = marker[ii];
    if (ii == index) {
      thisMarker.setVisible(isChecked);
    }
    else {
      if (otherMarker.getVisible())
        otherMarker.setVisible(true);
      else
        otherMarker.setVisible(false);
    }
  }
}

////////////////animated bus ///////////

function resetAndRecalculateRoute(index) {
  timer = 2000;
  eol[index] = 0;
  calcRoute(index);
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
    resetAndRecalculateRoute(index);
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

function createBusMarker(latlng, busInfo, html) {

  var contentString = '<b>' + busInfo.companyName + ' - ' + busInfo.busName + '</b><br>' +
    '<b>Revenue: </b>$' + busInfo.revenue + '<br>' + html;

  var thisMarker = new google.maps.Marker({
    position: latlng,
    map: map,
    zIndex: 10,
    title: busInfo.companyName,
    label: {
      text: busInfo.busName,
      color: '#ffffff',
      fontSize: '8px',
      fontWeight: 'bold'
    }
  });
  thisMarker.myname = busInfo.busName;

  google.maps.event.addListener(thisMarker, 'click', function () {
    infoWindow.setContent(contentString);
    infoWindow.open(map, thisMarker);
  });

  return thisMarker;
}

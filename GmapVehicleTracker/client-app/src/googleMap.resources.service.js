
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
var markerCenter;
var circle;
var latLngCMarker;
var bounds;
var totalBusElement;
var drawChart;
var totalBusesInsideCircle = [];




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
  initializeCircle();
  initializeAnalyticChart();
  initializeCheckboxFilter();
  initializeBusCountLabel();
  calcRoute(-1);
}

function initializeCircle() {
  const initialRoute = busesRoutes[0];
  const initialWayPoint = initialRoute.wayPoints[0];

  latLngCMarker = new google.maps.LatLng(initialWayPoint.lat, initialWayPoint.long);

  markerCenter = new google.maps.Marker({
    position: latLngCMarker,
    title: 'Center marker',
    map: map,
    draggable: true
  })

  circle = new google.maps.Circle({
    map: map,
    clickable: false,
    // metres
    radius: 500,
    fillColor: '#fff',
    fillOpacity: .6,
    strokeColor: '#313131',
    strokeOpacity: .4,
    strokeWeight: .8
  });
  // attach circle to marker
  circle.bindTo('center', markerCenter, 'position');

  bounds = circle.getBounds();


  const infoCenter = new google.maps.InfoWindow({
    content: '<span class="infowin">Center Marker (draggable)</span>'
  })

  google.maps.event.addListener(markerCenter, 'click', function () {
    infoCenter.open(map, markerCenter);
  });

  google.maps.event.addListener(markerCenter, 'drag', function () {
    infoCenter.close();
  });

  google.maps.event.addListener(markerCenter, 'dragend', function () {
    latLngCenter = new google.maps.LatLng(markerCenter.position.lat(), markerCenter.position.lng());
    bounds = circle.getBounds();
  });
}

function initializeBusCountLabel() {
  const labelContainer = document.createElement("div");
  var spanText = createBusCountLabel(labelContainer, map);
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(labelContainer);

  totalBusElement = spanText;
}

function initializeCheckboxFilter() {
  const checkboxContainer = document.createElement("div");
  createCheckboxControl(checkboxContainer, map);
  map.controls[google.maps.ControlPosition.LEFT_CENTER].push(checkboxContainer);
}


function initializeAnalyticChart() {
  const chartContainer = document.createElement("div");
  createAnalyticChartButton(chartContainer, map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(chartContainer);

  google.load("visualization", "1", { packages: ["corechart"] });
  google.setOnLoadCallback(drawCompanyChart);
}

function createBusCountLabel(labelContainer, map) {
  const labelDiv = document.createElement("div");
  labelDiv.style.backgroundColor = "#fff";
  labelDiv.style.border = "2px solid #fff";
  labelDiv.style.borderRadius = "3px";
  labelDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  labelDiv.style.cursor = "pointer";
  labelDiv.style.marginBottom = "22px";
  labelDiv.style.textAlign = "center";
  labelContainer.appendChild(labelDiv);

  const labelText = document.createElement("label");
  labelText.style.color = "rgb(25,25,25)";
  labelText.style.fontFamily = "Roboto,Arial,sans-serif";
  labelText.style.fontSize = "16px";
  labelText.style.lineHeight = "38px";
  labelText.style.paddingLeft = "5px";
  labelText.style.paddingRight = "5px";
  labelText.style.fontWeight = "bold";
  labelText.innerHTML = "Total Buses: ";
  labelDiv.appendChild(labelText);

  const spanText = document.createElement("span");
  spanText.style.color = "rgb(25,25,25)";
  spanText.style.fontFamily = "Roboto,Arial,sans-serif";
  spanText.style.fontSize = "16px";
  spanText.style.lineHeight = "38px";
  spanText.style.fontWeight = "bold";
  spanText.id = "totBus";
  spanText.innerHTML = 0;
  labelText.appendChild(spanText);

  return spanText;
}

function createCheckboxControl(checkboxContainer, map) {
  checkboxContainer.style.paddingTop = "10px";
  checkboxContainer.style.paddingLeft = "10px";
  for (var index = 0; index < busesRoutes.length; index++) {
    const checkboxDiv = document.createElement("div");
    checkboxDiv.style.backgroundColor = "#fff";
    checkboxDiv.style.border = "2px solid #fff";
    checkboxDiv.style.borderRadius = "3px";
    checkboxDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    checkboxDiv.style.cursor = "pointer";
    checkboxDiv.style.marginBottom = "22px";
    checkboxDiv.style.textAlign = "center";
    checkboxContainer.appendChild(checkboxDiv);

    const checkboxControl = document.createElement("input");
    checkboxControl.id = busesRoutes[index].companyName;
    checkboxControl.type = "checkbox";
    checkboxControl.checked = true;
    checkboxDiv.appendChild(checkboxControl);

    const checkboxText = document.createElement("label");
    checkboxText.style.color = "rgb(25,25,25)";
    checkboxText.style.fontFamily = "Roboto,Arial,sans-serif";
    checkboxText.style.fontSize = "16px";
    checkboxText.style.lineHeight = "38px";
    checkboxText.style.paddingLeft = "5px";
    checkboxText.style.paddingRight = "5px";
    checkboxText.style.fontWeight = "bold";
    checkboxText.innerHTML = busesRoutes[index].companyName;
    checkboxDiv.appendChild(checkboxText);

    checkboxControl.addEventListener("click", () => {
      const busRouteIndex = busesRoutes.findIndex(x => x.companyName == checkboxControl.id)
      onSelectBusByCompany(busRouteIndex, checkboxControl.checked);
    });
  }  
}

function createAnalyticChartButton(chartContainer, map) {
  const showChartButton = document.createElement("div");
  showChartButton.style.backgroundColor = "#fff";
  showChartButton.style.border = "2px solid #fff";
  showChartButton.style.borderRadius = "3px";
  showChartButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  showChartButton.style.cursor = "pointer";
  showChartButton.style.marginBottom = "22px";
  showChartButton.style.textAlign = "center";
  showChartButton.title = "Click to show Company Analytics.";
  chartContainer.appendChild(showChartButton);
  // Set CSS for the control interior.
  const chartButtonText = document.createElement("a");
  chartButtonText.style.color = "rgb(25,25,25)";
  chartButtonText.style.fontFamily = "Roboto,Arial,sans-serif";
  chartButtonText.style.fontSize = "16px";
  chartButtonText.style.lineHeight = "38px";
  chartButtonText.style.paddingLeft = "5px";
  chartButtonText.style.paddingRight = "5px";
  chartButtonText.style.fontWeight = "bold";
  chartButtonText.innerHTML = "View Company Analytics";
  chartButtonText.href = "#companyAnalyticId";
  showChartButton.appendChild(chartButtonText);
  // Setup the click event listeners: simply set the map to Chicago.
  showChartButton.addEventListener("click", () => {
    const modal = document.getElementById('companyAnalyticId');
    modal.setAttribute('style', 'display: block');
  });
}

function drawCompanyChart() {
  var data = new google.visualization.arrayToDataTable(loadAnalyticData(busesRoutes));
  var options = {
    'title': 'Company Revenue Analytics',
    'width': 500,
    'height': 500
  };
  var chart = new google.visualization.PieChart(document.getElementById('companyAnalyticPieChart'));
  chart.draw(data, options);

  const modal = document.getElementById('companyAnalyticId');
  modal.setAttribute('style', 'display: block');
}

function loadAnalyticData(data) {
  var arrValues = [['Company name', 'Revenue']];
  for (var index = 0; index < data.length; index++) {
    arrValues.push([data[index].companyName, data[index].revenue]);
  }

  return arrValues;
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

function onSelectBusByCompany(index, isChecked) {
  var thisMarker = marker[index];

  for (var ii = 0; ii < busesRoutes.length; ii++) {
    var otherMarker = marker[ii];
    if (ii == index) {
      if (thisMarker)
        thisMarker.setVisible(isChecked);
    }
    else {
      if (otherMarker) {
        if (otherMarker.getVisible())
          otherMarker.setVisible(true);
        else
          otherMarker.setVisible(false);
      }
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
  validateIfObjectExistInCircle(index, p);
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


function validateIfObjectExistInCircle(busIndex, p) {
  var lat = p.lat();
  var long = p.lng();
  const isExist = totalBusesInsideCircle.includes(busIndex);
  const latlang = new google.maps.LatLng(lat, long);
  if (bounds.contains(latlang)) {

    if (!isExist) {
      totalBusesInsideCircle.push(busIndex);
    }
  }
  else {
    if (isExist) {
      if (totalBusesInsideCircle.length > 0) {
        const itemIndex = totalBusesInsideCircle.indexOf(busIndex);
        if (itemIndex > -1) {
          totalBusesInsideCircle.splice(itemIndex, 1);
        }
      }
    }
  }

  totalBusElement.innerText = totalBusesInsideCircle.length;
}

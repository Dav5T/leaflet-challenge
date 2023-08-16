
// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Perform a GET request to the json file/
  d3.json("data/PB2002_boundaries.json").then(function (dataB) {

  // Once we get a response, send data.features and dataB object to the createFeatures function.
    createFeatures(data.features, dataB);
  });
});

/**
 * getColor takes numeric value
 * returns color based on the conditions
 * @param {number} d - a number parameter
 * @returns 
 */
function getColor(d) {
  return d > 90  ? '#ff2626' :
         d > 70  ? '#f56b00' :
         d > 50  ? '#de9900' :
         d > 30  ? '#bebe00' :
         d > 10  ? '#92df2e' :
                   '#46fb7d';
}

/**
 * createFeatures passes both objects from json response
 * @param {object} earthquakeData - object parameter
 * @param {object} tectonic - object parameter
 */

function createFeatures(earthquakeData, tectonic) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place, time, magnitude, and depth of the earthquake.
  function CustomonEachFeature(feature, layer) {
    layer.bindPopup(`<h4>${feature.properties.place}</h4><hr><p><b>Date: </b>${new Date(feature.properties.time)}
    <br><b>Magnitude:</b> ${feature.properties.mag}<br><b>Depth: </b>${feature.geometry.coordinates[2]}</p>`);
  }

  // logging the data 
  console.log(earthquakeData);
  console.log(tectonic)

  // Creates a circle for each coordinates
  function circle (feature, latlng){
        
    var magnitude = {
      radius: feature.properties.mag * 5,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "black",
      fillOpacity: "0.8",
      weight: 1
    };
    return L.circleMarker(latlng, magnitude);
  }

  //Create variable for an overlay of all earthquake location 
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: circle,
    onEachFeature: CustomonEachFeature
  });

  //Create polyline for tectonic plates 
  function line (latlng)
  {
    return L.polyline(latlng, {color:"red"});
  };
  
  //Create variable for an overlay of the polyline
  var tectonicLines = L.geoJSON(tectonic, {style: line})
    
  // Send our earthquakes and tectonic layer to the createMap function/
  createMap(earthquakes, tectonicLines);
}

/**
 * CreateMap creates all the overlayer, layers and legend of the map
 * @param {object} earthquakes - object parameter
 * @param {object} tectonicLines - object parameter
 */
function createMap(earthquakes, tectonicLines) {

  // Create the base layers.
  let greyScale = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>', 
    subdomains: 'abcd',
  });

  var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });

  var outDoor = L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
	  maxZoom: 18,
	  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Greyscale": greyScale,
    "Satellite": satellite,
    "Outdoor": outDoor
  };

      
  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes,
    Tectonic: tectonicLines
  };


    // Create our map, giving it the Greyscale and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [40.7608, -111.8910],
    zoom: 5,
    layers: [greyScale, earthquakes]
  });

    // adding rest of the layers and overlays to the map as an option 
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

    

  // Create legend scale 
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
    depth = [-10, 10, 30, 50, 70, 90],
    labels = [];
  
    for (var i = 0; i < depth.length; i++) 
    {
      div.innerHTML +=
      labels.push('<i style="background:' + getColor(depth[i] + 1) + '"></i> ' +
      depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+'));
    }

    div.innerHTML = "<strong>Depth</strong><br>" + labels.join("");
    return div;
  };

  legend.addTo(myMap);

}
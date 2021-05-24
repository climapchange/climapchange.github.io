let baselayers = {
    standard: L.tileLayer.provider("OpenStreetMap.DE"),
    darkMode: L.tileLayer.provider("Stamen.TonerBackground"),
    terrain: L.tileLayer.provider("OpenTopoMap"),
};

// Overlays für die Themen zum Ein- und Ausschalten definieren
let overlays = {
    coTwo: L.featureGroup()
};

const map = L.map("map", {
    fullscreenControl: true,
    center: [15, 0],
    zoom: 3,
    layers: [
        baselayers.standard
    ]
});

let layerControl = L.control.layers({
    "Standard": baselayers.standard,
    "Dark Mode": baselayers.darkMode,
    "Relief": baselayers.terrain,
}, {
    "CO2": overlays.coTwo,
}).addTo(map);

//Länder-Polygone hinzugefuegt und zum Overlay hinzugefuegt
L.geoJson(COUNTRY).addTo(overlays.coTwo).addTo(map)
overlays.coTwo.addTo(map)
//Zoom an Polys anpassen
map.fitBounds(overlays.coTwo.getBounds());

//Style der Polys
function style(feature) {
    return {
        fillColor: 'blue', //Hier kann eine Farbrampe eingebaut werden bzw. Funktion getColor
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.2
    };
}
L.geoJson(COUNTRY, {
    style: style
}).addTo(map).addTo(overlays.coTwo);

//Adding Interactions nach https://leafletjs.com/examples/choropleth/
let geojson = L.geoJson(COUNTRY);

//Staaten werden gehighlighted beim herüberfahren
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
//Highlight zuruecksetzen beim weggehen mit der Maus
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}
//Beim Klicken hinzoomen
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    //Experiment
    console.log(e.target.feature.properties.name_long)
}

//Beim Klicken soll der Name gelogged werden
function logName(e) {
    console.log(e.target.feature.properties.name_long)
}

//Festlegen, wann welche Funktion ausgefuehrt wird
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
        click: logName
    });
}
//Zur Karte und zum Overlay hinzufuegen
geojson = L.geoJson(COUNTRY, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map).addTo(overlays.coTwo);

//CO2-Daten abrufen

let countries = CODATA[0].country;
console.log('Länder: ', countries)

//Hier muss die Länder-Zahl (Array-Nr.) des Landes eingetragen werden (0-231)
//console.log('Die Anzahl der Poly-Länder beträgt: ', COUNTRY[0].features.length)
//console.log(COUNTRY[0].features)
let polyNr = 231
console.log(polyNr)

//Zur Überprüfung, ob ein Land nicht gleich benannt ist. Dies ist nicht der Fall.
/*
for (let polyNr = 0; polyNr < COUNTRY[0].features.length; polyNr++){
    console.log(COUNTRY[0].features[polyNr].properties.name_long);
  }
*/

//Auf Polygon-Daten zugreifen. Die Zahl hinter features[ZAHL] bestimmt das Land
let polyName = COUNTRY[0].features[polyNr].properties.name_long;
console.log('polyName: ', polyName)

//um an die Zahl zu kommen nach 'data' muss ich die Länge herausfinden und minus 1 rechnen.
let lastYear = CODATA[0].country[polyName].data.length - 1
console.log('Die Array-Nr. des letzten gelisteten Jahres ist: ', lastYear)

let year = CODATA[0].country[polyName].data[lastYear].year
console.log('Die Daten beziehen sich auf das Jahr', year)

//Automatisch anhand des Poly-Namens nach den CO2 Daten suchen lassen
let coSelect = CODATA[0].country[polyName].data[lastYear].co2
console.log('Die jährliche produktionsbedingte CO2-Emission beträgt', coSelect, 'millionen Tonnen')

//So werden die ISO-Daten abgerufen. Land muss variabel
let iso = CODATA[0].country[polyName].iso_code
console.log('Der ISO-Code aus den CO2-Daten lautet:', iso)

//Auf Polygon-Daten zugreifen. Die Zahl hinter features[ZAHL] bestimmt das Land
let polyIso = COUNTRY[0].features[polyNr].properties.iso_a3;
console.log('Der ISO-Code aus den Poly-Daten lautet:', polyIso)



//Wahrscheinlich muss das alles in eine Funktion, wie beim AWS-Beispiel. Also getDirection wird dann in Windrichtungspopup gespeichert und das wird im Popup erst gecalled.



//PopUp
overlays.coTwo.bindPopup(`
<h3>${COUNTRY[0].features[0].properties.formal_en}</h3>
<h1>${overlays.coTwo[0]}</h1>
    `);
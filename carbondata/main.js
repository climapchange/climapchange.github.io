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
    };
    info.update(layer.feature.properties);
}
//Highlight zuruecksetzen beim weggehen mit der Maus
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}
//Beim Klicken hinzoomen
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    //Experiment
    //console.log(e.target.feature.properties.name_long)
}

//Beim Klicken soll der Name gelogged werden
function logName(e) {
    return (e.target.feature.properties.name_long),
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
//console.log('Länder: ', countries)

//Hier muss die Länder-Zahl (Array-Nr.) des Landes eingetragen werden (0-231)
//Probleme bei 10 "Curaçao", 11 "Cayman Islands" nicht in Liste
let polyNr = 20
console.log('Die ausgewählte Poly-Nr. ist:', polyNr)

function getName(polyNr) {
    let polyName = COUNTRY[0].features[polyNr].properties.name_long;
    console.log('Das Land heißt',polyName);
    return (polyName)
}

function getCoData(polyNr) {
    let polyName = COUNTRY[0].features[polyNr].properties.name_long;
    let lastYear = CODATA[0].country[polyName].data.length - 1;
    let coSelect = CODATA[0].country[polyName].data[lastYear].co2;
    console.log('Die jährliche produktionsbedingte CO2-Emission beträgt',coSelect, 'millionen Tonnen');
    return (coSelect)
}

function getYearData(polyNr) {
    let polyName = COUNTRY[0].features[polyNr].properties.name_long;
    let lastYear = CODATA[0].country[polyName].data.length - 1;
    let year = CODATA[0].country[polyName].data[lastYear].year;
    console.log('Die Daten beziehen sich auf das Jahr',year);
    return (year)
}

function getCoIso(polyNr) {
    let polyName = COUNTRY[0].features[polyNr].properties.name_long;
    let lastYear = CODATA[0].country[polyName].data.length - 1;
    let iso = CODATA[0].country[polyName].iso_code;
    console.log('Der ISO-Code aus den CO2-Daten lautet:',iso);
    return (iso)
}

function getPolyIso(polyNr) {
    let polyIso = COUNTRY[0].features[polyNr].properties.iso_a3;
    console.log('Der ISO-Code aus den Poly-Daten lautet:',polyIso);
    return (polyIso)
}

//Funktion um alle Funktionen zu callen
function getData(polyNr) {
    getName(polyNr);
    getCoData(polyNr);
    getYearData(polyNr);
    getCoIso(polyNr);
    getPolyIso(polyNr)
}

//CallFunktion wird ausgeführt
getData(polyNr);

//Daten zeigen

// Anzeige oben Rechts. Style siehe CSS
var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
info.update = function (props) {
    this._div.innerHTML = '<h4>Länderdaten</h4>' +  (props ?
        '<b>' + props.name_long + '</b><br />Der Iso-Code lautet ' + props.iso_a3
        : 'Hover over a state');
};
info.addTo(map);

//Hier kann noch eine Legende eingefueht werden: https://leafletjs.com/examples/choropleth/ 


/*
//PopUp
overlays.coTwo.bindPopup(`
<h3>${getName}</h3>
<h3>${getCoData}</h3>
    `);

*/

//clickName wird er in Funktion erzeugt und ist deswegen async
//<h3>${clickName}</h3>
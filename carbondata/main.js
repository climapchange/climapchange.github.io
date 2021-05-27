let baselayers = {
    standard: L.tileLayer.provider("OpenStreetMap.DE"),
    darkMode: L.tileLayer.provider("Stamen.TonerBackground"),
    terrain: L.tileLayer.provider("OpenTopoMap"),
};

// Overlays für die Themen zum Ein- und Ausschalten definieren
let overlays = {
    coTwo: L.featureGroup()
};

let bounds = [
    [-80, -180], // Southwest coordinates
    [90, 180] // Northeast coordinates
]

const map = L.map("map", {
    fullscreenControl: true,
    center: [15, 0],
    zoom: 2,
    layers: [
        baselayers.standard
    ],
    maxBounds: bounds
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

// Funktion um CODATA-Daten abzurufen. Beim Call muss (properties.name, "dataType") <- z.B. "co2" eingetragen werden.
function getData(polyName, dataType) {
    let lastYear = CODATA[0].country[polyName].data.length - 1;
    let dataSelect = CODATA[0].country[polyName].data[lastYear][dataType];
    //console.log(dataSelect);
    return (dataSelect)
}

//Funktion um alle Funktionen zu callen
function getFullData(polyName) {
    getData(polyName, "co2");
    getData(polyName, "year");
}
//getFullData("Afghanistan")

//Style der Polys
function style(feature) {
    //console.log(feature);
    return {
        fillColor: getColor(500),
        //fillColor: getColor(CODATA[0].country[feature.properties.name].data[CODATA[0].country[feature.properties.name].data.length - 1].co2),
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
    info.update(layer.feature);
    //console.log((layer.feature))
    //das wird runtergegeben an Infoanzeige
}
//Highlight zuruecksetzen beim weggehen mit der Maus
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}
//Beim Klicken soll der Name gelogged werden
function logName(e) {
    return (e.target.feature.properties.name_long),
        console.log(e.target.feature.properties.name_long)
    //console.log(e.target.feature)
}

//Festlegen, wann welche Funktion ausgefuehrt wird
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: logName
    });
}
//Zur Karte und zum Overlay hinzufuegen
geojson = L.geoJson(COUNTRY, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map).addTo(overlays.coTwo);

// Anzeige oben Rechts. Style siehe CSS
var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
info.update = function (props) {
    this._div.innerHTML = '<h4>Länderdaten</h4>' + (props ?
        '<b>' + props.properties.name_long + '</b><br />' +
        getData(props.properties.name_long, "co2").toFixed(1) + ' Millionen Tonnen CO<sub>2</sub>' :
        'Hover over a state');
};
info.addTo(map);

//Probleme bei folgenden Ländern: Laos (angepasst), Democratic Republic of Congo, Central African Republic
//Hier kann noch eine Legende eingefuegt werden: https://leafletjs.com/examples/choropleth/ 
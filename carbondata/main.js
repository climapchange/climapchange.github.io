let baselayers = {
    standard: L.tileLayer.provider("OpenStreetMap.DE"),
};

// Overlays für die Themen zum Ein- und Ausschalten definieren
let overlays = {
    coTwo: L.featureGroup(),
    coTwoGlobalShare: L.featureGroup(),
    coTwoPerCapita: L.featureGroup(),
    coTwoCumu: L.featureGroup(),
    coTwoCumuShare: L.featureGroup(),
};

let bounds = [
    [-82, -180], // Southwest coordinates
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

//Maximalen Zoom-Out begrenzen
map.setMinZoom(map.getBoundsZoom(map.options.maxBounds));

let overlayControl = L.control.layers({
    "CO2-Emission pro Jahr": overlays.coTwo,
    "Anteil jährlicher Emissionen": overlays.coTwoGlobalShare,
    "Emissionen pro Person": overlays.coTwoPerCapita,
    "Kumulierte Emissionen": overlays.coTwoCumu,
    "Anteil kumulierter Emissionen": overlays.coTwoCumuShare,
}, null, {
    position: 'bottomleft',
    collapsed: false,
}).addTo(map);


// FUNKTIONEN UNABHAENGIG VOM OVERLAY!!!

// Funktion um CODATA-Daten abzurufen. Beim Call muss (properties.name, "dataType") <- z.B. "co2" eingetragen werden.
function getData(polyName, dataType) {
    let lastYear = CODATA[0].country[polyName].data.length - 1;
    let dataSelect = CODATA[0].country[polyName].data[lastYear][dataType];
    return (dataSelect);
}

//Adding Interactions nach https://leafletjs.com/examples/choropleth/
let geojson = L.geoJson(COUNTRY);

//Staaten werden gehighlighted beim herüberfahren
function highlightFeature(e) {
    var layer = e.target;
    /*
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.5
    });
    */
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    };

    info.update(layer.feature);
    //console.log((layer.feature))
    //das wird runtergegeben an Infoanzeige
}
//Highlight zuruecksetzen beim weggehen mit der Maus
function resetHighlight(e) {
    //geojson.resetStyle(e.target);
    info.update();
}

//Festlegen, wann welche Funktion ausgefuehrt wird
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}


// OVERLAY-SPEZIFISCHER CODE!!!

// CO2

//Länder-Polygone hinzugefuegt und zum Overlay hinzugefuegt
L.geoJson(COUNTRY).addTo(overlays.coTwo)
//overlays.coTwo.addTo(map)

//Style der Polys CO2
function styleCo(feature) {
    //console.log(feature);
    return {
        fillColor: getColorCo(getData(feature.properties.name_long, "co2")),
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}
L.geoJson(COUNTRY, {
    style: styleCo
}).addTo(overlays.coTwo);

//Zur Karte und zum Overlay hinzufuegen
geojson = L.geoJson(COUNTRY, {
    style: styleCo,
    onEachFeature: onEachFeature
}).addTo(overlays.coTwo);


// CO2 GLOBAL SHARE

L.geoJson(COUNTRY).addTo(overlays.coTwoGlobalShare)
//overlays.coTwoGlobalShare.addTo(map)

function styleGlobalShare(feature) {
    return {
        fillColor: getColorCoGlobalShare(getData(feature.properties.name_long, "share_global_co2")),
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}
L.geoJson(COUNTRY, {
    style: styleGlobalShare
}).addTo(overlays.coTwoGlobalShare);

geojson = L.geoJson(COUNTRY, {
    style: styleGlobalShare,
    onEachFeature: onEachFeature
}).addTo(overlays.coTwoGlobalShare);


// CO2 per capita

L.geoJson(COUNTRY).addTo(overlays.coTwoPerCapita)
//overlays.coTwoPerCapita.addTo(map)

function stylePerCapita(feature) {
    return {
        fillColor: getColorCoPerCapita(getData(feature.properties.name_long, "co2_per_capita")),
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}
L.geoJson(COUNTRY, {
    style: stylePerCapita
}).addTo(overlays.coTwoPerCapita);

geojson = L.geoJson(COUNTRY, {
    style: stylePerCapita,
    onEachFeature: onEachFeature
}).addTo(overlays.coTwoPerCapita);


// CO2 kumuliert

L.geoJson(COUNTRY).addTo(overlays.coTwoCumu)
overlays.coTwoCumu.addTo(map)

function styleCumu(feature) {
    return {
        fillColor: getColorCoCumu(getData(feature.properties.name_long, "cumulative_co2")),
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}
L.geoJson(COUNTRY, {
    style: styleCumu
}).addTo(overlays.coTwoCumu);

geojson = L.geoJson(COUNTRY, {
    style: styleCumu,
    onEachFeature: onEachFeature
}).addTo(overlays.coTwoCumu);


// CO2 GLOBAL SHARE KUMULIERT

L.geoJson(COUNTRY).addTo(overlays.coTwoCumuShare)
//overlays.coTwoCumuShare.addTo(map)

function styleCumuShare(feature) {
    return {
        fillColor: getColorCoCumuShare(getData(feature.properties.name_long, "share_global_cumulative_co2")),
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}

L.geoJson(COUNTRY, {
    style: styleCumuShare
}).addTo(overlays.coTwoCumuShare);

geojson = L.geoJson(COUNTRY, {
    style: styleCumuShare,
    onEachFeature: onEachFeature
}).addTo(overlays.coTwoCumuShare);



// Anzeige oben Rechts. Style siehe CSS
var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
info.update = function (props) {
    this._div.innerHTML = (props ?
        '<b>' + props.properties.name + '</b><hr></hr>' +
        getData(props.properties.name_long, "co2").toFixed(1) + ' Mio. t' + '</b><br/>' + ' CO<sub>2</sub>-Emission pro Jahr' + '<hr></hr>' +
        getData(props.properties.name_long, "share_global_co2").toFixed(1) + ' %' + '</b><br/>' + ' der globalen Emissionen pro Jahr' + '<hr></hr>' +
        getData(props.properties.name_long, "co2_per_capita").toFixed(1) + ' t' + '</b><br/>' + ' CO<sub>2</sub>-Emissionen pro Person und Jahr' + '<hr></hr>' +
        getData(props.properties.name_long, "cumulative_co2").toFixed(1) + ' Mio. t' + '</b><br/>' + ' kumulierte Emissionen' + '<hr></hr>' +
        getData(props.properties.name_long, "share_global_cumulative_co2").toFixed(1) + ' %' + '</b><br/>' + ' der globalen kumulierten Emissionen' :
        'Hover über einen Staat');
};
info.addTo(map);

//Hier kann noch eine Legende eingefuegt werden: https://leafletjs.com/examples/choropleth/ 
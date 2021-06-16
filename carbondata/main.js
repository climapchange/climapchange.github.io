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
    //collapsed: false,
}).addTo(map);

map.attributionControl.addAttribution('<a href="https://github.com/owid/co2-data">OWID</a>');
map.attributionControl.addAttribution('<a href="https://geojson-maps.ash.ms/">AshKyd</a>');

// FUNKTIONEN UNABHAENGIG VOM OVERLAY!!!

// Funktion um CODATA-Daten abzurufen
function getData(polyName, dataType) {
    let lastYear = CODATA[0].country[polyName].data.length - 1;
    return CODATA[0].country[polyName].data[lastYear][dataType];
}

//Adding Interactions nach https://leafletjs.com/examples/choropleth/
let geojson = L.geoJson(COUNTRY);

function highlightFeature(e) {
    var layer = e.target;
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    info.update();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}


// OVERLAY-SPEZIFISCHER CODE!!!

// CO2
L.geoJson(COUNTRY).addTo(overlays.coTwo)
overlays.coTwo.addTo(map)

function styleCo(feature) {
    return {
        fillColor: getColorCo(getData(feature.properties.name_long, "co2")),
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}

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

geojson = L.geoJson(COUNTRY, {
    style: stylePerCapita,
    onEachFeature: onEachFeature
}).addTo(overlays.coTwoPerCapita);


// CO2 kumuliert

L.geoJson(COUNTRY).addTo(overlays.coTwoCumu)
//overlays.coTwoCumu.addTo(map)

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

geojson = L.geoJson(COUNTRY, {
    style: styleCumuShare,
    onEachFeature: onEachFeature
}).addTo(overlays.coTwoCumuShare);

// Funktion um noMatch zu benennen
function getDataPrint(polyName, dataType, einheit) {
    if (getData(polyName, dataType) === 9999999) {
        return "Keine Daten vorhanden";
    } else {
        return getData(polyName, dataType).toFixed(1) + einheit;
    }
}

// Funktion um zu ermitteln welcher Layer geöffnet ist und entsprechendes in Info anzuzeigen
function whichLayer(props) {
    if (map.hasLayer(overlays.coTwo) === true) {
        return getDataPrint(props.name_long, "co2", " Mio. t </b><br/> CO<sub>2</sub>-Emission pro Jahr");
    } else if (map.hasLayer(overlays.coTwoGlobalShare) === true) {
        return getDataPrint(props.name_long, "share_global_co2", " % </b><br/> der globalen Emissionen pro Jahr");
    } else if (map.hasLayer(overlays.coTwoPerCapita) === true) {
        return getDataPrint(props.name_long, "co2_per_capita", " t </b><br/>  CO<sub>2</sub>-Emissionen pro Person und Jahr");
    } else if (map.hasLayer(overlays.coTwoCumu) === true) {
        return getDataPrint(props.name_long, "cumulative_co2", " Mio. t </b><br/> kumulierte Emissionen");
    } else if (map.hasLayer(overlays.coTwoCumuShare) === true) {
        return getDataPrint(props.name_long, "share_global_cumulative_co2", " % </b><br/> der globalen kumulierten Emissionen");
    } else {
        return "Keine Daten vorhanden"
    }
}

// Anzeige oben Rechts. Style siehe CSS
var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
info.update = function (props) {
    this._div.innerHTML = (props ?
        '<b>' + props.name + '</b><hr></hr>' +
        whichLayer(props) :
        'Hover über einen Staat');
};
info.addTo(map);

// Legende

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorCo(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);



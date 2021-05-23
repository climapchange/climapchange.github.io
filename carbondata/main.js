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
map.fitBounds(overlays.coTwo.getBounds());
overlays.coTwo.addTo(map)



//CO2-Daten abrufen

let countries = CODATA[0].country;
console.log('Länder: ', countries)

//Hier muss die Länder-Zahl (Array-Nr.) des Landes eingetragen werden (0-231)
//console.log('Die Anzahl der Poly-Länder beträgt: ', COUNTRY[0].features.length)
//console.log(COUNTRY[0].features)
let polyNr = 231
console.log(polyNr)

//Auf Polygon-Daten zugreifen. Die Zahl hinter features[ZAHL] bestimmt das Land
let polyName = COUNTRY[0].features[polyNr].properties.formal_en;
console.log('polyName: ',polyName)

//um an die Zahl zu kommen nach 'data' muss ich die Länge herausfinden und minus 1 rechnen.
let lastYear = CODATA[0].country[polyName].data.length - 1
console.log('Die Zahl des letzten gelisteten Jahres ist: ', lastYear)

//Automatisch anhand des Poly-Namens nach den CO2 Daten suchen lassen
let coSelect = CODATA[0].country[polyName].data[lastYear].co2
console.log('Die CO2-Daten des gewähten Landes betragen: ',coSelect)

//So werden die ISO-Daten abgerufen. Land muss variabel
let iso = CODATA[0].country[polyName].iso_code
console.log('Der ISO-Code aus den CO2Daten lautet:', iso)

//Auf Polygon-Daten zugreifen. Die Zahl hinter features[ZAHL] bestimmt das Land
let polyIso = COUNTRY[0].features[polyNr].properties.iso_a3;
console.log('Der ISO-Code aus den Poly-Daten lautet: ', polyIso)


//Das klappt schon ganz gut! Allerdings scheinen die Namen bei COUNTRY nicht immer denen bei CODATA zu entsprechen. Beispiel polyNr = 1. Hier ist dann der ISO-Code nötig, was das ganze komplzierter macht, weil es innerhalb von CODATA tief genested ist und z.B über .find() gesucht werden muss




//PopUp
overlays.coTwo.bindPopup(`
<h3>${COUNTRY[0].features[0].properties.formal_en}</h3>
<h1>${overlays.coTwo[0]}</h1>
    `);

//Hier Zugriff auf die Daten mit $?



//CODE-Sammlung

//for (let i = 0; i < CODATA[0].length; i++){
//    console.log(array[i]);
//  }

/*
function onEachFeature(feature, layer) {
    layer.on('click', function (e)) {
        return(feature )
    }
}



const selectedCountry = "data";

for (let coTwo of CODATA) {
    if (selectedCountry == coTwo) {
        selected = 'selected';
    } else {
        selected = 'no';
    }
console.log(selected);
}
*/
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
let polyNr = 50
console.log(polyNr)

//Zur Überprüfung, ob ein Land nicht gleich benannt ist. Dies ist nicht der Fall.
/*
for (let polyNr = 0; polyNr < COUNTRY[0].features.length; polyNr++){
    console.log(COUNTRY[0].features[polyNr].properties.name_long);
  }
*/

//Auf Polygon-Daten zugreifen. Die Zahl hinter features[ZAHL] bestimmt das Land
let polyName = COUNTRY[0].features[polyNr].properties.name_long;
console.log('polyName: ',polyName)

//um an die Zahl zu kommen nach 'data' muss ich die Länge herausfinden und minus 1 rechnen.
let lastYear = CODATA[0].country[polyName].data.length - 1
console.log('Die Array-Nr. des letzten gelisteten Jahres ist: ',lastYear)

let year = CODATA[0].country[polyName].data[lastYear].year
console.log('Die Daten beziehen sich auf das Jahr',year)

//Automatisch anhand des Poly-Namens nach den CO2 Daten suchen lassen
let coSelect = CODATA[0].country[polyName].data[lastYear].co2
console.log('Die jährliche produktionsbedingte CO2-Emission beträgt',coSelect, 'millionen Tonnen')

//So werden die ISO-Daten abgerufen. Land muss variabel
let iso = CODATA[0].country[polyName].iso_code
console.log('Der ISO-Code aus den CO2-Daten lautet:',iso)

//Auf Polygon-Daten zugreifen. Die Zahl hinter features[ZAHL] bestimmt das Land
let polyIso = COUNTRY[0].features[polyNr].properties.iso_a3;
console.log('Der ISO-Code aus den Poly-Daten lautet:',polyIso)



//Wahrscheinlich muss das alles in eine Funktion, wie beim AWS-Beispiel. Also getDirection wird dann in Windrichtungspopup gespeichert und das wird im Popup erst gecalled.



//PopUp
overlays.coTwo.bindPopup(`
<h3>${COUNTRY[0].features[0].properties.formal_en}</h3>
<h1>${overlays.coTwo[0]}</h1>
    `);

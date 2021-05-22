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

//So komme ich an die CO2-Daten eines Landes
//console.log(CODATA[0].country.Albania.data[86].co2)

//um an die Zahl zu kommen nach 'data' muss ich die Länge herausfinden und minus 1 rechnen. Das irgendwie in einer Funktion machen
let lastYear = CODATA[0].country.Albania.data.length-1
console.log('Die Zahl des letzten gelisteten Landes ist: ',lastYear)

//So werden die Daten für das Letzte Jahr abgerufen. Jetzt muss nur noch das Land variabel sein
let co2 = CODATA[0].country.Albania.data[lastYear].co2
console.log('Die Emissionen von Albanien betragen in [Einheit]:',co2)

//So werden die ISO-Daten abgerufen. Land muss variabel
let iso = CODATA[0].country.Albania.iso_code
console.log('CO2-Daten: ISO-Code:',iso)




//Auf Polygon-Daten zugreifen. Die Zahl hinter features[ZAHL] bestimmt das Land
let polys = COUNTRY[0].features[0].properties.iso_a3;
console.log('Poly-Länder: ISO-Code: ', polys)

console.log('Die Anzahl der Poly-Länder beträgt: ',COUNTRY[0].features.length)


//Jetzt braucht es eine Funktion, die beim Anklicken oder beim Einfärben die Ländernamen oder codes Ermittelt und danach den Eintrag in den CO2-Daten heraussucht


//PopUp
overlays.coTwo.bindPopup(`
<h3>Name des Landes</h3>
    `);





//CODE-Sammlung

//for (let i = 0; i < CODATA[0].length; i++){
//    console.log(array[i]);
//  }

/*
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





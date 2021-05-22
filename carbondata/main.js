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


//console.log('CO2-Daten: ', CODATA[0].Afghanistan.data[70].cement_co2);

// Länderliste abrufen
//console.log('CO2-Daten: ', CODATA[0].country);

let countries = CODATA[0].country;
console.log('Länder: ', countries)

//So komme ich an die CO2-Daten
console.log(CODATA[0].country.Albania.data[86].co2)

//um an die Zahl zu kommen nach 'data' muss ich die Länge herausfinden und minus 1 rechnen. Das irgendwie in einer Funktion machen
console.log(CODATA[0].country.Albania.data.length)
let lastYear = CODATA[0].country.Albania.data.length-1
console.log('Die Anzahl der Jahre betraegt: ',lastYear)

console.log(CODATA[0].country.Albania.data[lastYear].co2)


//for (let i = 0; i < CODATA[0].length; i++){
//    console.log(array[i]);
//  }


const selectedCountry = "data";

for (let coTwo of CODATA) {
    if (selectedCountry == coTwo) {
        selected = 'selected';
    } else {
        selected = 'no';
    }
console.log(selected);
}

//Länder-Polygone hinzugefuegt und zum Overlay hinzugefuegt
L.geoJson(COUNTRY).addTo(overlays.coTwo).addTo(map)
map.fitBounds(overlays.coTwo.getBounds());

overlays.coTwo.addTo(map)

//PopUp mit Name, max_height, min_height, total_dist
overlays.coTwo.bindPopup(`
<h3>Name des Landes</h3>
    `);
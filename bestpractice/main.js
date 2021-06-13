
var map = L.map('map', {
    fullscreenControl: true,
}).setView([47.791, 13.217], 7);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//Marker Cluster

// Overlays für die Themen zum Ein- und Ausschalten definieren
let overlays = {
    Stadtentwicklung: L.markerClusterGroup(),
    Gesundheit: L.markerClusterGroup(),
    Soziales: L.markerClusterGroup(),
    UmweltKlima: L.markerClusterGroup()
};

//  Overlays zur Layer-Control hinzufügen
let layerControl = L.control.layers({
    "Stadtentwicklung": overlays.Stadtentwicklung,
    "Gesundheit": overlays.Gesundheit,
    "Soziales": overlays.Soziales,
    "Umwelt, Klima, Landwirtschaft & Tierschutz": overlays.UmweltKlima
}).addTo(map);

// alle Overlays nach dem Laden anzeigen
overlays.Stadtentwicklung.addTo(map);
overlays.Gesundheit.addTo(map);
overlays.Soziales.addTo(map);
overlays.UmweltKlima.addTo(map);


//Icons
var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [38, 38], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    }
});

var UmweltIcon = new LeafIcon({iconUrl: 'icons/tree.png'}),
    SozialIcon = new LeafIcon({iconUrl: 'icons/sozial.png'}),
    StadtIcon = new LeafIcon({iconUrl: 'icons/city.png'});
    GesundheitIcon = new LeafIcon({iconUrl: 'icons/health.png'});



for (let entry of UMWELT) {
    //console.log(entry);

    let mrk = L.marker([entry.lat, entry.lng], {icon: UmweltIcon}).addTo(map);
    mrk.bindPopup(`<h1>${entry.user}<h1>
    <h2>${entry.intro}</h2>
    <h3>${entry.about}</h3>
    <h3>Adresse: ${entry.Adresse}</h3>
    <h3><i class="far fa-envelope mr-3" ></i><a href="mailto:${entry.Mail}" target="_blank">${entry.Mail}</a></h3>
    <p><a href="${entry.weblink}"><i class="fas fa-external-link-alt mr-3"></i>Weiter zur Organisation</a></p>
`).addTo(overlays.UmweltKlima);
}

for (let entry of SOZIALES) {
    //console.log(entry);
    let mrk = L.marker([entry.lat, entry.lng], {icon: SozialIcon}).addTo(map);
    mrk.bindPopup(`<h1>${entry.user}<h1>
    <h2>${entry.intro}</h2>
    <h3>${entry.about}</h3>
    <h3>Adresse: ${entry.Adresse}</h3>
    <h3><i class="far fa-envelope mr-3" ></i><a href="mailto:${entry.Mail}" target="_blank">${entry.Mail}</a></h3>
    <p><a href="${entry.weblink}"><i class="fas fa-external-link-alt mr-3"></i>Weiter zur Organisation</a></p>
`).addTo(overlays.Soziales);
}

for (let entry of STADTENTWICKLUNG) {
    //console.log(entry);
    let mrk = L.marker([entry.lat, entry.lng], {icon: StadtIcon}).addTo(map);
    mrk.bindPopup(`<h1>${entry.user}<h1>
    <h2>${entry.intro}</h2>
    <h3>${entry.about}</h3>
    <h3>Adresse: ${entry.Adresse}</h3>
    <h3><i class="far fa-envelope mr-3" ></i><a href="mailto:${entry.Mail}" target="_blank">${entry.Mail}</a></h3>
    <p><a href="${entry.weblink}"><i class="fas fa-external-link-alt mr-3"></i>Weiter zur Organisation</a></p>
`).addTo(overlays.Stadtentwicklung);
}


for (let entry of GESUNDHEIT) {
    //console.log(entry);
    let mrk = L.marker([entry.lat, entry.lng], {icon: GesundheitIcon}).addTo(map);
    mrk.bindPopup(`<h1>${entry.user}<h1>
    <h2>${entry.intro}</h2>
    <h3>${entry.about}</h3>
    <h3>Adresse: ${entry.Adresse}</h3>
    <h3><i class="far fa-envelope mr-3" ></i><a href="mailto:${entry.Mail}" target="_blank">${entry.Mail}</a></h3>
    <p><a href="${entry.weblink}"><i class="fas fa-external-link-alt mr-3"></i>Weiter zur Organisation</a></p>
`).addTo(overlays.Gesundheit);
}


// Leaflet hash
var hash = new L.Hash(map);

//Minimap
var miniMap = new L.Control.MiniMap( 
    L.tileLayer.provider("BasemapAT.basemap"), {
        toggleDisplay: true,
        minimized: false
    }
).addTo(map);

//Search
/* Search control */
map.addControl(new L.Control.Search({
    url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
    jsonpParam: 'json_callback',
    propertyName: 'display_name',
    propertyLoc: ['lat','lon'],
    markerLocation: true,
    autoType: false,
    autoCollapse: true,
    minLength: 2,
    zoom:16
}));



// Kartenhintergründe der basemap.at definieren
let baselayers = {
    standard: L.tileLayer.provider("BasemapAT.basemap"),
    grau: L.tileLayer.provider("BasemapAT.grau"),
    terrain: L.tileLayer.provider("BasemapAT.terrain"),
    surface: L.tileLayer.provider("BasemapAT.surface"),
    highdpi: L.tileLayer.provider("BasemapAT.highdpi"),
    ortho_overlay: L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ]),
};


// Overlays für die Themen zum Ein- und Ausschalten definieren
let overlays = {
    Stadtentwicklung: L.markerClusterGroup(),
    Wirtschaft: L.markerClusterGroup(),
    Soziales: L.markerClusterGroup(),
    UmweltKlima: L.markerClusterGroup()
};

// Karte initialisieren und auf Wiens Wikipedia Koordinate blicken
let map = L.map("map", {
    fullscreenControl: true,
    center: [48.208333, 16.373056],
    zoom: 13,
    layers: [
        baselayers.grau
    ]
});

// Kartenhintergründe und Overlays zur Layer-Control hinzufügen
let layerControl = L.control.layers({
    "basemap.at Standard": baselayers.standard,
    "basemap.at grau": baselayers.grau,
    "basemap.at Relief": baselayers.terrain,
    "basemap.at Oberfläche": baselayers.surface,
    "basemap.at hochauflösend": baselayers.highdpi,
    "basemap.at Orthofoto beschriftet": baselayers.ortho_overlay
}, {
    "Stadtentwicklung": overlays.Stadtentwicklung,
    "Nachhaltiges Wirtschaften": overlays.Wirtschaft,
    "Soziales": overlays.Soziales,
    "Umwelt, Klima, Landwirtschaft & Tierschutz": overlays.UmweltKlima
}).addTo(map);

// alle Overlays nach dem Laden anzeigen
overlays.Stadtentwicklung.addTo(map);
overlays.Wirtschaft.addTo(map);
overlays.Soziales.addTo(map);
overlays.UmweltKlima.addTo(map);


for (let entry of UMWELT) {
    console.log(entry);
    let mrk = L.marker([entry.lat, entry.lng]).addTo(map);
    mrk.bindPopup(`<h1>${entry.user}<h1>
    <h2>${entry.intro}</h2>
    <h3>${entry.about}</h3>
    <h3>Adresse: ${entry.Adresse}</h3>
    <h3><i class="far fa-envelope mr-3" ></i><a href="mailto:${entry.Mail}" target="_blank">${entry.Mail}</a></h3>
    <p><a href="${entry.weblink}"><i class="fas fa-external-link-alt mr-3"></i>Weiter zur Organisation</a></p>
`).addTo(overlays.UmweltKlima);
}

for (let entry of SOZIALES) {
    console.log(entry);
    let mrk = L.marker([entry.lat, entry.lng]).addTo(map);
    mrk.bindPopup(`<h1>${entry.user}<h1>
    <h2>${entry.intro}</h2>
    <h3>${entry.about}</h3>
    <h3>Adresse: ${entry.Adresse}</h3>
    <h3><i class="far fa-envelope mr-3" ></i><a href="mailto:${entry.Mail}" target="_blank">${entry.Mail}</a></h3>
    <p><a href="${entry.weblink}"><i class="fas fa-external-link-alt mr-3"></i>Weiter zur Organisation</a></p>
`).addTo(overlays.Soziales);
}

for (let entry of STADTENTWICKLUNG) {
    console.log(entry);
    let mrk = L.marker([entry.lat, entry.lng]).addTo(map);
    mrk.bindPopup(`<h1>${entry.user}<h1>
    <h2>${entry.intro}</h2>
    <h3>${entry.about}</h3>
    <h3>Adresse: ${entry.Adresse}</h3>
    <h3><i class="far fa-envelope mr-3" ></i><a href="mailto:${entry.Mail}" target="_blank">${entry.Mail}</a></h3>
    <p><a href="${entry.weblink}"><i class="fas fa-external-link-alt mr-3"></i>Weiter zur Organisation</a></p>
`).addTo(overlays.Stadtentwicklung);
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


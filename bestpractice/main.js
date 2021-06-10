

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
    Stadtentwicklung: L.featureGroup(),
    Wirtschaft: L.featureGroup(),
    Soziales: L.featureGroup(),
    UmweltKlima: L.featureGroup()
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
overlays.stadtentwicklung.addTo(map);
overlays.Wirtschaft.addTo(map);
overlays.Soziales.addTo(map);
overlays.UmweltKlima.addTo(map);



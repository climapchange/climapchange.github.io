//Kartenhintergründe definieren
let baselayers = {
    standard: L.tileLayer.provider("OpenStreetMap.DE"),
    topo: L.tileLayer.provider("OpenTopoMap"),
};

const map = L.map("map", {
    fullscreenControl: true,
    center: [15, 0],
    zoom: 3,
    layers: [
        baselayers.standard
    ]
});

//Kartenhintergründe + Overlays zur Layer-Kontrolle
let layerControl = L.control.layers({
    "Standard": baselayers.standard,
    "Relief": baselayers.topo,
}).addTo(map);

//Mini Map
var miniMap = new L.Control.MiniMap(L.tileLayer.provider("OpenStreetMap.DE"), {
    toggleDisplay: true,
    minimized: false,
}).addTo(map)
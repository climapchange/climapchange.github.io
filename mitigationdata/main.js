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


let layerControl = L.control.layers({
    "Standard": baselayers.standard,
    "Relief": baselayers.topo,
}).addTo(map);
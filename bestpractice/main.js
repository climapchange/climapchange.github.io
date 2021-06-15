
let bounds = [
    [43, 8], // Southwest coordinates
    [51.2, 18] // Northeast coordinates
]

const map = L.map('map', {
    fullscreenControl: true,
    maxBounds: bounds,
    zoomControl: true
}).setView([47.791, 13.217], 7);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//min Zoom: begrenzt Möglichkeit rauszuzoomen
map.setMinZoom( map.getBoundsZoom( map.options.maxBounds ) );

// Overlays für die Themen zum Ein- und Ausschalten definieren

let overlays = {

    UmweltKlima: L.markerClusterGroup(),
    Stadtentwicklung: L.markerClusterGroup(),
    Gesundheit: L.markerClusterGroup(),
    Soziales: L.markerClusterGroup(),
};

//  Overlays zur Layer-Control hinzufügen
let layerControl = L.control.layers({
},{
    "<img src='icons/city.png' /> Stadtentwicklung": overlays.Stadtentwicklung,
    "<img src='icons/health.png' /> Gesundheit": overlays.Gesundheit,
    "<img src='icons/sozial.png' /> Soziales": overlays.Soziales,
    "<img src='icons/tree.png' /> Umwelt, Klima, Landwirtschaft & Tierschutz": overlays.UmweltKlima}, 
    {
        position: 'bottomleft',
        collapsed: false,


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
        iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
        popupAnchor:  [2, -38] // point from which the popup should open relative to the iconAnchor
    }
});

var UmweltIcon = new LeafIcon({iconUrl: 'icons/tree.png'}),
    SozialIcon = new LeafIcon({iconUrl: 'icons/sozial.png'}),
    StadtIcon = new LeafIcon({iconUrl: 'icons/city.png'});
    GesundheitIcon = new LeafIcon({iconUrl: 'icons/health.png'});


for (let entry of UMWELT) {
    //console.log(entry);

    let mrk = L.marker([entry.lat, entry.lng], {icon: UmweltIcon});
    mrk.bindPopup(`<h1>${entry.user}<h1>
    <h3>${entry.intro}</h3>
    <h4>${entry.about}</h4>
    <h4>Adresse: ${entry.Adresse}</h4>
    <h4><i class="far fa-envelope mr-3" style="margin-right: 0.3em"></i><a href=" mailto:${entry.Mail}" target="_blank">${entry.Mail}</a></h4>
    <p><a href="${entry.weblink}" target:"_blank"><i class="fas fa-external-link-alt mr-3" style="margin-right: 0.3em"></i> Weiter zur Organisation</a></p>
`,{maxHeight: 310}).addTo(overlays.UmweltKlima);
}

for (let entry of SOZIALES) {
    //console.log(entry);
    let mrk = L.marker([entry.lat, entry.lng], {icon: SozialIcon});
    mrk.bindPopup(`<h1>${entry.user}<h1>
    <h3>${entry.intro}</h3>
    <h4>${entry.about}</h4>
    <h4>Adresse: ${entry.Adresse}</h4>
    <h4><i class="far fa-envelope mr-3" style="margin-right: 0.3em"></i><a href=" mailto:${entry.Mail}" target="_blank">${entry.Mail}</a></h4>
    <p><a href="${entry.weblink}" target:"_blank"><i class="fas fa-external-link-alt mr-3" style="margin-right: 0.3em"></i>Weiter zur Organisation</a></p>
`,{maxHeight: 310}).addTo(overlays.Soziales);
}

for (let entry of STADTENTWICKLUNG) {
    //console.log(entry);
    let mrk = L.marker([entry.lat, entry.lng], {icon: StadtIcon});
    mrk.bindPopup(`<h1>${entry.user}<h1>
    <h3>${entry.intro}</h3>
    <h4>${entry.about}</h4>
    <h4>Adresse: ${entry.Adresse}</h4>
    <h4><i class="far fa-envelope mr-3" style="margin-right: 0.3em"></i><a href="mailto:${entry.Mail}" target="_blank">${entry.Mail}</a></h4>
    <p><a href="${entry.weblink}" target:"_blank"><i class="fas fa-external-link-alt mr-3" style="margin-right: 0.3em"></i>Weiter zur Organisation</a></p>
`,{maxHeight: 310}).addTo(overlays.Stadtentwicklung);
}


for (let entry of GESUNDHEIT) {
    //console.log(entry);
    let mrk = L.marker([entry.lat, entry.lng], {icon: GesundheitIcon, });
    mrk.bindPopup(`<h1>${entry.user}<h1>
    <h3>${entry.intro}</h3>
    <h4>${entry.about}</h4>
    <h4>Adresse: ${entry.Adresse}</h4>
    <h4><i class="far fa-envelope mr-3" style="margin-right: 0.3em"></i><a href="mailto:${entry.Mail}" target="_blank">${entry.Mail}</a></h4>
    <p><a href="${entry.weblink}" target:"_blank"><i class="fas fa-external-link-alt mr-3" style="margin-right: 0.3em"></i>Weiter zur Organisation</a></p>
`,{maxHeight: 320}).addTo(overlays.Gesundheit);
}


// Leaflet hash
var hash = new L.Hash(map);

//Add Minimap
var miniMap = new L.Control.MiniMap( 
    L.tileLayer.provider("BasemapAT.basemap"), {
        toggleDisplay: true,
        minimized: false
    }
).addTo(map);

//Add Ssale bar
L.control.scale({
    metric: true,
    imperial: false,
    position: ('topleft')
}).addTo(map);
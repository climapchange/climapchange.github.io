function getColor(coData) {
    return coData > 99998 ? '#808080' :
        coData > 1000 ? '#800026' :
        coData > 500 ? '#BD0026' :
        coData > 200 ? '#E31A1C' :
        coData > 100 ? '#FC4E2A' :
        coData > 50 ? '#FD8D3C' :
        coData > 20 ? '#FEB24C' :
        coData > 10 ? '#FED976' :
        '#FFEDA0';
}
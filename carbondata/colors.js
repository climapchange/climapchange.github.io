function getColor(coData) {
    return coData > 99998 ? '#bdbdbd' :
        coData > 1000 ? '#b10026' :
        coData > 500 ? '#e31a1c' :
        coData > 200 ? '#fc4e2a' :
        coData > 100 ? '#fd8d3c' :
        coData > 50 ? '#feb24c' :
        coData > 20 ? '#fed976' :
        coData > 10 ? '#ffeda0' :
        '#ffffcc';
}
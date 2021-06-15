function getColorCo(data) {
        return data > 9999998 ? '#bdbdbd' :
        data > 10000 ? '#b10026' :
        data > 5000 ? '#e31a1c' :
        data > 1000 ? '#fc4e2a' :
        data > 500 ? '#fd8d3c' :
        data > 100 ? '#feb24c' :
        data > 50 ? '#fed976' :
        data > 10 ? '#ffeda0' :
        data > 0 ? '#ffffcc' :
        '#bdbdbd';
}

function getColorCoGlobalShare(data) {
/*    data = chroma.scale(['green', 'red']).domain([0,100]).colors(6);
    return data;
*/    
    return data > 9999998 ? '#bdbdbd' :
        data > 25 ? '#b10026' :
        data > 20 ? '#e31a1c' :
        data > 15 ? '#fc4e2a' :
        data > 10 ? '#fd8d3c' :
        data > 5 ? '#feb24c' :
        data > 1 ? '#fed976' :
        data > 0.5 ? '#ffeda0' :
        data > 0 ? '#ffffcc' :
        '#bdbdbd';
}

function getColorCoPerCapita(data) {
    return data > 9999998 ? '#bdbdbd' :
        data > 20 ? '#b10026' :
        data > 15 ? '#e31a1c' :
        data > 10 ? '#fc4e2a' :
        data > 5 ? '#fd8d3c' :
        data > 1.5 ? '#feb24c' :
        data > 0 ? '#addd8e' :
        '#bdbdbd';
}

function getColorCoCumu(data) {
    return data > 9999998 ? '#bdbdbd' :
        data > 400000 ? '#800026' :
        data > 200000 ? '#bd0026' :
        data > 100000 ? '#e31a1c' :
        data > 50000 ? '#fc4e2a' :
        data > 10000 ? '#fd8d3c' :
        data > 5000 ? '#feb24c' :
        data > 1000 ? '#fed976' :
        data > 500 ? '#ffeda0' :
        data > 0 ? '#ffffcc' :
        '#bdbdbd';
}

function getColorCoCumuShare(data) {
    return data > 9999998 ? '#bdbdbd' :
        data > 25 ? '#b10026' :
        data > 20 ? '#e31a1c' :
        data > 15 ? '#fc4e2a' :
        data > 10 ? '#fd8d3c' :
        data > 5 ? '#feb24c' :
        data > 1 ? '#fed976' :
        data > 0.5 ? '#ffeda0' :
        data > 0 ? '#ffffcc' :
        '#bdbdbd';
}
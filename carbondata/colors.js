function getColorCo(data) {
    return data > 99998 ? '#bdbdbd' :
        data > 10000 ? '#b10026' :
        data > 1000 ? '#b10026' :
        data > 500 ? '#e31a1c' :
        data > 200 ? '#fc4e2a' :
        data > 100 ? '#fd8d3c' :
        data > 50 ? '#feb24c' :
        data > 20 ? '#fed976' :
        data > 10 ? '#ffeda0' :
        '#ffffcc';
}

function getColorCoGlobalShare(data) {
    return data > 99998 ? '#bdbdbd' :
        data > 25 ? '#b10026' :
        data > 20 ? '#e31a1c' :
        data > 15 ? '#fc4e2a' :
        data > 10 ? '#fd8d3c' :
        data > 5 ? '#feb24c' :
        data > 1 ? '#fed976' :
        data > 0.5 ? '#ffeda0' :
        '#ffffcc';
}

function getColorCoPerCapita(data) {
    return data > 99998 ? '#bdbdbd' :
        data > 20 ? '#b10026' :
        data > 15 ? '#e31a1c' :
        data > 10 ? '#fc4e2a' :
        data > 5 ? '#fd8d3c' :
        data > 2 ? '#feb24c' :
        data > 1 ? '#fed976' :
        data > 0.5 ? '#ffeda0' :
        '#ffffcc';
}

function getColorCoCumu(data) {
    return data > 99998 ? '#bdbdbd' :
        data > 10000 ? '#b10026' :
        data > 1000 ? '#b10026' :
        data > 500 ? '#e31a1c' :
        data > 200 ? '#fc4e2a' :
        data > 100 ? '#fd8d3c' :
        data > 50 ? '#feb24c' :
        data > 20 ? '#fed976' :
        data > 10 ? '#ffeda0' :
        '#ffffcc';
}

function getColorCumuShare(data) {
    return data > 99998 ? '#bdbdbd' :
        data > 25 ? '#b10026' :
        data > 20 ? '#e31a1c' :
        data > 15 ? '#fc4e2a' :
        data > 10 ? '#fd8d3c' :
        data > 5 ? '#feb24c' :
        data > 1 ? '#fed976' :
        data > 0.5 ? '#ffeda0' :
        '#ffffcc';
}
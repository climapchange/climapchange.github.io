function getColor(coSelect) {
    //let polyName = feature.properties.name_long;
    //console.log(polyName)
    //let coSelect = (CODATA[0].country[polyName].data[CODATA[0].country[polyName].data.length - 1].co2);
    
    //let lastYear = CODATA[0].country[polyName].data.length - 1;
    //let coSelect = CODATA[0].country[polyName].data[lastYear].co2;
    return coSelect > 1000 ? '#800026' :
        coSelect > 500 ? '#BD0026' :
        coSelect > 200 ? '#E31A1C' :
        coSelect > 100 ? '#FC4E2A' :
        coSelect > 50 ? '#FD8D3C' :
        coSelect > 20 ? '#FEB24C' :
        coSelect > 10 ? '#FED976' :
        '#FFEDA0';
}


function initMap()  {
    const map = L.map('map').setView([39.955, -75.236], 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
      
    map.nonprofitsLayer = L.geoJSON(null, {
        pointToLayer: (feature, latlng) => L.circleMarker(latlng),
        style: {
          color: "#ff6c3c",
          fillColor: "#ff6c3c",
          radius: 5,
          weight: 1.5,
        },
      })
        .bindTooltip(layer => {
        return layer.feature.properties['Organization_Name'];
        })
      .addTo(map);

   

    return map;

};



export {
    initMap
}
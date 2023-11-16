
function setupMapEventHandlers(map) {

  map.eventBus.addEventListener("filtered",(evt)=> {
    const filteredNonprofits = evt.detail
    showNonprofitsOnMap(filteredNonprofits, map);
  })
  
}

function initMap(event)  {
    const map = L.map('map').setView([40, -75.172], 11);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
      
    map.nonprofitsLayer = L.geoJSON(null, {
        pointToLayer: (feature, latlng) => L.circleMarker(latlng),
        style: {
          color: "#a60A3d",
          fillColor: "#a60A3d",
          radius: 5,
          weight: 1.5,
        },
      })
        .bindTooltip(layer => {
        return layer.feature.properties['Organization_Name'];
        })
      .addTo(map);

      map.eventBus = event;

      setupMapEventHandlers(map);

    return map;

};


function showNonprofitsOnMap(nonprofitsToShow, map) {
  console.log(nonprofitsToShow)
  map.nonprofitsLayer.clearLayers();
  
  for (const nonprofit of nonprofitsToShow) {
    map.nonprofitsLayer.addData(nonprofit);
  }
}



export {
    initMap,
    showNonprofitsOnMap
}
import { initMap } from "./map.js";

function grabNonProfitData(onSuccess, onFailure) {
    fetch('data/nonprofits.geojson')
    .then(resp => {
      if (resp.status === 200) {
        const data = resp.json();
        return data;
      } else {
        alert('Oh no, I failed to download the data.');
        if (onFailure) { onFailure() }
      }
    })
    .then(onSuccess);
  }


const map = initMap();
function onNonProfitDataLoad(data) {
    map.nonprofitsLayer.addData(data);
    }





function mapData() {
    grabNonProfitData(onNonProfitDataLoad);

  }



mapData();

//global scale
window.map = map;
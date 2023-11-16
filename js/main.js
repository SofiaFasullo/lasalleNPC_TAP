//import modules
import { initMap, showNonprofitsOnMap } from "./map.js";
import {initializeFilters} from './filters.js';

async function grabNonProfitData(onSuccess, onFailure) {
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

//create map
const eventBus = new EventTarget();
const map = initMap(eventBus);

function onNonProfitDataLoad(data) {
  showNonprofitsOnMap(data.features, map);
  initializeFilters(data,eventBus);
  }

function mapNonprofits() {
    grabNonProfitData(onNonProfitDataLoad);
  }

mapNonprofits();

//global scale
window.map = map;

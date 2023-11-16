
var dataList = document.querySelector('#data-list'); 
var  dataTitle = document.querySelector('#info-title')


function onNonprofitClicked(evt){
    const nonprofit = evt.layer.feature;
    showNonprofitDataInList(nonprofit);
}

function showNonprofitDataInList(feature){
    console.log(feature.properties.Website);
    var nonprofitName = `<h3>${feature.properties['Organization_Name']}</h3>`
    var nonprofitData = `<ul>
       <li>${feature.properties['Address']+''}</li>
       <li>${'Evidence-informed implementation strategies: '+feature.properties['Evidence_Informed_Implementation_Strategies']}</li>
       <li>${'Overall score: '+feature.properties['Overall.Score']}</li>
       <li>${'Location based in NW Philly? '+feature.properties['Location']}</li>
       <li>${'Do they have required documents? '+feature.properties['Required_Documents']}</li>
       <li>${'Programming match: '+feature.properties['Programmability']+'/5'}</li>
       <li>${'Needs match: '+feature.properties['Needs']+'/5'}</li>
       <li>${'Workability match: '+feature.properties['Workability']+'/5'}</li>

       <p>Links: <br>
       <li><a href="${feature.properties['Website']}">Website</a></li>
       <li><a href="${feature.properties['Instagram']}">Instagram</a></li>
       <li><a href="${feature.properties['Facebook']}">Facebook</a></li>
       <li><a href="${feature.properties['Youtube']}">Youtube</a></li>
       <li><a href="${feature.properties['LinkedIn']}">LinkedIn</a></li>
       <li><a href="${feature.properties['Twitter']}">Twitter</a></li>
       </p>


    </ul>`;
    dataList.innerHTML = nonprofitData;
    dataTitle.innerHTML = nonprofitName;
}

export {
    onNonprofitClicked
}
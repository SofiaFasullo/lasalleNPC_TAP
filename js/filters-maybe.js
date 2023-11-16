function initializeFilters (nonprofits, eventBus){

    const allCheckboxes = document.querySelectorAll('.checkbox')

    function callCheckboxes () {
        if (cb.classList.contains('uses-checkbox')) {
            console.log("uses checkbox checked")
            filterUses();
          } else if  (cb.classList.contains('overall-score-checkbox')){
          filterOverallScore(cb);
          } else {
            console.log('no function made yet for this type of checkbox')
          }
      
    }
    

    function resetData(){
        var filteredData = [];
        for (const nonprofit of nonprofits.features){
            filteredData.push(nonprofit);
        }
        const newEvent = new CustomEvent("filtered",
        {
          detail: filteredData
        })
        eventBus.dispatchEvent(newEvent)
    }
    

    function filterUses(){
        var filteredData = [];
            for (const nonprofit of nonprofits.features){
              //console.log(nonprofit.properties['Evidence_Informed_Implementation_Strategies']);
              //console.log(cb.value);
              var use = nonprofit.properties['Evidence_Informed_Implementation_Strategies'];
              if (use!== null && use.includes(cb.value)){
                filteredData.push(nonprofit);
                //console.log(nonprofit.properties['Evidence_Informed_Implementation_Strategies']);
                //console.log(cb.value);
              }
            }
        
        
        const newEvent = new CustomEvent("filtered",
        {
          detail: filteredData
        })
        eventBus.dispatchEvent(newEvent)
      }


      function filterOverallScore(cb){
        var filteredData = [];
            if (cb.value == "null/undecided"){
                for (const nonprofit of nonprofits.features){
                    var overallScore = nonprofit.properties['Overall.Score'];
                    if (overallScore == null){
                      filteredData.push(nonprofit);
                      console.log('null overall score');
                    }
                  }
            } else {
                for (const nonprofit of nonprofits.features){
                var overallScore = nonprofit.properties['Overall.Score'];
                if (overallScore == cb.value || overallScore == cb.value-0.5){
                  filteredData.push(nonprofit);
                }
          }
        }
        const newEvent = new CustomEvent("filtered",
        {
          detail: filteredData
        })
        eventBus.dispatchEvent(newEvent)
      }



    var numChecked = 0
    for (const cb of allCheckboxes){
        cb.addEventListener ( 'change', () => {
        })
        if (cb.checked){
            numChecked = numChecked + 1;
            callCheckboxes();
        } else {
            numChecked = numChecked;
        }
    }
    //after that loop final number should be returned
    if (numChecked = 0){
        console.log('No filters are applied so all data is reset');
        resetData();
    }



    }

export {
    initializeFilters
}

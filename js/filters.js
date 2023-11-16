function initializeFilters (nonprofits, eventBus){

  const allCheckboxes = document.querySelectorAll('.checkbox');

  window.checkboxes = allCheckboxes;

  // event handler
  for (const cb of allCheckboxes){
    cb.addEventListener (
      "change", () => {
        const numChecked = checkUnfiltered();
        if (numChecked > 0){
          const checkboxClasses = cb.classList
          discernCheckboxes(checkboxClasses);
        } else {
          console.log('No filters are applied so all data is reset');
          resetData();
        }
        
      }
    )
  }

  function discernCheckboxes(checkboxTypes){
    if (checkboxTypes.contains('uses-checkbox')){
      filterUses();
    } else if (checkboxTypes.contains('overall-score-checkbox')){
      filterOverallScore();
    } else if (checkboxTypes.contains('budget-checkbox')){
      filterBudget();
    } else if (checkboxTypes.contains('criteria-checkbox')){
      filterCriteria();
    }
  }

  function filterCriteria(){
    const filteredData = []
    for (const cb of allCheckboxes){
      if (cb.checked){
        if (cb.value == 'Needs'){
          for (const nonprofit of nonprofits.features){
          var needs = nonprofit.properties['Needs'];
          if (needs!== null && needs==5){
            filteredData.push(nonprofit);
            }
          }
        } else if (cb.value == 'Programming'){
          for (const nonprofit of nonprofits.features){
          var programming = nonprofit.properties['Programmability'];
          if (programming!== null && programming==5){
            filteredData.push(nonprofit);
            }
          }
        }
        
      }
    }
    const newEvent3 = new CustomEvent("filtered",
    {
      detail: filteredData
    })
    eventBus.dispatchEvent(newEvent3)
  }

  function filterUses(){
    const filteredData = []
    for (const cb of allCheckboxes){
      if (cb.checked){
        for (const nonprofit of nonprofits.features){
          var use = nonprofit.properties['Evidence_Informed_Implementation_Strategies'];
          if (use!== null && use.includes(cb.value)){
            filteredData.push(nonprofit);
          }
        }
      }
    }
    const newEvent3 = new CustomEvent("filtered",
    {
      detail: filteredData
    })
    eventBus.dispatchEvent(newEvent3)
  }

  function filterOverallScore(){
    const filteredData = []
    for (const cb of allCheckboxes){
      if (cb.checked){
        if (cb.value == 'null/undecided'){
          for (const nonprofit of nonprofits.features){
            var overallScore = nonprofit.properties['Overall.Score'];
            if (overallScore==null){
              filteredData.push(nonprofit);
            }
          }
        } else {
          for (const nonprofit of nonprofits.features){
            var overallScore = nonprofit.properties['Overall.Score'];
            if (overallScore!==null && (overallScore==cb.value || overallScore==cb.value+0.5)){
              filteredData.push(nonprofit);
            }
          }
        }
      }
    }
    const newEvent = new CustomEvent("filtered",
    {
      detail: filteredData
    })
    eventBus.dispatchEvent(newEvent)
  }

  function filterBudget(){
    const filteredData = []
    for (const cb of allCheckboxes){
      if (cb.checked){
        if (cb.value == 'null/unknown'){
          for (const nonprofit of nonprofits.features){
            var budget = nonprofit.properties['Annual_Operating_Budget'];
            if (budget==null){
              filteredData.push(nonprofit);
            }
          }
        } else if (cb.value == '$8M - $850K'){
          for (const nonprofit of nonprofits.features){
            var budget = nonprofit.properties['Annual_Operating_Budget'];
            if (budget>= 850000){
              filteredData.push(nonprofit);
            }
          }
        } else if (cb.value == '$350K - 100K'){
          for (const nonprofit of nonprofits.features){
            var budget = nonprofit.properties['Annual_Operating_Budget'];
            if (budget< 850000 && budget >= 100000){
              filteredData.push(nonprofit);
            }
          }
        } else if (cb.value == '85K - 30K'){
          for (const nonprofit of nonprofits.features){
            var budget = nonprofit.properties['Annual_Operating_Budget'];
            if (budget> 100000 && budget >= 30000){
              filteredData.push(nonprofit);
            }
          }
        } else {
          for (const nonprofit of nonprofits.features){
            var budget = nonprofit.properties['Annual_Operating_Budget'];
            if (budget< 30000){
              filteredData.push(nonprofit);
            }
          }
        }
      }
    }
    const newEvent = new CustomEvent("filtered",
    {
      detail: filteredData
    })
    eventBus.dispatchEvent(newEvent)
  }
  
  function checkUnfiltered (){
    var numChecked = 0
    for (const cb of allCheckboxes) {
      if (cb.checked){
        numChecked = numChecked + 1;
      } else {
        numChecked = numChecked;
      }
    }
    return numChecked;
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

  
  
}





  

export {
  initializeFilters
}

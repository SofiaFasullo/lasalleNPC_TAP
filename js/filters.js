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
      console.log("i get to this")
    }
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
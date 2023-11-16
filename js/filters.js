function initializeFilters (nonprofits, eventBus){

  const allCheckboxes = document.querySelectorAll('.checkbox');

  window.checkboxes = allCheckboxes;

  // event handler
  for (const cb of allCheckboxes){
    cb.addEventListener (
      "change", () => {
        const numChecked = checkUnfiltered();
        if (numChecked == 0){
          console.log('No filters are applied so all data is reset');
          resetData();
        } else {
          filterRestaurants();
        }
        
      }
    )
  }

  function filterRestaurants(){
    console.log("I can do this")
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
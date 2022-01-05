import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let parameter=new URLSearchParams(search);
  return parameter.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  try{
  // 1. Fetch adventures using the Backend API and return the data
  let apiDATA = await fetch(`${config.backendEndpoint}/adventures?city=${city}`).then(response=>response.json());
  return apiDATA;
  }catch(err){
     console.log(err,"Error in fetchAdventures()");
     return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

    let advArray=Array.from(adventures);

    advArray.forEach(element => {
    let rowDiv=document.getElementById("data");

    let colDiv=document.createElement("div");
    colDiv.setAttribute("class","col-6 col-lg-3 adventure-card");
    rowDiv.appendChild(colDiv);
  
    let aTag=document.createElement("a");
    aTag.setAttribute("href",`detail/?adventure=${element.id}`);
    aTag.setAttribute("id",`${element.id}`);
    colDiv.appendChild(aTag);

    let imgTag=document.createElement("img");
    imgTag.setAttribute("src",`${element.image}`);
    imgTag.setAttribute("alt",`...`);
    aTag.appendChild(imgTag);
  
    let cardDiv=document.createElement("div");
    cardDiv.setAttribute("class","adventure-card-text");
    aTag.appendChild(cardDiv);

    let catDiv=document.createElement("div");
    catDiv.setAttribute("id","catDivBox");
    aTag.appendChild(catDiv);

    catDiv.innerHTML=`<h5>${element.category}</h5>`
  
    let advTxtRow=document.createElement("div");
    advTxtRow.setAttribute("class","row")
    cardDiv.appendChild(advTxtRow);

    let leftCard=document.createElement("div");
    leftCard.setAttribute("class","left-txt col-7");
    leftCard.innerHTML=`${element.name}`;
    advTxtRow.appendChild(leftCard);
  
    let rightCard=document.createElement("div");
    rightCard.setAttribute("class","right-txt col-5");
    rightCard.innerHTML=`&#8377; ${element.costPerHead}`;
    advTxtRow.appendChild(rightCard);

    let leftCardBot=document.createElement("div");
    leftCardBot.setAttribute("class","left-txt col-7");
    leftCardBot.innerHTML=`Duration`;
    advTxtRow.appendChild(leftCardBot);
  
    let rightCardBot=document.createElement("div");
    rightCardBot.setAttribute("class","right-txt col-5");
    rightCardBot.innerHTML=`${element.duration} Hours`;
    advTxtRow.appendChild(rightCardBot);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  let filterAdv=list.filter((element)=>{
    return element.duration>=low&&element.duration<=high;
  }) ;

  return filterAdv;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  
  let filterAdv=list.filter((element)=>{
    for(let i=0;i<categoryList.length;i++){
      if(element.category==categoryList[i]){
        return true;
      }
    }
  }) ;

  return filterAdv;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  if((filters.category[0]===undefined)&&(filters.duration==="")){
    return list;
  } else if((filters.category[0]!==undefined)&&(filters.duration!=="")){
    // Implementation of filterDataByCat
    let filterDataByCat= filterByCategory(list, filters.category);
    // Implementation of filterDataByDur
    let subString=filters.duration.split('-');
    let low = subString[0];
    let high=subString[1];
    let filterDataByDur = filterByDuration(filterDataByCat,low,high);
    return filterDataByDur;
  } else if(filters.category[0]!==undefined){
    // Implementation of filterDataByCat
    let filterDataByCat= filterByCategory(list, filters.category);
    return filterDataByCat;
  } else{
    // Implementation of filterDataByDur
    let subString=filters.duration.split('-');
    let low = subString[0];
    let high=subString[1];

    let filterDataByDur = filterByDuration(list, low, high);
    return filterDataByDur
  }
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  window.localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format

  let filters=JSON.parse(window.localStorage.getItem("filters"))
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  filters.category.forEach(element=>{
    let catListDiv=document.getElementById("category-list");

    let catPill=document.createElement("div");
    catPill.setAttribute("class","category-filter");
    catPill.innerText=`${element}`;
    catListDiv.appendChild(catPill);
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

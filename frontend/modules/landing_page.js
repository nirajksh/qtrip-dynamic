import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });



}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let endpointAPI=`${config.backendEndpoint}/cities`;

  try{
      let apiJSON= await fetch(endpointAPI).then(response=>response.json());
      return apiJSON;
  } catch(err){
    console.log(err,"Error Found in fetchCities function");
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
   // selecting data div
  let dataDiv = document.getElementById("data");

  //creating a col div
  let colDiv=document.createElement("div");
  colDiv.setAttribute("class","col-6 col-md-6 col-lg-3");
  dataDiv.appendChild(colDiv);

  // creating <a> tag
  let aTag=document.createElement("a");
  aTag.setAttribute("href",`pages/adventures/?city=${id}`);
  aTag.setAttribute("id",`${id}`);
  colDiv.appendChild(aTag);

  // creating tile with div & adding class to it
  let tile=document.createElement("div");
  tile.setAttribute("class","tile");
  tile.setAttribute("class","tile");
  aTag.appendChild(tile);

  // creating tile img using img tag
  let tile_img=document.createElement("img");
  tile_img.setAttribute("src",`${image}`);
  tile_img.setAttribute("alt","...");
  tile.appendChild(tile_img);

  //creating tile-text div
  let textDiv=document.createElement("div");
  textDiv.setAttribute("class","tile-text");
  tile.appendChild(textDiv);

  //creating tile-city
  let tile_city=document.createElement("h5");
  tile_city.innerText=`${city}`;
  textDiv.appendChild(tile_city);

  //creating tile-disc
  let tile_disc=document.createElement("h6");
  tile_disc.innerText=`${description}`;
  textDiv.appendChild(tile_disc);

}

export { init, fetchCities, addCityToDOM };

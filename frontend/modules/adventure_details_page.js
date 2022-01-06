import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params= new URLSearchParams(search);
  return params.get('adventure');
}

//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
      let adventureDetail = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`).then(response=>response.json());
      return adventureDetail;
  }catch(err){
      console.log(err, `Something wrong at fetchAdventureDetails()`);
      return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureName = document.getElementById("adventure-name");
  adventureName.innerHTML=`${adventure.name}`;

  let adventuresubtitle = document.getElementById("adventure-subtitle");
  adventuresubtitle.innerHTML=`${adventure.subtitle}`;

  let photoGallery=document.getElementById("photo-gallery");
  adventure.images.forEach(link => {
    let imgDiv=document.createElement("div");
    photoGallery.appendChild(imgDiv);

    let imgTag=document.createElement("img");
    imgTag.setAttribute("src",`${link}`);
    imgTag.setAttribute("alt",`...`);
    imgTag.setAttribute("class","activity-card-image");
    imgDiv.appendChild(imgTag);
  });

  let adventureContent=document.getElementById("adventure-content");
  adventureContent.innerHTML=`${adventure.content}`;
}

// Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery=document.getElementById("photo-gallery");
  photoGallery.innerHTML="";

  let carouselDiv=document.createElement("div");
  carouselDiv.setAttribute("id","carouselExampleIndicators");
  carouselDiv.setAttribute("class","carousel slide");
  carouselDiv.setAttribute("data-ride","carousel");
  photoGallery.appendChild(carouselDiv);

  let carouselIndicators=document.createElement("ol");
  carouselIndicators.setAttribute("class","carousel-indicators")
  carouselIndicators.setAttribute("role","list-box")
  carouselDiv.appendChild(carouselIndicators);

  let carouselInner=document.createElement("div");
  carouselInner.setAttribute("class","carousel-inner");
  carouselDiv.appendChild(carouselInner);

  images.forEach((img,index)=>{

    let li=document.createElement("li");
    li.setAttribute("data-target","#carouselExampleIndicators");
    li.setAttribute("data-slide-to",`${index}`);
    carouselIndicators.appendChild(li);

    
    let imgDiv=document.createElement("div");
    imgDiv.setAttribute("class","carousel-item");
    carouselInner.appendChild(imgDiv);

    let imgTag=document.createElement("img");
    imgTag.setAttribute("class","d-block w-100 height30");
    imgTag.setAttribute("src",`${img}`);
    imgTag.setAttribute("alt",`${index+1} slide`);
    imgDiv.appendChild(imgTag);

  });

   //adding active class
  document.getElementsByClassName("carousel-item")[0].setAttribute("class","carousel-item active");
  document.querySelector("#carouselExampleIndicators > ol > li:nth-child(1)").setAttribute("class","active");

  let prevAnchor=document.createElement("a");
  prevAnchor.setAttribute("class","carousel-control-prev");
  prevAnchor.setAttribute("href","#carouselExampleIndicators");
  prevAnchor.setAttribute("role","button");
  prevAnchor.setAttribute("data-slide","prev");
  carouselDiv.appendChild(prevAnchor);

  let span1Pre=document.createElement("span");
  span1Pre.setAttribute("class","carousel-control-prev-icon");
  span1Pre.setAttribute("aria-hidden","true");
  prevAnchor.appendChild(span1Pre);

  let span2Pre=document.createElement("span");
  span2Pre.setAttribute("class","sr-only");
  span2Pre.innerHTML="Previous";
  prevAnchor.appendChild(span2Pre);

  let nextAnchor=document.createElement("a");
  nextAnchor.setAttribute("class","carousel-control-next");
  nextAnchor.setAttribute("href","#carouselExampleIndicators");
  nextAnchor.setAttribute("role","button");
  nextAnchor.setAttribute("data-slide","next");
  carouselDiv.appendChild(nextAnchor);

  let span1Next=document.createElement("span");
  span1Next.setAttribute("class","carousel-control-next-icon");
  span1Next.setAttribute("aria-hidden","true");
  nextAnchor.appendChild(span1Next);

  let span2Next=document.createElement("span");
  span2Next.setAttribute("class","sr-only");
  span2Next.innerHTML="Next";
  nextAnchor.appendChild(span2Next);

}


//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available===true){
    let soldOutDiv=document.getElementById("reservation-panel-sold-out");
    soldOutDiv.style.display="none";

    let availableDiv= document.getElementById("reservation-panel-available");
    availableDiv.style.display="block";
    
    let costPerHeadDiv=document.getElementById("reservation-person-cost");
    costPerHeadDiv.innerHTML=`${adventure.costPerHead}`;
  }else {
    let soldOutDiv=document.getElementById("reservation-panel-sold-out");
    soldOutDiv.style.display="block";

    let availableDiv= document.getElementById("reservation-panel-available");
    availableDiv.style.display="none";

}}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalPrice=adventure.costPerHead*persons;

  let totalPriceDiv=document.getElementById("reservation-cost");
  totalPriceDiv.innerHTML=`${totalPrice}`;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  
  const myForm=document.getElementById("myForm");

  myForm.addEventListener("submit" , async (e)=>{
    e.preventDefault();
    //alert("yes");
    const formData = new FormData(myForm);
    const formDataSerialized = Object.fromEntries(formData);
      console.log(formDataSerialized,"formDataSerialized");

      const jsonObject ={
        ...formDataSerialized,adventure:`${adventure.id}`
      };
     console.log(jsonObject);
    try{ const response= await fetch( `${config.backendEndpoint}/reservations/new`,{

      method:'POST',

      body:JSON.stringify(jsonObject),
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
    const json=  await response.json();
    console.log(json);
    alert('success')
  }
    
    catch(e){
      console.error(e);
      alert ('there was an error')
    }

  });
}


  


//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    let reservedBanner=document.getElementById("reserved-banner");
    reservedBanner.style.display="block";
  }else{
    let reservedBanner=document.getElementById("reserved-banner");
    reservedBanner.style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};

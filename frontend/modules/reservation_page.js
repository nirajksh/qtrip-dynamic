import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let reservationDetail=await fetch(`${config.backendEndpoint}/reservations/`).then(response=>response.json());
    return reservationDetail;
  }catch(error){
    console.log(error,"At fetchReservations()");
    return null;
  }
  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  if(reservations.length===0){
    let noReservationBanner=document.getElementById("no-reservation-banner");
    noReservationBanner.style.display="block";

    let reservationTableParent=document.getElementById("reservation-table-parent");
    reservationTableParent.style.display="none";
  }else{
    let noReservationBanner=document.getElementById("no-reservation-banner");
    noReservationBanner.style.display="none";

    let reservationTableParent=document.getElementById("reservation-table-parent");
    reservationTableParent.style.display="block";
  }

  reservations.forEach(element => {
    let reservationTable=document.getElementById("reservation-table");
    let addTd=document.createElement("tr");
    reservationTable.appendChild(addTd);

    let tranId=document.createElement("td");
    addTd.appendChild(tranId);
    tranId.innerHTML=`<b>${element.id}</b>`;

    let bookName=document.createElement("td");
    addTd.appendChild(bookName);
    bookName.innerHTML=`${element.name}`;

    let adventureName=document.createElement("td");
    addTd.appendChild(adventureName);
    adventureName.innerHTML=`${element.adventureName}`;

    let person=document.createElement("td");
    addTd.appendChild(person);
    person.innerHTML=`${element.person}`;

    let date=document.createElement("td");
    addTd.appendChild(date);
    let dateObj=new Date(element.date);
    date.innerHTML=`${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`;

    let price=document.createElement("td");
    addTd.appendChild(price);
    price.innerHTML=`${element.price}`;

    let bookingTime=document.createElement("td");
    addTd.appendChild(bookingTime);
    let bookingTimeObj= new Date(element.time);
    let bookingTimeInt= Number(bookingTimeObj.toLocaleString("en-US",{day:"2-digit"}));
    bookingTime.innerHTML=`${10-(10-bookingTimeInt)} ${bookingTimeObj.toLocaleString("en-US",{month:"long"})} ${bookingTimeObj.toLocaleString("en-US",{year:"numeric"})}, ${bookingTimeObj.toLocaleString("en-US",{timeStyle:"medium"}).toLowerCase()}`;

    let action=document.createElement("td");
    action.setAttribute("id",`${element.id}`);
    addTd.appendChild(action);

    let addATag=document.createElement("a");
    addATag.setAttribute("href",`/frontend/pages/adventures/detail/?adventure=${element.adventure}`);
    action.appendChild(addATag);

    let addDiv=document.createElement("div");
    addDiv.setAttribute("class","reservation-visit-button");
    addDiv.innerHTML="Visit Adventure";
    addATag.appendChild(addDiv);

    console.log(element.adventure);

  });

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };

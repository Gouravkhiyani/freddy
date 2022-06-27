const cform=document.getElementById("contacts-form");
const cname=document.getElementById("contact-name");
const cnumber=document.getElementById("contact-number");
const clocation=document.getElementById("contact-location");
const cemail=document.getElementById("contact-email");
const contactcardcontainer=document.getElementById("contacts-container");

const dummyContacts = [
  { id: 1, name: "a", number: 1, location:"jhansi", email:"abcd" },
  { id: 2, name: "a", number: 1, location:"jhansi", email:"abcd" },
  { id: 3, name: "a", number: 1, location:"jhansi", email:"abcd" },
  { id: 4, name: "a", number: 1, location:"jhansi", email:"abcd" },
];

let contacts = dummyContacts;

const localStorageContacts = JSON.parse(
  localStorage.getItem("contacts")
);

contacts =
  localStorageContacts !== null ? localStorageContacts : [];

function updateLocaleStorage() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// function showNotification() {
//   enotification.classList.add("show");
//   setTimeout(() => {
//     enotification.classList.remove("show");
//   }, 2000);
// }

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addContact(e) {
  e.preventDefault();
  if (cname.value === ' ' || cnumber.value === ' ' || cemail.value === ' ' || clocation.value === ' ') {
    // showNotification();
    console.log("wrong input");
  } else {
    const contact = {
      id: generateID(),
      name: cname.value,
      number: cnumber.value,
      email: cemail.value,
      location: clocation.value
    };
    console.log(contact)
    contacts.push(contact);
    addContactDOM(contact);   
    updateLocaleStorage();
    cname.value = "";
    clocation.value = "";
    cemail.value ="";
    cnumber.value= "";
  }
}

function addContactDOM(contact) {
  const contactitem = document.createElement("div");
  contactitem.classList.add("col-sm-4");
  contactitem.innerHTML = `
                    <div class="col-sm-10">
                        <h5>${contact.name}<br><small><i class="fa fa-map-marker"></i> ${contact.location}</small></h5>
                    </div>
                    <hr>
                    <div class="row text-center py-15">
                    <div class="col-sm-6 text-green">
                        <small class="mt-5"><i class="fa fa-check"></i> ${contact.number}</small>
                    </div>
                    <div class="col-sm-12">
                        <button class="btn btn-primary btn-block"><i class="fa fa-envelope"></i> ${contact.email}</button>
                    </div>
                    </div>
    `;
  contactcardcontainer.appendChild(contactitem);
}

function removeContact(id) {
  contacts = contacts.filter((contact) => contact.id !== id);
  updateLocaleStorage();
  init();
}

// Init
function init() {
  contactcardcontainer.innerHTML = "";
  contacts.forEach(addContactDOM);          
}

init();

cform.addEventListener("submit", addContact);

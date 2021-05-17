let allowItemDelete = true; // If item from list should be deleted
let errorFade; // Name for timeout in addError();

// List Globals
let maxChars = 17; // 17 is max before wrap
let maxItems = 100; // 10 is max before overflow
let lastInput;



function addItem() {
  // Add item from the listInput or
  // perform commands depending on input

  const input = document.getElementById("listInput").value.trim();
  const ul = document.getElementById("list");
  const ulItems = ul.getElementsByTagName("LI");
  
  if (!input) {
    addError("Please enter something");
    document.getElementById("listInput").value = ""; // in-case spaces where added
    focusOn("listInput");
  } else if (input.length > maxChars) {
    addError(`Too long; ${maxChars} max chars\n${input.length} / ${maxChars} characters`);
    focusOn("listInput", true);
  } else {
    addError();

    // Commands
    if(input === "-fill") {
      autoFill();
    } else if(input === "-count") {
      addError(ulItems.length + " items");

    // Too many Items
    } else if (ulItems.length === maxItems){
      addError(`Too many items;\nmax ${maxItems}`);
      // no focusOn() here

    // Add item
    } else {
      const li = document.createElement("LI");
      li.innerText = input;
      li.setAttribute("tabindex", 0);
      ul.appendChild(li);
    }
    document.getElementById("listInput").value = "";
    focusOn("listInput");
  }
  lastInput = input;
}


function removeItem(event) {
  // Remove an item
  // Specifically for items in the list
  if (event.target.tagName === ("LI") && allowItemDelete) {
    setTimeout (() => {
      event.target.remove();
      allowItemDelete = true; // Enable item deletion
    }, 300);
    
    allowItemDelete = false; // Disable item deletion
    addError(message = "");

    // Fade away
    event.target.style.transition = "300ms ease-in";
    event.target.style.opacity = 0;
  }
}

function removeItems() {
  // Remove all items from list
  // Includes a confirmation
  const ul = document.getElementById("list");
  const input = document.getElementById("listInput");
  
  if(ul.innerHTML) {
    getConfirmation(() => {ul.innerHTML = ""}, input);
    addError();
  } else {
    addError("Nothing to clear");
  }
}

function focusOn(id, select = false) {
  document.getElementById(id).focus();
  if(select) {
    document.getElementById(id).select();
  }
}


function autoFill() {
  // Fill the list with numbers
  const ul = document.getElementById("list");
  const length = ul.getElementsByTagName("LI").length;
  if (length === 100) {
    addError("List is already full");
  } else {
    for(let i = length; i < 100; i++) {
      document.getElementById("listInput").value = i+1;
      addItem();
    }
  }
}

function addError(message = "", fade = true) {
  // Add a message above listInput
  clearTimeout(errorFade);

  error = document.getElementById("listError");
  error.innerText = message;

  if (message !== "" && fade) {
    errorFade = setTimeout(addError, 6000);
  }
}
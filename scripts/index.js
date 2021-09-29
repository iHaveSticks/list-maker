
function addItem(itemText = "") {
  const ul = document.getElementById("list");
  const li = document.createElement("LI");

  li.innerText = itemText;
  ul.innerHTML ? li.setAttribute("tabindex", -1) : li.setAttribute("tabindex", 0);
  ul.appendChild(li);
}

function validateInput() {
  // Add item from the listInput or
  // perform commands depending on input

  const input = document.getElementById("listInput").value.trim();
  const ul = document.getElementById("list");
  const ulItems = ul.getElementsByTagName("LI");


  
  if (!input) {
    addError("Please enter something");
    document.getElementById("listInput").value = ""; // in-case spaces were added
    focusOn("listInput");
  } else if (input.length > maxChars) {
    addError(`Too long; ${maxChars} max chars\n${input.length} / ${maxChars} characters`);
    focusOn("listInput", true);
  } else {
    addError();
    console.log(input);
    
    //Commands
    switch (input) {
      case "-fill":
        console.log(input);
        autoFill();
        break;
      
      case "-count":
        addError(ulItems.length + " items");
        break;
  
      default:
        if (ulItems.length === maxItems){ // too many items
          addError(`Too many items;\nmax ${maxItems}`);
        } else {
          addItem(input);
        }
    }

    document.getElementById("listInput").value = "";
    focusOn("listInput");

    if(prevInputs.length = 5) {prevInputs.pop()};
    prevInputs.unshift(input);
    prevInputsPos = -1;
    currInput = "";
  }
}


function removeItem(event) {
  // Remove an item
  // Specifically for items in the list
  if (event.target.tagName === ("LI") && allowItemDelete) {
    next = event.target.nextElementSibling;
    setTimeout (() => {
      if (event.target.tabIndex == 0 && next) {
        next.setAttribute("tabIndex", 0)
      }

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
  // don't use addItem() here
  const ul = document.getElementById("list");
  const length = ul.getElementsByTagName("LI").length;

  if (length === maxItems) {
    addError("List is already full");
  } else {
    for(let i = length; i < maxItems; i++) {
      addItem(i+1);
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
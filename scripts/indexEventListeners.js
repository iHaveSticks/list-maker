const input = document.getElementById("listInput");
const list = document.getElementById("list");

// Remove list item on click / enter
list.addEventListener("click", removeItem);
list.addEventListener("keydown", (event) => {
  // Remove item on enter

  const next = event.target.nextElementSibling;
  const previous = event.target.previousElementSibling;
  if (event.key === "Enter" && allowItemDelete) {
    removeItem(event);
    if(next) {
      next.focus();
    } else if (previous) {
      previous.focus();
    } else {
      input.focus();
    }
  } else if (event.key === "ArrowUp" && previous) {
    event.preventDefault();
    previous.focus();
  } else if (event.key === "ArrowDown" && next) {
    event.preventDefault();
    next.focus();
  }
});

input.addEventListener('input', () => {
  if(prevInputsPos === -1) {
    currInput = input.value;
  }
});

// Keyboard controls
input.addEventListener("keydown", (event) => {
  let ctrl = event.ctrlKey;

  switch(event.key) {

    // Add item on enter
    case "Enter":
      validateInput();
      break;

    // Retrieve / Manuever last inputs / up
    case "ArrowUp":
      if(prevInputs[prevInputsPos + 1]) {
        prevInputsPos++;
        input.value = prevInputs[prevInputsPos];
      }
      break;

    // Retrieve / Manuever last inputs / down
    case "ArrowDown":
      if(prevInputsPos -1 >= 0) {
        prevInputsPos--;
        input.value = prevInputs[prevInputsPos];
      } else {
        prevInputsPos = -1;
        input.value = currInput ? currInput : "";
      }
      break;

    // Delete items on bottom of list (ctrl + x)
    case "x":
      const listArray = list.children;
      if(listArray.length > 0 && ctrl) {
        addError(`Removed Item:\n${listArray[listArray.length - 1].innerText}`, false);
        listArray[listArray.length - 1].remove();
      }
      break;

    }

});
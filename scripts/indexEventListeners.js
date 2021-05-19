const input = document.getElementById("listInput");
const list = document.getElementById("list");

// Remove list item on click / enter
list.addEventListener("click", removeItem);
list.addEventListener("keydown", (event) => {
  // Remove item on enter
  if (event.key === "Enter" && allowItemDelete) {
    const next = event.target.nextElementSibling;
  
    removeItem(event);
    if(next) {
      next.focus();
    } else {
      input.focus();
    }
    // A  dd for arrow up and arrow down
  }
});

// Hover list items
list.addEventListener("mouseover", (event) => {
  const node = event.target;
  if (node.tagName === "LI") {
    node.style.backgroundColor = "#d39a92";
  }
});
list.addEventListener("mouseout", (event) => {
  const node = event.target;
  if (node.tagName === "LI") {
    node.style.backgroundColor = "#a3d392";
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
      addItem();
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
      const list = list.children;
      if(list.length > 0 && ctrl) {
        addError(`Removed Item:\n${list[list.length - 1].innerText}`, false);
        list[list.length - 1].remove();
      }
      break;

    }

});
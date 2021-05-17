

// Remove list item on click / enter
document.getElementById("list").addEventListener("click", removeItem);
document.getElementById("list").addEventListener("keydown", (event) => {
  // Remove item on enter
  if (event.key === "Enter" && allowItemDelete) {
    const next = event.target.nextElementSibling;
  
    removeItem(event);
    if(next) {
      next.focus();
    } else {
      document.getElementById("listInput").focus();
    }
    // A  dd for arrow up and arrow down
  }
});

// Hover list items
document.getElementById("list").addEventListener("mouseover", (event) => {
  const node = event.target;
  if (node.tagName === "LI") {
    node.style.backgroundColor = "#d39a92";
  }
});
document.getElementById("list").addEventListener("mouseout", (event) => {
  const node = event.target;
  if (node.tagName === "LI") {
    node.style.backgroundColor = "#a3d392";
  }
});



// Keyboard controls
document.getElementById("listInput").addEventListener("keydown", (event) => {
  // Add item on enter
  if (event.key === "Enter") {
    addItem();
  }

  // Retrieve last item
  if (event.key === "ArrowUp" && lastInput) {
    document.getElementById("listInput").value = lastInput;
  }

  // Delete items on bottom of list
  let ctrl = event.ctrlKey;

  if (event.key == "x" && ctrl) {//88
    const list = document.getElementById("list").children;
    if(list.length > 0) {
      addError(`Removed Item:\n${list[list.length - 1].innerText}`, false);
      list[list.length - 1].remove();
    }
  }

});
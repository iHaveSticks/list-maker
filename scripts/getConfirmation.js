function getConfirmation(fn, goTo = false) {
  // Create modal to get confirmation, If yes run given funtion
  // fn = function on accept
  // goTo = where to focus next

  // Make Modal
  const modal = document.createElement("DIV");
  modal.setAttribute("ID", "modal");


  // Make Modal Content
  const modalContent = document.createElement("DIV");
  modalContent.setAttribute("ID", "modalContent");


  // Modal Head
  const modalHead = document.createElement("DIV");
  const p = document.createElement("P");
  p.innerText = "Are you sure?";
  modalHead.appendChild(p);

  modalContent.appendChild(modalHead);


  // Modal Foot
  const modalFoot = document.createElement("DIV");

  const btnNo = document.createElement("BUTTON")
  const btnYes = document.createElement("BUTTON")
  btnNo.innerText = "No";
  btnYes.innerText = "Yes";

  btnYes.onclick = () => {
    document.getElementById("modal").remove();
    modal.removeEventListener('keydown', trapTabKey);
    fn();
    if(goTo) {goTo.focus()}
  };
  btnNo.onclick = () => {
    document.getElementById("modal").remove();
    modal.removeEventListener('keydown', trapTabKey);
  }


  // Foot Styles
  btnNo.setAttribute("ID", "modalNo");
  btnNo.setAttribute("class", "btn goodBtn");

  btnYes.setAttribute("class", "btn badBtn");

  modalFoot.style.display = "flex";
  modalFoot.style.justifyContent = "space-evenly";


  // Append to modal
  modalFoot.appendChild(btnNo);
  modalFoot.appendChild(btnYes);
  modalContent.appendChild(modalFoot);


  // Modal Content Style
  modalContent.style.backgroundColor = "#fefefe";
  modalContent.style.margin = "auto";
  modalContent.style.padding = "20px";
  modalContent.style.height = "calc(6em + 40px)";
  modalContent.style.width = "12em";
  modalContent.style.marginTop = "calc(10em - 3em - 20px)";
  modalContent.style.border = "1px solid #888";
  modalContent.style.borderRadius = "0.313em"; //5px
  
  modal.appendChild(modalContent);


  // Modal Styles
  modal.style.position = "fixed";
  modal.style.zIndex = 1;
  modal.style.right = '0';
  modal.style.top = '0';
  modal.style.overflow = "hidden";
  modal.style.margin = 0;
  modal.style.padding = 0;
  modal.style.width = "100vw";
  modal.style.height = "100vh";
  modal.style.backgroundColor = "rgb(0,0,0)";
  modal.style.backgroundColor = "rgba(0,0,0,0.4)";
  modal.style.textAlign = "center";
  modal.style.fontSize = "110%";



 /* Trap tab inside of modal */


  // Find all focusable children
  const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  let focusableElements = modal.querySelectorAll(focusableElementsString);

  // Convert NodeList to Array
  focusableElements = Array.prototype.slice.call(focusableElements);

  const firstTabStop = focusableElements[0];
  const lastTabStop = focusableElements[focusableElements.length - 1];

  firstTabStop.focus();

  const trapTabKey = (e) => {
    // Check for TAB key press
    if (e.keyCode === 9) {

      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }

      // TAB
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }

    // ESCAPE
    // if (e.keyCode === 27) {
    //   closeModal();
    // }
  }
  modal.addEventListener('keydown', trapTabKey);
  document.body.appendChild(modal);
  document.getElementById("modalNo").focus();

}
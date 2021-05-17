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
    fn();
    if(goTo) {goTo.focus()}
  };
  btnNo.onclick = () => {
    document.getElementById("modal").remove();
  }


  // Foot Styles
  btnNo.style.width = "4em";
  btnNo.style.padding = "0.5em";
  btnNo.setAttribute("ID", "modalNo");

  btnYes.style.width = "4em";
  btnYes.style.padding = "0.5em";

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

  document.body.appendChild(modal);
  document.getElementById("modalNo").focus();
}
const amount = document.getElementById("tipper__calculator-input");
const people = document.getElementById("tipper__tip-people");
const billError = document.getElementById("bill-error");
const peopleError = document.getElementById("people-error");
const custom = document.getElementById("custom");
const buttonList = document.getElementById("button-list");
const button = buttonList.querySelectorAll("button");
const tipPerson = document.getElementById("tip-amount");
const totalTip = document.getElementById("tip-total");
const resetButton = document.getElementById("resetButton");
let clickedOnce = false;
let errored = false;

// listen for input from Bill
amount.addEventListener("input", (e) => {
  if (errored) {
    removeError();
  }
  // except Number only.
  numbersOnly(e);
  //keep inputting if no button has been pressed (no calc needed)
  if (!clickedOnce) {
    return;
  }
  //do a validation and output
  if (validate()) {
    outputTip(lastTip);
  }
});

//Listen for input from Custom
custom.addEventListener("input", (e) => {
  removeError(); //remove and displayed errors
  numbersOnly(e); // except numbers only
});

// listen for input from Number Of People
people.addEventListener("input", (e) => {
  if (errored) {
    removeError(); //remove any displayed errors
  }
  numbersOnly(e); //input numbers only
  if (validate()) {
    outputTip(lastTip); //output
  }
});
// button pressed to select tip %
buttonList.addEventListener("click", (e) => {
  clearButtons(); // remove last active button
  lastTip = e.target.value; //note it as the last tip made
  //if not lip then clear output and disable button
  if (!lastTip) {
    disableResetButton();
    tipPerson.innerHTML = "$0.00";
    totalTip.innerHTML = "$0.00";
    return;
  }
  clickedOnce = true; //note there hs been a click
  highLight(e.target); //hightlight the click button
  if (!validate()) {
    return;
  }
  // add output
  outputTip(lastTip);
});
// this listens for custom activity
buttonList.addEventListener("keyup", (e) => {
  lastTip = e.target.value; // note whats in custom
  if (!lastTip) {
    // if nothing the zero out output
    disableResetButton(); // and disable buttoon
    tipPerson.innerHTML = "$0.00";
    totalTip.innerHTML = "$0.00";
    return;
  }
  if (validate()) {
    //valitdate and if all entered
    outputTip(lastTip); //output tips
  }
});
// output tips
function outputTip(e) {
  // Output the tip
  tip = amount.value * perCent(e);
  totalTip.innerHTML = "$" + tip.toFixed(2);
  tipPerson.innerHTML = "$" + (tip / people.value).toFixed(2);
  enableResetButton();
}
// make the button presses as active
function highLight(i) {
  i.classList.add("active");
}
//clear button (reove any active buttons)
function clearButtons() {
  for (let i = 0; i < button.length; i++) {
    button[i].classList.remove("active");
  }
}
// valitate all is ready
function validate(e) {
  if (!people.value || people.value == 0) {
    // zero found or not enters a number
    noZero();
    return false;
  } else if (!amount.value) {
    // check a Bill amount has been entered
    errored = true;
    billError.innerHTML = "Bill amount can't be empty";
    billError.style.color = "red";
    return false;
  }
  return true;
}
// show error as a zero is still in Number of People
function noZero() {
  disableResetButton();
  errored = true;
  peopleError.innerHTML = "Can't be a zero";
  peopleError.style.color = "red";
  people.style.outline = "1px solid red";
  tipPerson.innerHTML = "$0.00";
  totalTip.innerHTML = "$0.00";
}
// errors
function removeError() {
  errored = false;
  peopleError.innerHTML = "";
  people.style.outline = "none";
  billError.innerHTML = "";
}
// reset everything when rest button clicked
function reset() {
  //easy just reload the window
  window.location.reload(true);
}
// enable the reset button
function enableResetButton() {
  resetButton.disabled = false;
  resetButton.style.color = "hsl(var(--green-900)";
  resetButton.style.backgroundColor = "hsl(var(--green-400))";
  resetButton.style.cursor = "pointer";
}
// disable the reset button
function disableResetButton() {
  resetButton.disabled = true;
  resetButton.style.color = null;
  resetButton.style.backgroundColor = null;
  resetButton.style.cursor = null;
}
// hover effect on reset when mouse enters
resetButton.addEventListener("mouseenter", () => {
  if (resetButton.disabled == true) {
    return;
  }
  resetButton.style.backgroundColor = "hsl(var(--grey-200))";
});

// hover effect goes away when leave
resetButton.addEventListener("mouseleave", () => {
  if (resetButton.disabled == true) {
    return;
  }
  resetButton.style.backgroundColor = "hsl(var(--green-400))";
});
// function to except numbers only for inputs
function numbersOnly(num) {
  let inputValue = num.target.value;
  let numericValue = inputValue.replace(/[^0-9]/g, "");
  num.target.value = numericValue;
}
//calc %
const perCent = function (e) {
  return e / 100;
};

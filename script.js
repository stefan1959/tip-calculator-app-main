const amount = document.getElementById("tipper__calculator-input");
const people = document.getElementById("tipper__tip-people");
const peopleError = document.getElementById("people-error");
const custom = document.getElementById("custom");
const buttonList = document.getElementById("button-list");
const button = buttonList.querySelectorAll("button");
const tipPerson = document.getElementById("tip-amount");
const totalTip = document.getElementById("tip-total");

const perCent = function (e) {
  return e / 100;
};
let activeButton = null;

function getTip(index) {
  clearButtons();
  if (!validate()) {
    return;
  }
  removeError();
  activeButton = index;
  highLight(index);
  tip = amount.value * perCent(button[index].value);
  totalTip.innerHTML = "$" + tip.toFixed(2);
  tipPerson.innerHTML = "$" + (tip / people.value).toFixed(2);
}
function getCustom() {
  let pc = custom.value;
  clearButtons();
  if (!validate()) {
    return;
  }
  removeError();
  tip = amount.value * perCent(pc);
  totalTip.innerHTML = "$" + tip.toFixed(2);
  tipPerson.innerHTML = "$" + (tip / people.value).toFixed(2);
}

function customValue() {
  if (!custom.value) {
    return;
  }
  let pc = custom.value;
  return pc;
}
function highLight(i) {
  button[i].classList.add("active");
}
function clearButtons() {
  for (let i = 0; i < button.length; i++) {
    button[i].classList.remove("active");
  }
}

function validate() {
  if (!people.value || people.value == 0) {
    peopleError.innerHTML = "Can't be a zero";
    peopleError.style.color = "red";
    people.style.outline = "1px solid red";
    tipPerson.innerHTML = "$0.00";
    totalTip.innerHTML = "$0.00";
    return false;
  } else {
    return true;
  }
}

function removeError() {
  peopleError.innerHTML = "";
  people.style.outline = "none";
}

function reset() {
  amount.value = "";
  people.value = null;
  tipPerson.innerHTML = "$0.00";
  totalTip.innerHTML = "$0.00";
  custom.value = null;
  custom.innerHTML = "Custom";
  clearButtons();
  removeError();
}

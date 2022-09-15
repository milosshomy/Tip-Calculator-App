//Get elements

const billBox = document.querySelector(".bill-box");
const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".tip-btn");
const customInput = document.getElementById("custom");
const countBox = document.querySelector(".count-box");
const countInput = document.getElementById("count");
const results = document.querySelectorAll(".result");
const errorMessage = document.querySelectorAll(".error-message");
const resetBtn = document.querySelector(".reset-btn");
let tipValue = 0;
//Don't allow letters in inputs

function validateInput(value) {
  let regex = /^[0-9]*\.?[0-9]*$/;
  return value.match(regex);
}

//Bill input

billInput.addEventListener("input", () => {
  if (!validateInput(billInput.value)) {
    billInput.value = billInput.value.substring(0, billInput.value.length - 1);
    errorMessage[0].textContent = "Please use only numbers!";
    setTimeout(function () {
      errorMessage[0].textContent = "";
    }, 2000);
  } else if (billInput.value === "") {
    billBox.classList.remove("active");
  } else {
    billBox.classList.add("active");
    errorMessage[0].textContent = "";
  }

  calculateTips();
});

//Custom input

customInput.addEventListener("input", () => {
  if (!validateInput(customInput.value)) {
    customInput.value = customInput.value.substring(
      0,
      customInput.value.length - 1
    );
    errorMessage[1].textContent = "Please use only numbers!";
    setTimeout(function () {
      errorMessage[1].textContent = "";
    }, 2000);
  } else if (customInput.value === "") {
    customInput.style.border = "none";
  } else {
    customInput.style.border = "2px solid var(--strong-cyan-clr)";
  }

  tipButtons.forEach((tip) => {
    tip.classList.remove("focus");
  });

  tipValue = parseFloat(customInput.value) / 100;

  if (customInput.value !== "") {
    calculateTips();
  }
});

//Count input

countInput.addEventListener("input", (e) => {
  if (!validateInput(countInput.value)) {
    countInput.value = countInput.value.substring(
      0,
      countInput.value.length - 1
    );
    errorMessage[2].textContent = "Please use only numbers!";
    setTimeout(function () {
      errorMessage[2].textContent = "";
    }, 2000);
  } else if (countInput.value === "" || countInput.value <= 0) {
    errorMessage[2].textContent = "Can't be zero!";
    countBox.classList.remove("active");
    setTimeout(function () {
      errorMessage[2].textContent = "";
    }, 2000);
  } else {
    countBox.classList.add("active");
  }

  calculateTips();
});

// Grab value of buttons on click

function getButtonValue(event) {
  //Remove focus state

  tipButtons.forEach((tip) => {
    tip.classList.remove("focus");

    if (event.target.textContent === tip.textContent) {
      tipValue = parseFloat(tip.textContent) / 100;
    }

    //Remove custom value

    customInput.value = "";
  });

  //Activate focus state

  event.target.classList.add("focus");

  calculateTips();
}

tipButtons.forEach((tip) => {
  tip.addEventListener("click", getButtonValue);
});

//Calculate tips

function calculateTips() {
  if (countInput.value >= 1) {
    let tip = (billInput.value * tipValue) / countInput.value;
    let total = (billInput.value * tipValue + 1) / countInput.value;
    results[0].textContent = "$" + tip.toFixed(2);
    results[1].textContent = "$" + total.toFixed(2);
  }
}

//Reset stats on click

resetBtn.addEventListener("click", (e) => {
  results[0].textContent = "$0.00";
  results[1].textContent = "$0.00";
  billInput.value = "";
  tipButtons.forEach((tip) => {
    tip.classList.remove("focus");
  });
  countInput.value = "";
  customInput.value = "";
});

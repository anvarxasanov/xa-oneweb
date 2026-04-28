// ================= HELPER FUNCTIONS =================

function showError(input, message) {
  input.classList.add("input-error"); // red border
  const error = input.parentElement.querySelector(".error-message"); // find error
  error.textContent = message; // set text
  error.classList.add("active"); // show
}

function clearError(input) {
  input.classList.remove("input-error"); // remove red
  const error = input.parentElement.querySelector(".error-message"); // find
  error.textContent = ""; // clear text
  error.classList.remove("active"); // hide
}

function isEmpty(value) {
  return value.trim() === ""; // check empty
}

const nameRegex = /^[A-Za-z\s]+$/; // letters
const phoneRegex = /^[0-9]+$/; // numbers

const form = document.querySelector(".booking__form"); // form

if (form) {

  const nameInput = form.querySelector(".input-name"); // name
  const phoneInput = form.querySelector(".input-phone"); // phone
  const serviceInput = form.querySelector(".input-service"); // service
  const timeInput = form.querySelector(".input-time"); // time

  form.addEventListener("submit", function (e) {

    e.preventDefault(); // stop reload

    let isValid = true; // flag

    [nameInput, phoneInput, serviceInput, timeInput].forEach(clearError); // clear

    if (isEmpty(nameInput.value) || !nameRegex.test(nameInput.value)) {
      showError(nameInput, "Enter valid name"); // error
      isValid = false;
    }

    if (isEmpty(phoneInput.value) || !phoneRegex.test(phoneInput.value)) {
      showError(phoneInput, "Enter valid phone"); // error
      isValid = false;
    }

    if (isEmpty(serviceInput.value)) {
      showError(serviceInput, "Select service"); // error
      isValid = false;
    }

    if (isEmpty(timeInput.value)) {
      showError(timeInput, "Select time"); // error
      isValid = false;
    }

    if (isValid) {
      localStorage.setItem("bookingPhone", phoneInput.value); // save phone
      localStorage.setItem("bookingTime", timeInput.value); // save time
      alert("Booking saved!"); // alert
      form.reset(); // clear form
    }
  });
}

const managePhone = document.querySelector(".manage-phone"); // input
const modifyBtn = document.querySelector(".manage-modify"); // modify
const cancelBtn = document.querySelector(".manage-cancel"); // cancel
const confirmBtn = document.querySelector(".confirm-modify"); // confirm
const modifyPanel = document.querySelector(".modify-panel"); // panel
const currentTimeText = document.querySelector(".current-time-text"); // text

function validatePhone() {
  clearError(managePhone); // clear

  if (isEmpty(managePhone.value) || !phoneRegex.test(managePhone.value)) {
    showError(managePhone, "Enter valid phone"); // error
    return false;
  }
  return true;
}

modifyBtn.addEventListener("click", () => {

  if (!validatePhone()) return; // check

  const savedPhone = localStorage.getItem("bookingPhone"); // get
  const savedTime = localStorage.getItem("bookingTime"); // get

  if (managePhone.value === savedPhone) {
    modifyPanel.style.display = "block"; // show
    currentTimeText.textContent = "Current time: " + savedTime; // set
  } else {
    alert("No booking found"); // alert
  }
});

confirmBtn.addEventListener("click", () => {

  const newTime = document.querySelector(".new-time"); // new time

  if (isEmpty(newTime.value)) {
    showError(newTime, "Select time"); // error
    return;
  }

  localStorage.setItem("bookingTime", newTime.value); // update
  modifyPanel.style.display = "none"; // hide
  alert("Time updated!"); // alert
});

cancelBtn.addEventListener("click", () => {

  if (!validatePhone()) return; // check

  const savedPhone = localStorage.getItem("bookingPhone"); // get

  if (managePhone.value === savedPhone) {
    localStorage.removeItem("bookingPhone"); // remove
    localStorage.removeItem("bookingTime"); // remove
    managePhone.value = ""; // clear input
    currentTimeText.textContent = ""; // clear text
    alert("Booking canceled!"); // alert
  } else {
    alert("No booking found"); // alert
  }

  modifyPanel.style.display = "none"; // hide
});
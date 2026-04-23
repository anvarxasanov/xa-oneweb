// ================= HELPER FUNCTIONS =================

function showError(input, message) {
    input.classList.add("input-error");
    const error = input.parentElement.querySelector(".error-message");
    error.textContent = message;
    error.classList.add("active");
}

function clearError(input) {
    input.classList.remove("input-error");
    const error = input.parentElement.querySelector(".error-message");
    error.textContent = "";
    error.classList.remove("active");
}

// ================= VALIDATION HELPERS =================

// check empty
function isEmpty(value) {
    return value.trim() === "";
}

// regex tests
const nameRegex = /^[A-Za-z\s]+$/;
const phoneRegex = /^[0-9]+$/;

// ================= BOOKING FORM =================

const form = document.querySelector(".booking__form");

if (form) {
    const nameInput = form.querySelector(".input-name");
    const phoneInput = form.querySelector(".input-phone");
    const serviceInput = form.querySelector(".input-service");
    const timeInput = form.querySelector(".input-time");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        [nameInput, phoneInput, serviceInput, timeInput].forEach(clearError);

        if (isEmpty(nameInput.value) || !nameRegex.test(nameInput.value)) {
            showError(nameInput, "Enter valid name");
            isValid = false;
        }

        if (isEmpty(phoneInput.value) || !phoneRegex.test(phoneInput.value)) {
            showError(phoneInput, "Enter valid phone");
            isValid = false;
        }

        if (isEmpty(serviceInput.value)) {
            showError(serviceInput, "Select service");
            isValid = false;
        }

        if (isEmpty(timeInput.value)) {
            showError(timeInput, "Select time");
            isValid = false;
        }

        if (isValid) {
            localStorage.setItem("bookingPhone", phoneInput.value);
            localStorage.setItem("bookingTime", timeInput.value);

            alert("Booking saved!");
            form.reset();
        }
    });
}

// ================= MANAGE =================

const managePhone = document.querySelector(".manage-phone");
const modifyBtn = document.querySelector(".manage-modify");
const cancelBtn = document.querySelector(".manage-cancel");
const confirmBtn = document.querySelector(".confirm-modify");
const modifyPanel = document.querySelector(".modify-panel");
const currentTimeText = document.querySelector(".current-time-text");

// phone check
function validatePhone() {
    clearError(managePhone);

    if (isEmpty(managePhone.value) || !phoneRegex.test(managePhone.value)) {
        showError(managePhone, "Enter valid phone");
        return false;
    }
    return true;
}

// MODIFY
modifyBtn.addEventListener("click", () => {
    if (!validatePhone()) return;

    const savedPhone = localStorage.getItem("bookingPhone");
    const savedTime = localStorage.getItem("bookingTime");

    if (managePhone.value === savedPhone) {
        modifyPanel.style.display = "block";
        currentTimeText.textContent = "Current time: " + savedTime;
    } else {
        alert("No booking found");
    }
});

// CONFIRM MODIFY
confirmBtn.addEventListener("click", () => {
    const newTime = document.querySelector(".new-time");

    if (isEmpty(newTime.value)) {
        showError(newTime, "Select time");
        return;
    }

    localStorage.setItem("bookingTime", newTime.value);
    modifyPanel.style.display = "none";
    alert("Time updated!");
});


cancelBtn.addEventListener("click", () => {
    if (!validatePhone()) return;

    const savedPhone = localStorage.getItem("bookingPhone");

    if (managePhone.value === savedPhone) {
        localStorage.removeItem("bookingPhone");
        localStorage.removeItem("bookingTime");

        // CLEAR INPUT
        managePhone.value = "";

        alert("Booking canceled!");
    } else {
        alert("No booking found");
    }
    modifyPanel.style.display = "none";
});

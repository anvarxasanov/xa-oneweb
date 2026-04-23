
// const form = document.querySelector(".booking__form");

// let user_data = {};
// if (form) {

//     const nameInput = form.querySelector(".input-name");
//     const emailInput = form.querySelector(".input-email");
//     const serviceInput = form.querySelector(".input-service");
//     const phoneInput = form.querySelector(".input-phone");
//     const bookingBtn = document.querySelector(".booking__btn");

//     form.addEventListener("submit", function (e) {
//         e.preventDefault();

//         let isValid = true;

//         // RESET ERRORS
//         clearError(nameInput);
//         clearError(emailInput);
//         clearError(serviceInput);

//         // NAME VALIDATION
//         if (nameInput.value.trim() === "") {
//             showError(nameInput, "Name is required");
//             isValid = false;
//         }

//         // EMAIL VALIDATION
//         if (emailInput.value.trim() === "") {
//             showError(emailInput, "Email is required");
//             isValid = false;
//         } else if (!emailInput.value.checkValidity()) {
//             showError(emailInput, "Enter a valid email");
//             isValid = false;
//         }

//         const phonePattern = /^\+?[0-9]{9,15}$/;

//         // PHONE VALIDATION
//         if (phoneInput.value.trim() === "") {
//             showError(phoneInput, "Phone number is required");
//             isValid = false;
//         } else if (!phonePattern.test(phoneInput.value.trim())) {
//             showError(phoneInput, "Enter a valid phone number");
//             isValid = false;
//         }

//         // SERVICE VALIDATION
//         if (serviceInput.value === "") {
//             showError(serviceInput, "Please select a service");
//             isValid = false;
//         }

//         // SUCCESS
//         if (isValid) {
//             user_data.name = nameInput.value.trim();
//             user_data.email = emailInput.value.trim();
//             user_data.service = serviceInput.value;
//             bookingBtn.addEventListener("click", function () {s
//                 alert("Booking submitted successfully!");
//             });
//             form.reset();

//         }
//     });

//     // SHOW ERROR FUNCTION
//     function showError(input, message) {
//         input.classList.add("input-error");

//         const errorText = input.parentElement.querySelector(".error-message");
//         if (errorText) {
//             errorText.textContent = message;
//             errorText.classList.add("active");
//         }
//     }

//     // CLEAR ERROR FUNCTION
//     function clearError(input) {
//         input.classList.remove("input-error");

//         const errorText = input.parentElement.querySelector(".error-message");
//         if (errorText) {
//             errorText.textContent = "";
//             errorText.classList.remove("active");
//         }
//     }
// }

// const modifyBtn = document.querySelector(".manage-modify");
// const cancelBtn = document.querySelector(".manage-cancel");

// if (modifyBtn && cancelBtn) {

//     modifyBtn.addEventListener("click", function () {
//         const email = document.querySelector(".manage-email").value.trim();
//         const id = document.querySelector(".manage-id").value.trim();

//         if (email === "" || id === "") {
//             alert("Please enter email and phone number.");
//             return;
//         }

//         alert("Redirecting to modify booking...");
//     });

//     cancelBtn.addEventListener("click", function () {
//         const email = document.querySelector(".manage-email").value.trim();
//         const id = document.querySelector(".manage-id").value.trim();

//         if (email === "" || id === "") {
//             alert("Please enter email and phone number.");
//             return;
//         }

//         alert("Booking canceled (demo)");
//     });
// }

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

// // CANCEL
// cancelBtn.addEventListener("click", () => {
//     if (!validatePhone()) return;

//     const savedPhone = localStorage.getItem("bookingPhone");

//     if (managePhone.value === savedPhone) {
//         localStorage.clear();
//         alert("Booking canceled!");
//     } else {
//         alert("No booking found");
//     }
// });

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

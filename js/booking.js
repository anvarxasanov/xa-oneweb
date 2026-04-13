
const form = document.querySelector(".booking__form");

let user_data = {};
if (form) {

    const nameInput = form.querySelector(".input-name");
    const emailInput = form.querySelector(".input-email");
    const serviceInput = form.querySelector(".input-service");
    const phoneInput = form.querySelector(".input-phone");
    const bookingBtn = document.querySelector(".booking__btn");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        // RESET ERRORS
        clearError(nameInput);
        clearError(emailInput);
        clearError(serviceInput);

        // NAME VALIDATION
        if (nameInput.value.trim() === "") {
            showError(nameInput, "Name is required");
            isValid = false;
        }

        // EMAIL VALIDATION
        if (emailInput.value.trim() === "") {
            showError(emailInput, "Email is required");
            isValid = false;
        } else if (!emailInput.value.checkValidity()) {
            showError(emailInput, "Enter a valid email");
            isValid = false;
        }

        const phonePattern = /^\+?[0-9]{9,15}$/;

        // PHONE VALIDATION
        if (phoneInput.value.trim() === "") {
            showError(phoneInput, "Phone number is required");
            isValid = false;
        } else if (!phonePattern.test(phoneInput.value.trim())) {
            showError(phoneInput, "Enter a valid phone number");
            isValid = false;
        }

        // SERVICE VALIDATION
        if (serviceInput.value === "") {
            showError(serviceInput, "Please select a service");
            isValid = false;
        }

        // SUCCESS
        if (isValid) {
            user_data.name = nameInput.value.trim();
            user_data.email = emailInput.value.trim();
            user_data.service = serviceInput.value;
            bookingBtn.addEventListener("click", function () {s
                alert("Booking submitted successfully!");
            });
            form.reset();

        }
    });

    // SHOW ERROR FUNCTION
    function showError(input, message) {
        input.classList.add("input-error");

        const errorText = input.parentElement.querySelector(".error-message");
        if (errorText) {
            errorText.textContent = message;
            errorText.classList.add("active");
        }
    }

    // CLEAR ERROR FUNCTION
    function clearError(input) {
        input.classList.remove("input-error");

        const errorText = input.parentElement.querySelector(".error-message");
        if (errorText) {
            errorText.textContent = "";
            errorText.classList.remove("active");
        }
    }
}
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents page reload

    // Basic data collection
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        subject: this.querySelector('select').value,
        message: this.querySelector('textarea').value
    };

    console.log("Form Data Collected:", formData);

    // Simple success feedback
    alert("Thank you, " + formData.name + "! Your message has been sent successfully.");

    // Reset the form
    this.reset();
});
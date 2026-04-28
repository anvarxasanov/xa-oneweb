// ========================
// INVOICE ELEMENTS
// Selecting all invoice summary elements that get updated in real time
// ========================
const invoiceType = document.querySelector(".invoice__type"); // Website type line item
const invoiceDeadline = document.querySelector(".invoice__deadline"); // Deadline surcharge line item
const invoiceDeadlineStandard = document.querySelector(".invoice__deadline-st"); // "Deadline: 14 days" text line
const invoiceTotalPrice = document.querySelector(".invoice__total-price"); // Large total price display
const invoicePackage = document.querySelector(".invoice__package"); // Package line item
const invoicePages = document.querySelector(".invoice__pages"); // Extra pages line item
const invoicePromocode = document.querySelector(".invoice__promocode"); // Promo discount line item


// ========================
// PRICE TABLE
// All base prices in one object - easy to update without touching logic
// ========================
const prices = {
    landing_price: 50, // Landing page base price
    corporate_price: 80, // Corporate website base price
    blog_price: 60, // Blog base price
    ecommerce_price: 100, // E-commerce base price
    express_deadline: 15, // Extra cost for 7-day deadline
    standard_price: 125, // Standard package extra cost
    premium_price: 170, // Premium package extra cost
    extra_page: 20 // Cost per page above the free 5
}


// ========================
// PROMO CODES
// Each code has a discount percentage, minimum order amount, and active status
// ========================
const promocodes = {
    start10: {
        discount: 10, // 10% discount
        min_amount: 100, // Requires minimum $100 order
        active: "True" // Code is currently active
    },
    vip20: {
        discount: 20, // 20% discount
        min_amount: 200, // Requires minimum $200 order
        active: "True" // Code is currently active
    },
    new5: {
        discount: 5, // 5% discount
        min_amount: 0, // No minimum order
        active: "False" // Code is disabled - will show error if entered
    }
}

// Shared state variables used across all steps
let total_price = 0 // Final price after discount applied
let promo_discount = 0 // Active discount percentage, 0 if no promo applied
let base_price = 0; // Price before discount, used for promo minimum validation


// ========================
// calculateTotal()
// Reads all active selections across all 6 steps and updates invoice
// Called after every user interaction so summary is always up to date
// ========================
function calculateTotal() {
    base_price = 0; // Reset base price before recalculating

    // Add website type price based on which card has active-service class
    if (landing.classList.contains("active-service")) {
        base_price += prices.landing_price; // Add $50 for landing page
    } else if (corporate.classList.contains("active-service")) {
        base_price += prices.corporate_price; // Add $80 for corporate
    } else if (blog.classList.contains("active-service")) {
        base_price += prices.blog_price; // Add $60 for blog
    } else if (ecommerce.classList.contains("active-service")) {
        base_price += prices.ecommerce_price; // Add $100 for e-commerce
    }

    // Add express deadline surcharge if express card is selected
    if (expressDeadline.classList.contains("active-service")) {
        base_price += prices.express_deadline; // Add $15 for 7-day delivery
    }

    // Add package price based on which package card is selected
    if (basic.classList.contains("active-service")) {
        base_price += 0; // Basic is free, no extra cost
    } else if (standard.classList.contains("active-service")) {
        base_price += prices.standard_price; // Add $125 for standard
    } else if (premium.classList.contains("active-service")) {
        base_price += prices.premium_price; // Add $170 for premium
    }

    // Add extra page cost - first 5 pages are free, $20 each after
    const pages = Number(inputPages.value); // Get current slider value as number
    if (pages > 5) {
        base_price += (pages - 5) * prices.extra_page; // Multiply extra pages by $20
    }

    total_price = base_price // Set total to base before applying discount

    // Apply promo discount if one is active
    if (promo_discount > 0) {
        const discount_amount = base_price * promo_discount / 100; // Calculate discount from base price

        total_price -= discount_amount; // Subtract discount from total

        // Show discount line in invoice with amount
        invoicePromocode.innerHTML = `Promo Code Discount: <span class="invoice__price price-green">-$${discount_amount}</span>`;
    } else {
        invoicePromocode.innerHTML = ``; // Hide promo line if no discount applied
    }

    invoiceTotalPrice.textContent = `$${total_price}`; // Update the total price display
}


// ========================
// STEP 1 - Website Type Selection
// Clicking a card deselects all others and selects the clicked one
// ========================
const landing = document.getElementById("typeLanding"); // Landing card element
const corporate = document.getElementById("typeCorporate"); // Corporate card element
const blog = document.getElementById("typeBlog"); // Blog card element
const ecommerce = document.getElementById("typeEcommerce"); // E-commerce card element

const types = [landing, corporate, blog, ecommerce]; // Array of all type cards

types.forEach(function (type) { // Loop through each type card
    type.addEventListener("click", function () { // Add click listener to each card
        types.forEach(el => el.classList.remove("active-service")); // Deselect all cards

        type.classList.add("active-service"); // Select the clicked card
        invoiceType.style.color = "#fff"; // Make invoice type line visible (white text)

        // Update invoice line with the selected type name and price
        if (type === landing) {
            invoiceType.innerHTML = `Landing: <span class="invoice__price">$${prices.landing_price}</span>`; // Show landing price
        } else if (type === corporate) {
            invoiceType.innerHTML = `Corporate: <span class="invoice__price">$${prices.corporate_price}</span>`; // Show corporate price
        } else if (type === blog) {
            invoiceType.innerHTML = `Blog: <span class="invoice__price">$${prices.blog_price}</span>`; // Show blog price
        } else if (type === ecommerce) {
            invoiceType.innerHTML = `E-commerce: <span class="invoice__price">$${prices.ecommerce_price}</span>`; // Show e-commerce price
        }

        calculateTotal(); // Recalculate total after type selection
    });
});


// ========================
// STEP 3 - Deadline Selection
// Standard is free (14 days), Express adds $15 surcharge
// ========================
const standardDeadline = document.getElementById("standardDeadline"); // Standard deadline card
const expressDeadline = document.getElementById("expressDeadline"); // Express deadline card

const deadlines = [standardDeadline, expressDeadline]; // Array of deadline cards

deadlines.forEach(function (deadline) { // Loop through each deadline card
    deadline.addEventListener("click", () => { // Add click listener

        deadlines.forEach(el => el.classList.remove("active-service")); // Deselect all deadline cards
        deadline.classList.add("active-service"); // Select clicked card
        invoiceDeadline.style.color = "#fff"; // Make invoice deadline line visible

        if (deadline === expressDeadline) {
            invoiceDeadline.innerHTML = `Express Deadline: <span class="invoice__price price-green">+$${prices.express_deadline}</span>`; // Show surcharge in invoice
            invoiceDeadlineStandard.innerHTML = ``; // Hide the "14 days" text
        } else if (deadline == standardDeadline) {
            invoiceDeadlineStandard.innerHTML = `Deadline: 14 days`; // Show standard deadline info
            invoiceDeadlineStandard.style.margin = "0"; // Remove margin
            invoiceDeadlineStandard.style.color = "#c4c7ccff"; // Gray color for deadline text
            invoiceDeadline.innerHTML = ``; // Hide express surcharge line
        }

        calculateTotal(); // Recalculate total after deadline selection
    });
});


// ========================
// STEP 4 - Package Selection
// Basic is free, Standard adds $125, Premium adds $170
// ========================
const basic = document.querySelector("#basicPack"); // Basic package card
const standard = document.querySelector("#standardPack"); // Standard package card
const premium = document.querySelector("#premiumPack"); // Premium package card

const packages = [basic, standard, premium]; // Array of all package cards

packages.forEach(function (package) { // Loop through each package card
    package.addEventListener("click", () => { // Add click listener

        packages.forEach(el => el.classList.remove("active-service")); // Deselect all package cards
        package.classList.add("active-service"); // Select clicked card
        invoicePackage.style.color = "#fff"; // Make invoice package line visible

        // Update invoice with selected package name and price
        if (package == basic) {
            invoicePackage.innerHTML = `Package (Basic): <span class="invoice__price">Included</span>`; // Basic is free
        } else if (package == standard) {
            invoicePackage.innerHTML = `Package (Standard): <span class="invoice__price price-green">+$${prices.standard_price}</span>`; // Show standard cost
        } else if (package == premium) {
            invoicePackage.innerHTML = `Package (Premium): <span class="invoice__price price-green">+$${prices.premium_price}</span>`; // Show premium cost
        }

        calculateTotal(); // Recalculate total after package selection
    })
});


// ========================
// STEP 5 - Number of Pages
// Slider from 1-15, first 5 pages free, $20 each after
// ========================
const inputPages = document.querySelector(".pages__input"); // Range slider element
const labelPages = document.querySelector(".pages__label"); // Number label next to slider
const extraPages = document.querySelector(".pages__extra"); // Extra cost text below slider

inputPages.addEventListener("input", () => { // Listen for slider movement
    const pages_quantity = inputPages.value; // Get current slider value

    labelPages.innerHTML = pages_quantity; // Update number shown next to slider
    invoicePages.style.color = "#fff"; // Make invoice pages line visible

    if (pages_quantity > 5) { // Only charge for pages above 5
        const total_price_pages = (pages_quantity - 5) * prices.extra_page // Calculate extra page cost
        extraPages.innerHTML = `Extra pages: +$${total_price_pages}`; // Show cost below slider
        invoicePages.innerHTML = `Extra Pages (x${pages_quantity - 5}) <span class="invoice__price price-green">+$${total_price_pages}</span>`; // Show in invoice
    } else if (pages_quantity <= 5) {
        extraPages.innerHTML = ``; // Hide extra cost text when within free limit
        invoicePages.innerHTML = ``; // Hide invoice line when no extra pages
    }

    calculateTotal(); // Recalculate total after slider change
})


// ========================
// STEP 6 - Promo Code
// Validates code against promocodes object, checks active status and minimum order
// Discount calculated from base_price to avoid double-discount bug
// ========================
const promoInput = document.querySelector(".promocode__input"); // Promo code text input
const promoButton = document.querySelector(".promocode__btn"); // Apply button
const promoNotification = document.querySelector(".promocode__notification"); // Notification area

promoButton.addEventListener("click", () => { // Listen for Apply button click
    const promo = promoInput.value.toLowerCase(); // Get input value and convert to lowercase
    invoicePromocode.style.color = "#fff"; // Make invoice promo line visible

    calculateTotal(); // Recalculate first so base_price is up to date for validation

    if (promo in promocodes) { // Check if entered code exists in promocodes object
        const promo_data = promocodes[promo]; // Get data for this promo code

        if (promo_data.active === "False") { // Check if code is disabled
            promo_discount = 0; // Reset discount to zero

            promoNotification.classList.add("notification-red"); // Add red styling
            promoNotification.innerHTML = `<span><img src="images/x-icon.svg"></span> Inactive promo code!`; // Show error message

        } else if (promo_data.min_amount > base_price) { // Check if order meets minimum amount

            promo_discount = 0; // Reset discount to zero

            promoNotification.classList.add("notification-red"); // Add red styling
            promoNotification.innerHTML = `<span><img src="images/x-icon.svg"></span> This promo requires minimum order of $${promo_data.min_amount}!`; // Show minimum error

        } else {
            promo_discount = promo_data.discount // Store the discount percentage

            // Calculate saved amount from base_price (before discount)
            // Using base_price fixes the bug where discount was calculated from already-reduced total
            const discount_amount = base_price * promo_discount / 100; // Calculate actual savings

            promoNotification.classList.remove("notification-red"); // Remove red styling if previously shown
            promoNotification.classList.add("notification-green"); // Add green styling
            promoNotification.innerHTML = `<span><img src="images/check-icon.svg"></span> Promo code accepted! You saved $${discount_amount}`; // Show success message
        }
    } else {
        promo_discount = 0; // Reset discount for invalid code

        promoNotification.classList.add("notification-red"); // Add red styling
        promoNotification.innerHTML = `<span><img src="images/x-icon.svg"></span> Invalid or inactive promo code!`; // Show invalid code error
    }

    calculateTotal(); // Recalculate again to update invoice with new discount applied
})
// INVOICE elements
const invoiceType = document.querySelector(".invoice__type");
const invoiceDeadline = document.querySelector(".invoice__deadline");
const invoiceDeadlineStandard = document.querySelector(".invoice__deadline-st");
const invoiceTotalPrice = document.querySelector(".invoice__total-price");
const invoicePackage = document.querySelector(".invoice__package");
const invoicePages = document.querySelector(".invoice__pages");



const prices = {
    landing_price: 50,
    corporate_price: 80,
    blog_price: 60,
    ecommerce_price: 100,
    express_deadline: 15,
    standard_price: 125,
    premium_price: 170,
    extra_page: 20
}

let total_price = 0


// CALCULATE AND UPDATE TOTAL
function calculateTotal() {
    total_price = 0;

    if (landing.classList.contains("active-service")) {
        total_price += prices.landing_price;
    } else if (corporate.classList.contains("active-service")) {
        total_price += prices.corporate_price;
    } else if (blog.classList.contains("active-service")) {
        total_price += prices.blog_price;
    } else if (ecommerce.classList.contains("active-service")) {
        total_price += prices.ecommerce_price;
    }

    if (expressDeadline.classList.contains("active-service")) {
        total_price += prices.express_deadline;
    }

    if (basic.classList.contains("active-service")) {
        total_price += 0;
    } else if (standard.classList.contains("active-service")) {
        total_price += prices.standard_price;
    } else if (premium.classList.contains("active-service")) {
        total_price += prices.premium_price;
    }
    const pages = +inputPages.value;
    if (pages > 5) {
        total_price += (pages - 5) * prices.extra_page;
    }

    invoiceTotalPrice.textContent = `$${total_price}`;
}



// Selecting TYPES
const landing = document.getElementById("typeLanding");
const corporate = document.getElementById("typeCorporate");
const blog = document.getElementById("typeBlog");
const ecommerce = document.getElementById("typeEcommerce");

const types = [landing, corporate, blog, ecommerce];

types.forEach(function (type) {
    type.addEventListener("click", function () {
        types.forEach(el => el.classList.remove("active-service"));

        type.classList.add("active-service");
        invoiceType.style.color = "#fff";

        if (type === landing) {
            invoiceType.innerHTML = `Landing: <span class="invoice__price">$${prices.landing_price}</span>`;
            // total_price = prices.landing_price;
        } else if (type === corporate) {
            invoiceType.innerHTML = `Corporate: <span class="invoice__price">$${prices.corporate_price}</span>`;
            // total_price = prices.corporate_price;
        } else if (type === blog) {
            invoiceType.innerHTML = `Blog: <span class="invoice__price">$${prices.blog_price}</span>`;
            // total_price = total_price + prices.blog_price;
        } else if (type === ecommerce) {
            invoiceType.innerHTML = `E-commerce: <span class="invoice__price">$${prices.ecommerce_price}</span>`;
            // total_price = total_price + prices.ecommerce_price;
        }
        
        calculateTotal();
    });
});


// Selecting DEADLINE
const standardDeadline = document.getElementById("standardDeadline"); 
const expressDeadline = document.getElementById("expressDeadline"); 

const deadlines = [standardDeadline, expressDeadline];

deadlines.forEach(function (deadline) {
    deadline.addEventListener("click", () => {

        deadlines.forEach(el => el.classList.remove("active-service"));
        deadline.classList.add("active-service");
        invoiceDeadline.style.color = "#fff";

        if (deadline === expressDeadline) {
            invoiceDeadline.innerHTML = `Express Deadline: <span class="invoice__price price-green">+$${prices.express_deadline}</span>`;
            invoiceDeadlineStandard.innerHTML = ``;
        } else if (deadline == standardDeadline) {
            invoiceDeadlineStandard.innerHTML = `Deadline: 14 days`;
            invoiceDeadlineStandard.style.margin = "0";
            invoiceDeadlineStandard.style.color = "#c4c7ccff";
            invoiceDeadline.innerHTML = ``;
        }
        calculateTotal();
    });
});



// Selecting PACKAGE
const basic = document.querySelector("#basicPack");
const standard = document.querySelector("#standardPack");
const premium = document.querySelector("#premiumPack");

const packages = [basic, standard, premium];

packages.forEach(function (package) {
    package.addEventListener("click", () => {

        packages.forEach(el => el.classList.remove("active-service"));
        package.classList.add("active-service");
        invoicePackage.style.color = "#fff";

        if (package == basic) {
            invoicePackage.innerHTML = `Package (Basic): <span class="invoice__price">Included</span>`;
        } else if (package == standard) {
            invoicePackage.innerHTML = `Package (Standard): <span class="invoice__price price-green">+$${prices.standard_price}</span>`;
        } else if (package == premium) {
            invoicePackage.innerHTML = `Package (Premium): <span class="invoice__price price-green">+$${prices.premium_price}</span>`;
        }

        calculateTotal();
    })
});



// Selecting pages quantity
const inputPages = document.querySelector(".pages__input");
const labelPages = document.querySelector(".pages__label");
const extraPages = document.querySelector(".pages__extra");


inputPages.addEventListener("input", () => {
    const pages_quantity = inputPages.value;
    labelPages.innerHTML = pages_quantity;

    invoicePages.style.color = "#fff";

    if (pages_quantity > 5) {
        const total_price_pages = (pages_quantity - 5) * prices.extra_page
        extraPages.innerHTML = `Extra pages: +$${total_price_pages}`;
        invoicePages.innerHTML = `Extra Pages (x${pages_quantity - 5}) <span class="invoice__price price-green">+$${total_price_pages}</span>`;
    } else if (pages_quantity <= 5) {
        extraPages.innerHTML = ``;
        invoicePages.innerHTML = ``;
    }

    calculateTotal();
})
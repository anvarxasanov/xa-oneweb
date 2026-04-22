const tabs = document.querySelectorAll(".faq-tab");
const items = document.querySelectorAll(".faq-item");
const searchInput = document.getElementById("faqSearch");
const emptyState = document.getElementById("faqEmpty");

let activeCategory = "website-types";

function filterFaqs() {
    const searchValue = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    items.forEach((item) => {
    const category = item.dataset.category;
    const question = item.dataset.question.toLowerCase();
    const matchesCategory = category === activeCategory;
    const matchesSearch = question.includes(searchValue);

    if (matchesCategory && matchesSearch) {
        item.classList.remove("hidden");
        visibleCount++;
    } else {
        item.classList.add("hidden");
        item.classList.remove("open");
    }
    });

    emptyState.style.display = visibleCount === 0 ? "block" : "none";
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    activeCategory = tab.dataset.category;
    filterFaqs();
    });
});

items.forEach((item) => {
    const button = item.querySelector(".faq-question");
    button.addEventListener("click", () => {
    if (item.classList.contains("hidden")) return;

    const isOpen = item.classList.contains("open");

    items.forEach((faq) => faq.classList.remove("open"));

    if (!isOpen) {
        item.classList.add("open");
    }
    });
});

searchInput.addEventListener("input", filterFaqs);

filterFaqs();
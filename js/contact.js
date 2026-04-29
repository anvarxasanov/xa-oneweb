const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const agreeCheckbox = document.getElementById("agree");
const button = form.querySelector("button");

// ===== 1. REAL-TIME VALIDATION =====
function showError(input, message) {
  input.style.borderColor = "red";
}

function showSuccess(input) {
  input.style.borderColor = "#3b6cff";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

nameInput.addEventListener("input", () => {
  if (nameInput.value.trim().length < 2) {
    showError(nameInput);
  } else {
    showSuccess(nameInput);
  }
});

emailInput.addEventListener("input", () => {
  if (!validateEmail(emailInput.value)) {
    showError(emailInput);
  } else {
    showSuccess(emailInput);
  }
});

messageInput.addEventListener("input", () => {
  if (messageInput.value.trim().length < 10) {
    showError(messageInput);
  } else {
    showSuccess(messageInput);
  }
});

// ===== 2. TOAST =====
function showToast(text, success = true) {
  const toast = document.createElement("div");
  toast.innerText = text;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "8px";
  toast.style.color = "#fff";
  toast.style.fontSize = "14px";
  toast.style.zIndex = "999";

  toast.style.background = success ? "#10b981" : "#ef4444";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ===== 3. LOCAL STORAGE =====
function saveToLocalStorage() {
  const data = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem("contactForm", JSON.stringify(data));
}

function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("contactForm"));
  if (data) {
    nameInput.value = data.name || "";
    emailInput.value = data.email || "";
    messageInput.value = data.message || "";
  }
}

// сохраняем при вводе
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener("input", saveToLocalStorage);
});

// загружаем при старте
loadFromLocalStorage();

// ===== 4. FORM SUBMIT + LOADER =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // простая проверка
  if (
    nameInput.value.trim().length < 2 ||
    !validateEmail(emailInput.value) ||
    messageInput.value.trim().length < 10 ||
    !agreeCheckbox.checked
  ) {
    showToast("Please fill all fields correctly ❌", false);
    return;
  }

  // loader
  button.disabled = true;
  button.innerText = "Sending...";

  setTimeout(() => {
    button.disabled = false;
    button.innerText = "Send Message";

    showToast("Message sent successfully ✅");

    form.reset();
    localStorage.removeItem("contactForm");
  }, 1500);
});
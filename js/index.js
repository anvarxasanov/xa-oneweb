const text = ["We Build Websites", "That Work", "For Your Business"];
let i = 0;

setInterval(() => {
    document.querySelector(".hero-content h1").innerText = text[i];
    i = (i + 1) % text.length;
}, 1500);


const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });

}, { threshold: 0.2 });

document.querySelectorAll(".card, .feature-card, .testimonial, .stat").forEach(el => observer.observe(el));

const slider = document.querySelector(".slider");
const track = document.querySelector(".slide-track");

slider.addEventListener("mouseenter", () => {
  track.style.animationPlayState = "paused";
});

slider.addEventListener("mouseleave", () => {
  track.style.animationPlayState = "running";
});
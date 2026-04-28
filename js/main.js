const sidebar = document.querySelector(".site-header__sidebar") // Select the mobile sidebar element
const sidebarToggler = document.querySelector(".site-header__menu-btn") // Select the burger menu button

if (sidebarToggler) { // Check if burger button exists on this page before adding a listener
    sidebarToggler.addEventListener("click", function () { // Waits for click on burger button
        sidebar.classList.toggle("site-header__sidebar--open") // Add or remove the open class to show/hide sidebar
    })
}

window.addEventListener('resize', function () { // Listen for window resize events
    if (window.innerWidth > 850) { // Check if screen is wider than breakpoint
        sidebar.classList.remove('site-header__sidebar--open'); // Close sidebar automatically on desktop
    }
});
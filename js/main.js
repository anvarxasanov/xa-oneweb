const sidebar = document.querySelector(".site-header__sidebar")
const sidebarToggler = document.querySelector(".site-header__menu-btn")

if (sidebarToggler) {
    sidebarToggler.addEventListener("click", function () {
        sidebar.classList.toggle("site-header__sidebar--open")
    })
}

window.addEventListener('resize', function () {
    if (window.innerWidth > 850) {
        sidebar.classList.remove('site-header__sidebar--open');
    }
});
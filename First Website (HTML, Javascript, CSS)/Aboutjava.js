"use strict";
const scroll_button = document.getElementById("scroll-button");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scroll_button.style.display = "block";
    } else {
        scroll_button.style.display = "none";
    }
});
scroll_button.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth" });
});
function darkMode() {
    const content = document.body;
    content.classList.toggle("dark-mode");}
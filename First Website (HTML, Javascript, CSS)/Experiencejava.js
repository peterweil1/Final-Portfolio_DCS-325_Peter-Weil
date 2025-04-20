"use strict";
const scroll_button = document.getElementById("scroll-button");

window.addEventListener("scroll", () => {
    if (window.scrollY > 210) {
        scroll_button.style.display = "block";
    } else {
        scroll_button.style.display = "none";
    }
});
scroll_button.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth" });
});

const button1 = document.getElementById('expand-button1');

button1.addEventListener('click', () => {
    const text_element = button1.nextElementSibling; 

    text_element.classList.toggle('expanded');

    if (text_element.classList.contains('expanded')) {
        button1.textContent = '-';
    } else {
        button1.textContent = '+';
    }
});
scroll_button.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth" });
});

const button2 = document.getElementById('expand-button2');

button2.addEventListener('click', () => {
    const text_element = button2.nextElementSibling; 

    text_element.classList.toggle('expanded');

    if (text_element.classList.contains('expanded')) {
        button2.textContent = '-';
    } else {
        button2.textContent = '+';
    }
});
scroll_button.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth" });
});

const button3 = document.getElementById('expand-button3');

button3.addEventListener('click', () => {
    const text_element = button3.nextElementSibling; 

    text_element.classList.toggle('expanded');

    if (text_element.classList.contains('expanded')) {
        button3.textContent = '-';
    } else {
        button3.textContent = '+';
    }
});
scroll_button.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth" });
});

const button4 = document.getElementById('expand-button4');

button4.addEventListener('click', () => {
    const text_element = button4.nextElementSibling; 

    text_element.classList.toggle('expanded');

    if (text_element.classList.contains('expanded')) {
        button4.textContent = '-';
    } else {
        button4.textContent = '+';
    }
});
scroll_button.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth" });
});

const button5 = document.getElementById('expand-button5');

button5.addEventListener('click', () => {
    const text_element = button5.nextElementSibling; 

    text_element.classList.toggle('expanded');

    if (text_element.classList.contains('expanded')) {
        button5.textContent = '-';
    } else {
        button5.textContent = '+';
    }
});
function darkMode() {
    const content = document.body;
    content.classList.toggle("dark-mode");}
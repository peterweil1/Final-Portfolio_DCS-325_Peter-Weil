"use strict";
const box = document.getElementById("the_box");

function recolorbox(){
    box.style.backgroundColor = "orange";
}

box.addEventListener("click", recolorbox);
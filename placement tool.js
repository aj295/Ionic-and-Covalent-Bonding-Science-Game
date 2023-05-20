import { pxToVh, pxToVw } from "./script.js"

export function getCoordsOnClick() {
    window.addEventListener("click", onClick)
}

function onClick(event) {
    console.log("x: " + pxToVw(event.x))
    console.log("y: " + pxToVh(event.y))
    window.removeEventListener("click", onClick)
}
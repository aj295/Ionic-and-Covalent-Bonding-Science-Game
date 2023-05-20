import { pxToVh, pxToVw } from "./script.js"
let count = 0
let firstCoordPair = [undefined, undefined]
let secondCoordPair = [undefined, undefined]
let active = false

export function getCoordsOnClick() {
    if (!active) {
        window.addEventListener("click", onClick)
        console.log("The tool for easily making a box of collision lines is currently active")
        console.log("make sure to first, click the upper right of box you are selecting")
        console.log("and then click the bottom right, in order to insure that this tool works")
        active = true
    }
    else console.log("currently already using function")
}

function onClick(event) {
    count++
    if (count == 1) {
        firstCoordPair[0] = (pxToVw(event.x))
        firstCoordPair[1] = (pxToVh(event.y))
    }
    else if (count == 2) {
        secondCoordPair[0] = (pxToVw(event.x))
        secondCoordPair[1] = (pxToVh(event.y))

        console.log("let line1 = new Line(vwToPx(" + firstCoordPair[0] + "), vhToPx(" + firstCoordPair[1] + "), vwToPx(" + secondCoordPair[0] + "), vhToPx(" + firstCoordPair[1] + "), thisLevel)")
        console.log("let line2 = new Line(vwToPx(" + firstCoordPair[0] + "), vhToPx(" + secondCoordPair[1] + "), vwToPx(" + secondCoordPair[0] + "), vhToPx(" + secondCoordPair[1] + "), thisLevel)")
        console.log("let line3 = new Line(vwToPx(" + firstCoordPair[0] + "), vhToPx(" + firstCoordPair[1] + "), vwToPx(" + firstCoordPair[0] + "), vhToPx(" + secondCoordPair[1] + "), thisLevel)")
        console.log("let line4 = new Line(vwToPx(" + secondCoordPair[0] + "), vhToPx(" + firstCoordPair[1] + "), vwToPx(" + secondCoordPair[0] + "), vhToPx(" + secondCoordPair[1] + "), thisLevel)")

        window.removeEventListener("click", onClick)
        count = 0
        active = false
    }
}
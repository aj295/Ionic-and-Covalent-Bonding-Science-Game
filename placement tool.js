import { pxToVh, pxToVw } from "./script.js"
let count = 0
let firstCoordPair = [undefined, undefined]
let secondCoordPair = [undefined, undefined]
let boxActive = false

export function beginMakingBox() {
    if (!boxActive) {
        window.addEventListener("click", clicksHandler)
        console.log("The tool for easily making a box of collision lines is currently active")
        console.log("make sure to first, click the upper left of box you are selecting")
        console.log("and then click the bottom right, in order to insure that this tool works")
        boxActive = true
    }
    else console.log("currently already using function")
}

function clicksHandler(event) {
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
        firstCoordPair = [undefined, undefined]
        secondCoordPair = [undefined, undefined]    
        boxActive = false
    }
}

export function getCoordsOnClick() {
    if (!boxActive) window.addEventListener("click", onClick)
    else console.log("can not register event, perhaps you are making a collision box")
    window.addEventListener("click", onClick)
}

function onClick(event) {
    console.log("x" + event.x + " -> px")
    console.log("y" + event.y + " -> px")
    console.log("x: " + pxToVw(event.x) + " -> vw")
    console.log("y: " + pxToVh(event.y) + " -> vh")
    window.removeEventListener("click", onClick)
}
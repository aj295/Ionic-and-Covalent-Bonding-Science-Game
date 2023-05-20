import { window_height, window_width } from "./script.js"

let box = undefined
let numClick = 0

export function getCoordsOnClick() {
    if (box == undefined) window.addEventListener("click", onClick)
    else console.log("can not register event, perhaps you are making a collision box")
}

function onClick(event) {
    console.log(event.x)
    console.log(event.y)
    window.removeEventListener("click", onClick)
}

export function createCollisionBox() {
    if (box == undefined) {
        window.addEventListener("click", boxClickHandler)
    }
    else console.log("currently making box")
}

function boxClickHandler(event) {
    numClick++
    if (numClick == 1) {
        if (box == undefined) {
            box = document.createElement("div")
            document.body.appendChild(box)
            box.style.position = "fixed"
            box.style.left = event.x + "px"
            box.style.top = event.y + "px"
            box.style.border = "3px solid red"

            window.addEventListener("mousemove", movingMouse)
        }

        else console.log("currently making box")
    }

    else if (numClick == 2) {
        window.removeEventListener("click", boxClickHandler)
        window.removeEventListener("mousemove", movingMouse)

        console.log("new Line(" + box.style.left.replace(/[^0-9]/g,"") + "," + box.style.top.replace(/[^0-9]/g,"") + "," + box.style.right.replace(/[^0-9]/g,"") + "," + box.style.top.replace(/[^0-9]/g,"") + ","  + "thisLevel)")
        console.log("new Line(" + box.style.left.replace(/[^0-9]/g,"") + "," + box.style.bottom.replace(/[^0-9]/g,"") + "," + box.style.right.replace(/[^0-9]/g,"") + "," + box.style.bottom.replace(/[^0-9]/g,"") + ","  + "thisLevel)")
        console.log("new Line(" + box.style.left.replace(/[^0-9]/g,"") + "," + box.style.top.replace(/[^0-9]/g,"") + "," + box.style.left.replace(/[^0-9]/g,"") + "," + box.style.bottom.replace(/[^0-9]/g,"") + ","  + "thisLevel)")
        console.log("new Line(" + box.style.right.replace(/[^0-9]/g,"") + "," + box.style.top.replace(/[^0-9]/g,"") + "," + box.style.right.replace(/[^0-9]/g,"") + "," + box.style.bottom.replace(/[^0-9]/g,"") + ","  + "thisLevel)")

        numClick = 0
        box = undefined
    }
}

function movingMouse(event) {
    box.style.right = event.x + "px"
    box.style.bottom = event.y + "px"
}
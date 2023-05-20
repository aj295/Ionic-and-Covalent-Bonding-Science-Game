export function getCoordsOnClick() {
    if (box == undefined) window.addEventListener("click", onClick)
    else console.log("can not register event, perhaps you are making a collision box")
}

function onClick(event) {
    console.log("x" + event.x)
    console.log("y" + event.y)
    window.removeEventListener("click", onClick)
}
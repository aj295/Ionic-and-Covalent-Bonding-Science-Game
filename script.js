import Line from "./line.js"
import Character from "./character/character.js"
import CharacterController from "./character/characterController.js"
import spriteMap from "./character/spriteMap.js"
import Element from "./element.js"
import Level from "./level.js"
import Photon from "./photon.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let window_height = window.screen.height
let window_width = window.screen.width

canvas.height = window_height
canvas.width = window_width
canvas.style.background = "teal"


const characterHeight = 50
let level1 = new Level(1, [window_width/2, window_height - characterHeight])

let electron = new spriteMap("./Sprites/negative.png", 1)
let positive = new spriteMap("./Sprites/positive.png", 1)
let photonSprite = new spriteMap("./Sprites/photonLeft.png", 3, "./Sprites/photonLeft.png", "./Sprites/photonRight.png")

let photon = new Photon(ctx, level1, photonSprite, 100, 100)

let character = new Character(ctx, level1, electron, window_width/2, window_height - characterHeight, 0.01)
character.draw()

let characterController = new CharacterController(character, 1.2, 300, 4)
characterController.startControllerInput("Space", "KeyA", "KeyD", "ShiftLeft")

let element = new Element(ctx, level1, -1, 0.9, electron, window_width - 1000, window_height - characterHeight)
element.draw()

let element2 = new Element(ctx, level1, 1, 0.9, positive, 20, window_height - characterHeight - 100)
element2.draw()

let element3 = new Element(ctx, level1, 1, 0.9, positive, window_width - 400, window_height - characterHeight - 100)
element3.draw()

// let testElement = new Element(ctx, -1, "./Sprites/positive.png", 100, 100, 0.5)
// testElement.draw()
let windowLeftBounds = new Line(0, 0, 0, window_height, ctx, level1)
let windowRightBounds = new Line(window_width, 0, window_width, window_height, ctx, level1)

// let diagonal = new Line(1700, 100, 1100, window_height - 100, ctx, level1)
// diagonal.draw()

let testFloor = new Line(10, window_height - 25, 500, window_height - 25, ctx, level1)
testFloor.draw()

let testFloorWithWall = new Line(10, 100, 10, window_height - 25, ctx, level1)
testFloorWithWall.draw()

let tick = () => {
    requestAnimationFrame(tick)
    level1.tickLevel()
}

window.addEventListener("keypress", (event) => {
    if (event.code == "KeyF") {
        element2.remove()
        element2 = null
        console.log(element2)
    }
})

tick()
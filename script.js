import Line from "./line.js"
import Character from "./character/character.js"
import CharacterController from "./character/characterController.js"
import spriteMap from "./character/spriteMap.js"
import Element from "./element.js"
import Level from "./level.js"

let lastCalledTime
export let fps

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let window_height = window.screen.height
let window_width = window.screen.width

canvas.height = window_height
canvas.width = window_width
canvas.style.background = "teal"

let level1 = new Level(1)

let electron = new spriteMap("./Sprites/negative.png", 0.5)

const characterHeight = 50
let character = new Character(ctx, level1, electron, window_width/2, window_height - characterHeight, 0.01)
character.draw()

let characterController = new CharacterController(character, 1.8, 300)
characterController.startControllerInput("Space", "KeyA", "KeyD", "ShiftLeft")

let element = new Element(ctx, level1, 1, 1, electron, (window_width/2) + 100, window_height - characterHeight)
element.draw()

let element2 = new Element(ctx, level1, 1, 1, electron, 20, window_height - characterHeight - 25)
element2.draw()

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

function calculateFps() {
    if (!lastCalledTime) {
        lastCalledTime = performance.now()
        fps = 0
        return
    }
    let delta = (performance.now() - lastCalledTime) / 1000
    lastCalledTime = performance.now()
    fps = 1/delta
}

let tick = () => {
    requestAnimationFrame(tick)
    level1.tickLevel()
    calculateFps()
}

tick()
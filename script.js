import Line from "./line.js"
import Character from "./character/character.js"
import CharacterController from "./character/characterController.js"
import spriteMap from "./character/spriteMap.js"
import Element from "./element.js"
import Level from "./level.js"
import Photon from "./photon.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const electron = new spriteMap("./Sprites/negative.png", 1)
const positive = new spriteMap("./Sprites/positive.png", 1)
const photonSprite = new spriteMap("./Sprites/photonLeft.png", 3, "./Sprites/photonLeft.png", "./Sprites/photonRight.png")
const characterHeight = 50
const background = document.getElementById("backgroundImage")

let window_height = window.screen.height
let window_width = window.screen.width
let currentLevel = undefined

canvas.height = window_height
canvas.width = window_width
canvas.style.background = "transparent"

let level1Ini = function(thisLevel) {
    console.log("begin level")

    let windowLeftBounds = new Line(0, 0, 0, window_height, ctx, thisLevel)
    let windowRightBounds = new Line(window_width, 0, window_width, window_height, ctx, thisLevel)

    let photon = new Photon(ctx, thisLevel, photonSprite, 100, 100)

    let character = new Character(ctx, thisLevel, electron, window_width/2, window_height - characterHeight, 0.01)
    character.draw()

    let characterController = new CharacterController(character, 1.2, 300, 4)
    characterController.startControllerInput("Space", "KeyA", "KeyD", "ShiftLeft")

    let element = new Element(ctx, thisLevel, -1, 0.9, electron, 600, window_height - characterHeight)
    element.draw()

    let element2 = new Element(ctx, thisLevel, 1, 0.9, positive, 20, window_height - characterHeight - 100) 
    element2.draw()

    let element3 = new Element(ctx, thisLevel, 1, 0.9, positive, window_width - 400, window_height - characterHeight - 100)
    element3.draw()


    let testFloor = new Line(10, window_height - 25, 500, window_height - 25, ctx, thisLevel)
    testFloor.draw()

    let testFloorWithWall = new Line(10, 100, 10, window_height - 25, ctx, thisLevel)
    testFloorWithWall.draw()
}

let testLevel = new Level(1, [window_width/2, window_height - characterHeight], background, "./epic background.jpg", level1Ini)
currentLevel = testLevel

let tick = () => {
    requestAnimationFrame(tick)
    if (currentLevel != undefined) currentLevel.tickLevel()
}

window.addEventListener("keypress", (event) => {
    if (event.code == "KeyF") {
        console.log("debug key")
        console.log(canvas.style.backgroundImage)
    }
})

tick()
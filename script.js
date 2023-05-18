import Line from "./line.js"
import Character from "./character/character.js"
import CharacterController from "./character/characterController.js"
import spriteMap from "./character/spriteMap.js"
import Element from "./element.js"
import Level from "./level.js"
import Photon from "./photon.js"

const electron = new spriteMap("./Sprites/negative.png")
const positive = new spriteMap("./Sprites/positive.png")
const photonSprite = new spriteMap("./Sprites/photonLeft.png", "./Sprites/photonLeft.png", "./Sprites/photonRight.png")
const characterHeight = 50
const background = document.getElementById("backgroundImage")

const backgroundImages = ["Chemistry room.jpg", "kitchen.jpg", "watchroom.jpg", "workstation.jpg"]
let currImg = 0

export let window_height = window.innerHeight
export let window_width = window.innerWidth
let currentLevel = undefined

let level1Ini = function(thisLevel) {
    console.log("begin level")

    let photon = new Photon(thisLevel, photonSprite, 100, 100, "photon")

    let character = new Character(thisLevel, electron, 1000, 100, "elemAndElectron", 0.01)
    character.draw()

    let characterController = new CharacterController(character, 1.2, 300, 4)
    characterController.startControllerInput("Space", "KeyA", "KeyD", "ShiftLeft")

    let element = new Element(thisLevel, -6, 0.9, electron, window_width - 400, window_height - 1000, "elemAndElectron")
    element.draw()

    let element2 = new Element(thisLevel, 9, 1.5, positive, 20, window_height - characterHeight - 1000, "elemAndElectron")
    element2.draw()

    let element3 = new Element(thisLevel, 7, 0.4, positive, window_width - 100, window_height - characterHeight - 1000, "elemAndElectron")
    element3.draw()

    let testFloor = new Line(10, window_height - 25, 500, window_height - 25, thisLevel)

    let testFloorWithWall = new Line(10, 100, 10, window_height - 25, thisLevel)
}

let testLevel = new Level(1, [window_width/2, window_height - characterHeight], background, "./Level Backgrounds/watchroom.jpg", level1Ini)
currentLevel = testLevel

let tick = () => {
    requestAnimationFrame(tick)
    if (currentLevel != undefined) currentLevel.tickLevel()
}

window.addEventListener("keypress", (event) => {
    if (event.code == "KeyF") {
        console.log("debug key")
        if (currImg == backgroundImages.length - 1) {
            currImg = 0
        }
        else {
            currImg++
        }
        background.setAttribute("src", "./Level Backgrounds/" + backgroundImages[currImg])
    }
})

window.addEventListener("resize", (event) => {
    window_width = window.innerWidth
    window_height = window.innerHeight
})

tick()
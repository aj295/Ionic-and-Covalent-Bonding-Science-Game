import Line from "./line.js"
import Character from "./character/character.js"
import CharacterController from "./character/characterController.js"
import spriteMap from "./character/spriteMap.js"
import Element from "./element.js"
import Level from "./level.js"
import Photon from "./photon.js"
import { createCollisionBox, getCoordsOnClick } from "./placement tool.js"

const electron = new spriteMap("./Sprites/negative.png")
const positive = new spriteMap("./Sprites/positive.png")
const photonSprite = new spriteMap("./Sprites/photonLeft.png", "./Sprites/photonLeft.png", "./Sprites/photonRight.png")
const characterHeight = 50
const background = document.getElementById("backgroundImage")
export const sounds = [new Audio("./audio/sounds/make compound.wav"), new Audio("./audio/sounds/hitwall.wav"), new Audio("./audio/sounds/hit ground.wav"), new Audio("./audio/sounds/jump.wav")]

const backgroundImages = ["Chemistry room.jpg", "kitchen.jpg", "watchroom.jpg", "workstation.jpg"]
let currImg = 0

export let window_height = window.innerHeight
export let window_width = window.innerWidth
let currentLevel = undefined
let currLevelNum = 0

let character = undefined
let characterController = undefined
let photon = undefined

let testLevelIni = function(thisLevel) {
    let element = new Element(thisLevel, -6, 0.9, electron, window_width - 400, window_height - 1000, "element")
    element.draw()
    
    let element2 = new Element(thisLevel, 9, 1.5, positive, 20, window_height - characterHeight - 1000, "element")
    element2.draw()
    
    let element3 = new Element(thisLevel, 7, 0.4, positive, window_width - 100, window_height - characterHeight - 1000, "element")
    element3.draw()
    
    let testFloor = new Line(10, window_height - 25, 500, window_height - 25, thisLevel)
    
    let testFloorWithWall = new Line(10, 100, 10, window_height - 25, thisLevel)
}

let level1Init = function(thisLevel) {
    let element = new Element(thisLevel, -6, 0.9, electron, window_width - 400, window_height - 1000, "element")
    element.draw()
}

let switchLevels = (levelNum) => {
    let levelNotFound = false
    if (currentLevel != undefined) currentLevel.clearLevel()
    
    switch (levelNum) {
        case 0: 
            let testLevel = new Level(1, [window_width/2, window_height - characterHeight], background, "./Level Backgrounds/watchroom.jpg", testLevelIni)
            currentLevel = testLevel
            break

        case 1:
            let level1 = new Level(1, [window_width/2, window_height - characterHeight], background, "./Level Backgrounds/watchroom.jpg", level1Init)
            currentLevel = level1
            break

        default:
            levelNotFound = true
            break
    }
        
    if (!levelNotFound) {
        currLevelNum++
        if (character != undefined) {
            character.level = currentLevel
            currentLevel.characters.push(character)
        }
        if (photon != undefined) {
            photon.level = currentLevel
            currentLevel.characters.push(photon)
        }
    }
}
    
switchLevels(currLevelNum)

let tick = () => {
    requestAnimationFrame(tick)
    if (currentLevel != undefined) currentLevel.tickLevel()
}
    
window.addEventListener("keypress", (event) => {
    if (event.code == "KeyF") {
        console.log("debug key")
        // if (currImg == backgroundImages.length - 1) {
            //     currImg = 0
            // }
            // else {
            //     currImg++
            // }
            // background.setAttribute("src", "./Level Backgrounds/" + backgroundImages[currImg])
        
        // switchLevels(1)

        // photon.goToCoords(0, 0, 100)
    }

    if (event.code == "KeyC") {
        getCoordsOnClick()
    }

    if (event.code == "KeyB") {
        createCollisionBox()
    }
})

// window.addEventListener("mousemove", (event) => {
    
// })
        
window.addEventListener("resize", (event) => {
    window_width = window.innerWidth
    window_height = window.innerHeight
})
        
character = new Character(currentLevel, electron, 1000, 100, "electron", 0.01)
character.draw()

characterController = new CharacterController(character, 1.2, 300, 4)
characterController.startControllerInput("Space", "KeyA", "KeyD", "ShiftLeft")

photon = new Photon(currentLevel, photonSprite, 100, 100, "photon")


tick()
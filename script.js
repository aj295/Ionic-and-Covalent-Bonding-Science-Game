import Line from "./line.js"
import Character from "./character/character.js"
import CharacterController from "./character/characterController.js"
import spriteMap from "./character/spriteMap.js"
import Element from "./element.js"
import Level from "./level.js"
import Photon from "./photon.js"
import { beginMakingBox, getCoordsOnClick } from "./placement tool.js"
import { kitchenLevel, testLevelIni } from "./level instructions.js"

const electron = new spriteMap("./Sprites/negative.png")
const positive = new spriteMap("./Sprites/positive.png")
const chorineSprite = new spriteMap("./Element Symbols/Chlorine.jpg")
const sodiumSprite = new spriteMap("./Element Symbols/Sodium.jpg")
const photonSprite = new spriteMap("./Sprites/photonLeft.png", "./Sprites/photonLeft.png", "./Sprites/photonRight.png")
const characterHeight = 50
const background = document.getElementById("backgroundImage")
export const sounds = [new Audio("./audio/sounds/make compound.wav"), new Audio("./audio/sounds/hitwall.wav"), new Audio("./audio/sounds/hit ground.wav"), new Audio("./audio/sounds/jump.wav")]

const backgroundImages = ["Chemistry room.jpg", "kitchen.jpg", "watchroom.jpg", "workstation.jpg"]
let currImg = 0

export let window_height = window.innerHeight
export let window_width = window.innerWidth
let currentLevel = undefined
let currLevelNum = 1

let character = undefined
let characterController = undefined
let photon = undefined

export function pxToVh(px) {
    return (px / window_height) * 100
}
export function pxToVw(px) {
    return (px / window_width) * 100
}
export function vhToPx(vh) {
    return (vh / 100) * window_height
}
export function vwToPx(vw) {
    return (vw / 100) * window_width
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
            let level1 = new Level(1, [window_width/2, window_height - characterHeight], background, "./Level Backgrounds/kitchen.jpg", kitchenLevel)
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
        beginMakingBox()
    }
})

// window.addEventListener("mousemove", (event) => {
    
// })
        
window.addEventListener("resize", (event) => {
    window_width = window.innerWidth
    window_height = window.innerHeight
})
        
character = new Character(currentLevel, electron, 1000, 100, "electron", 0.033)
character.draw()

characterController = new CharacterController(character, 1.2, vhToPx(35), 4)
characterController.startControllerInput("Space", "KeyA", "KeyD", "ShiftLeft")

photon = new Photon(currentLevel, photonSprite, 100, 100, "photon")


tick()
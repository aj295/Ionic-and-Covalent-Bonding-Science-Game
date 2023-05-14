import { Compound } from "./element.js"
import Photon from "./photon.js"

export default class Level {
    /**
     * 
     * @param {number} level the number of the current level 
     * @param {number[]} beginningPos the x and y coordinate pair that the character will begin at in the beginning of the level
     * @param {*} canvas the canvas object that the level will be on
     * @param {String} backGroundImage the html element of an image that will appear behind a transparent canvas to create a background image
     * @param {} initializeLevel the function to run whenever beginning this level
     */
    constructor(level, beginningPos, backGroundElement, backGroundImage, initializeLevel) {
        this.level = level
        this.beginningPos = beginningPos
        this.collisionLines = []
        this.characters = []

        backGroundElement.setAttribute("src", backGroundImage)
        initializeLevel(this)
    }

    addCollisionLine(line) {
        this.collisionLines.push(line)
    }

    addCharacter(character) {
        if (!(character instanceof Compound) || !character.init) this.characters.push(character)
    }

    removeCharacter(character) {
        this.characters.splice(this.characters.indexOf(character), 1)
    }

    /**
     * @description returns true if the coordinate pair is overlapping any lines in the level and false otherwise
     * @param {number} x 
     * @param {number} y 
     * @param {number} radius how far away, in pixels, the x and y have to be away from the line to be considered "colliding"
     * @returns returns the line the coordinates are colliding with, undefined if none
     */
    collidingWithLine(x, y, radius = 0) {
        let retValue = undefined
        this.collisionLines.forEach((line) => { //checks if line is horizontal
            if (line.y1 == line.y2) {
                let left
                let right

                if (line.x1 < line.x2) {
                    left = line.x1
                    right = line.x2
                }
                else {
                    left = line.x2
                    right = line.x1
                }

                if ((y >= line.y1 - radius && y <= line.y1 + radius) && (x >= left && x <= right)) {
                    retValue = line
                    // console.log("horizontal")
                }
            } 


            else if (line.x1 == line.x2) { //checks if line is vertical
                let top
                let bottom

                if (line.y1 > line.y2) {
                    top = line.y1
                    bottom = line.y2
                }
                else {
                    top = line.y2
                    bottom = line.y1
                }

                if ((x >= line.x1 - radius && x <= line.x1 + radius) && (y <= top && y >= bottom)) {
                    retValue = line
                    // console.log("vertical")
                }
            } 


            else { //else find slope
                //using y = mx + b
                
            } 
        })
        return retValue
    }

    collidingWithCharacter(character) {
        let colliding = undefined
        this.characters.forEach((char) => {
            if(!(char instanceof Photon) && (character != char && character.isColliding(char))) colliding = char
        })
        //if (character.isPlayer) console.log(colliding)
        return colliding
    }

    tickLevel() {
        this.characters.forEach((character) => {
            character.tickFunctions()
        })
    }
}
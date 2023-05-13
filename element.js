import Character from "./character/character.js"
import Photon from "./photon.js"

import { window_height, window_width } from "../script.js"

/**
     * 
     * @param {*} context context of the canvas
     * @param {number} ionCharge charge of the ion version of that element
     * @param {number} electronegativity of the element
     * @param {spriteMap} spriteMap the spriteMap object that declares the different poses of the character
     * @param {Level} level the current level of the character
     * @param {number} xpos origin x position of the character
     * @param {number} ypos origin y position of the character
     * @param {number} gravity effects how fast or slow the character falls
     */
export default class Element extends Character {
    constructor(level, ionCharge, electronegativity, spriteMap, xpos, ypos, stylesClass, gravity = 0.03) {
        super(level, spriteMap, xpos, ypos, stylesClass, gravity)
        this.ionCharge = ionCharge
        if (ionCharge < 0) {
            this.positive = false
            this.negative = true
        }
        else if (ionCharge > 0) {
            this.positive = true
            this.negative = false
        }
        else {
            this.positive = false
            this.negative = false
        }

        this.electronegativity = electronegativity
    }
    
    elementMovement() {
        this.level.characters.forEach(character => {
            if (character instanceof Photon) return 0
            if (this.isColliding(character)) {
                    return 0
            } // returns 0 if the characters are colliding

            let x1 = this.middlePos.getX
            let y1 = this.middlePos.getY

            let x2 = character.middlePos.getX
            let y2 = character.middlePos.getY

            let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

            let MULTIPLIER = 150
            let k = MULTIPLIER * distance
            let acceleration = k / Math.pow(distance, 2)

            let vx, vy

            if (Math.abs(distance) > character.width) { 
                vx = acceleration * (x2 - x1) / distance
                vy = acceleration * (y2 - y1) / distance
            }
            else {
                vx = 0
                vy = 0
            }
            
            if (!this.moveUp && vy > 0) vy = 0


            let stopDistance = 10
            let xDistance = Math.abs(this.middlePos.getX - character.middlePos.getX)
            let yDistance = Math.abs(this.middlePos.getY - character.middlePos.getY)

            if (yDistance <=5 && xDistance <= character.width + stopDistance && xDistance != 0 && !character.isPlayer) {
                if (this instanceof Element && character instanceof Element) { //two non-player elements colliding physics
                    let newComp = new Compound(this, character)
                    newComp.draw()
                    this.level.addCharacter(newComp)
                }
                else if (this instanceof Compound && character instanceof Element) {
                    this.addElement(character)
                    return 0
                }
            }

            if (xDistance < stopDistance && xDistance != 0 && character.isPlayer && yDistance < stopDistance) {
                //console.log("collided  with player")
                //put end game logic here <--
                character.setPos(character.level.beginningPos[0], character.level.beginningPos[1])
            }

            let range = 600
            const MUTLI_FACTOR = 100 //higher number makes the element move faster in general
            const MOVING_FRAMES = 1 //the amount of animation frames the velocity is applied - more frames = smoother movement for more lag and faster movement

            // console.log(xDistance)
            // console.log(yDistance)
            if ((xDistance <= range && (xDistance > 0 || (this.compound != undefined && character.compound != undefined))) && (yDistance <= range)) { //checks if the electrons are within a certain range of pixels
                let pullTogether = false
                let pushApart = false

                if ((character.isPlayer || character instanceof Element) && this instanceof Element) {
                    let oppositeCharge = (character.isPlayer && this.positive) || character.positive == this.negative
                    pullTogether = oppositeCharge
                    pushApart = !oppositeCharge
                }
                else if (this instanceof Compound && character instanceof Element) {
                    let oppositeCharge = (character.isPlayer && this.getClosestPole(character) == "positive") || character.positive == this.getClosestPole(character) == "negative"
                    pullTogether = oppositeCharge
                    pushApart = !oppositeCharge
                }

                if (pullTogether) {
                    if ((this.middleBottom.getY > window_height - 20 || this.onLineFloor) && vy > 0) vy = 0

                    character.applyVelocity(MOVING_FRAMES, [-vx, -vy / 2])
                    this.applyVelocity(MOVING_FRAMES, [vx * this.electronegativity, -vy * this.electronegativity])
                }
                else if (pushApart) {
                    if ((this.middleBottom.getY > window_height - 20 || this.onLineFloor) && vy < 0) vy = 0

                    character.applyVelocity(MOVING_FRAMES, [vx, vy / 2])

                    if (Math.abs(this.middlePos.getX - character.middlePos.getX) < MULTIPLIER / 2 && (!character.moveLeft || !character.moveRight)) this.applyVelocity(MOVING_FRAMES, [-vx * 10, 0])

                    this.applyVelocity(MOVING_FRAMES, [-vx, vy])
                }
            }
        });
        
    }

    /**
     * @description method to be ran every frame
     */
    tickFunctions() {
        if (this.init) {
            this.draw()
            this.init = false
        }

        this.onGround = this.isGrounded()
        this.applyGravity()
        this.collisionPhysics()
        this.elementMovement()
    }
}

export class Compound extends Element {
    /**
     * 
     * @param {Element} element1
     * @param {Element} element2 
     */
    constructor(element1, element2) {
        super(element1.level, element1.ionCharge + element2.ionCharge, Math.abs(element1.electronegativity - element2.electronegativity), undefined, 0, 0, undefined)
        if (element1.xpos < element2.xpos) {
            this.leftElem = element1
            this.rightElem = element2
        }
        else {
            this.leftElem = element2
            this.rightElem = element1
        }

        this.xpos = this.leftElem.xpos
        this.ypos = this.leftElem.ypos
        this.divStyle = element1.divStyle
        this.elemWidth = parseInt(this.divStyle.getPropertyValue("width").replace(/[^0-9]/g,""))
        this.elemHeight = parseInt(this.divStyle.getPropertyValue("height").replace(/[^0-9]/g,""))
        this.compWidth = this.elemWidth * 2
        this.elementLayout = [this.leftElem, this.rightElem]
    }

    draw() {
        let element1 = this.elementLayout[0]
        let element2 = this.elementLayout[1]
        
        
        // this.imageElement.src = this.sprite
        // this.imageElement.id = this.id
        // document.body.appendChild(this.divElem)
        // this.divElem.appendChild(this.imageElement)
        
        // this.divElem.classList.add(this.stylesClass)
        // this.divElem.style.left = this.xpos + "px"
        // this.divElem.style.top = this.ypos + "px"
        
        // this.imageElement.style.width = "inherit"
        // this.imageElement.style.height = "inherit"
        // this.imageElement.style.left = "inherit"
        // this.imageElement.style.top = "inherit"
        
        // this.divStyle = window.getComputedStyle(this.divElem)
        // this.imageStyle = window.getComputedStyle(this.imageElement)
        
        this.divElem.appendChild(element1.divElem)
        this.divElem.appendChild(element2.divElem)
        this.divElem.style.position = "absolute"
        element1.divElem.style.position = "relative"
        element2.divElem.style.position = "relative"
        
        this.divElem.style.left = this.xpos + "px"
        this.divElem.style.top = this.ypos + "px"
        this.divElem.style.width = (this.elemWidth * 2) + "px"
        this.divElem.style.height = this.elemHeight + "px"

        this.divElem.style.border = "3px solid red"
        
        element1.divElem.style.left = 0 + "px"
        element1.divElem.style.top = 0 + "px"
        element2.divElem.style.left = this.width + "px"
        element2.divElem.style.top = 0 + "px"
        this.declareCorners(this.compWidth, this.elemHeight)
        element1.level.removeCharacter(element1)
        element2.level.removeCharacter(element2)
        this.init = false
    }

    setPos(x, y) {
        this.xpos = x
        this.ypos = y
        this.divElem.style.left = x + "px"
        this.divElem.style.top = y + "px"
        this.declareCorners(this.compWidth, this.elemHeight)

        for (let i = 0; i < this.elementLayout.length; i++) {
            this.elementLayout[i].divElem.style.left = i * this.elemWidth
            this.elementLayout[i].divElem.style.top = 0
        }
    }
    
    /**
     * @description adds an element to this compund object
     * @param {Element} element
    */
   addElement(element) {
       element.compound = this
       this.elementList.push(element)
       this.updateCharge(element)
    }
    
    /**
     * @description returns the element that the closest to the given character
     * @param {Character} character
    */
   getClosestPole(character) {
       let x = character.middlePos.getX
       let y = character.middlePos.getY
       
       let low = undefined
       let returnVal = undefined;
        this.elementList.forEach((element) => {
            let totalDistance = Math.abs(element.middlePos.getX - x) + Math.abs(element.middlePos.getY - y)
            if (returnVal == undefined || totalDistance < low) {
                low = totalDistance
                returnVal = element
            }
        })
        
        return returnVal
    }
    
    containsElement(element) {
        return this.elementList.includes(element)
    }
    
    updateCharge(element) {
        let additionalCharge = element.ionCharge
        this.compoundCharge += additionalCharge
        
        if (this.compoundCharge < 0) {
            this.positive = false
            this.negative = true
        }
        else if (this.compoundCharge > 0) {
            this.positive = true
            this.negative = false
        }
        else {
            this.positive = false
            this.negative = false
        }
        
        this.compoundEN = Math.abs(this.compoundEN - element.electronegativity)
    }
    
    tickFunctions() {
        if (this.init) {
            this.draw()
            this.init = false
        }
        
        this.onGround = this.isGrounded()
        this.applyGravity()
        this.collisionPhysics()
        this.elementMovement()
    }
}
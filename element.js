import Character from "./character/character.js"
import Compound from "./compound.js"
import Photon from "./photon.js"

let window_height = window.screen.height
let window_width = window.screen.width

/**
     * 
     * @param {*} context context of the canvas
     * @param {number} ionCharge charge of the ion version of that element
     * @param {number} electronegativity of the element
     * @param {spriteMap} spriteMap the spriteMap object that declares the different poses of the character
     * @param {Level} level the current level of the character
     * @param {number} xpos origin x position of the character
     * @param {number} ypos origin y position of the character
     * @param {number} width width of character, if not specified automatic width is used
     * @param {number} height height of character, if not specified automatic height is used
     * @param {number} gravity effects how fast or slow the character falls
     */
export default class Element extends Character {
    constructor(context, level, ionCharge, electronegativity, spriteMap, xpos, ypos, gravity = 0.03, width = -1, height = -1) {
        super(context, level, spriteMap, xpos, ypos, gravity, width, height)
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

        this.compound = undefined //points to the compound this element is a part of, undefined if it is not part of a compound
    }
    
    elementMovement() {
        this.level.characters.forEach(character => {
            if (character instanceof Photon) return 0
            if (this.upperRight.getX >= character.xpos &&
                this.xpos <= character.upperRight.getX &&
                this.ypos < character.bottomLeft.getY &&
                this.bottomLeft.getY > character.ypos) return 0 // returns 0 if the characters are colliding
            if (character.compound != undefined && character.compound.containsElement(this)) return 0

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

            if (xDistance <= character.width && xDistance != 0 && !character.isPlayer) {
                if (this.compound == undefined) { //two non-player elements colliding physics
                    let newCompund = new Compound(this, character)
                    this.compound = newCompund
                    character.compound = newCompund
                    return 0
                }
                else if (this.compound != undefined && character.compound == undefined) {
                    this.compound.addElement(character)
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

                if ((character.isPlayer || character instanceof Element) && this.compound == undefined) {
                    let oppositeCharge = (character.isPlayer && this.positive) || character.positive == this.negative
                    pullTogether = oppositeCharge
                    pushApart = !oppositeCharge
                }
                else if (!this.compound.containsElement(character)) {
                    let oppositeCharge = (character.isPlayer && this.compound.getClosestElement(character).positive) || character.positive == this.compound.getClosestElement(character).negative
                    pullTogether = oppositeCharge
                    pushApart = !oppositeCharge
                }

                if (pullTogether) {
                    if ((this.middleBottom.getY > window_height - 20 || this.onLineFloor) && vy > 0) vy = 0

                    if (character.compound == undefined) character.applyVelocity(MOVING_FRAMES, [-vx, -vy / 2])
                    else {
                        character.compound.applyLinkedVelocity(MOVING_FRAMES, [-vx, -vy / 2])
                    }

                    if ((character.compound == undefined && this.compound == undefined)) this.applyVelocity(MOVING_FRAMES, [vx * this.electronegativity, -vy * this.electronegativity])
                    else if (this.compound != undefined) {
                        if (!this.compound.canMoveLeft() && vx < 0) vx = 0
                        if (!this.compound.canMoveRight() && vx > 0) vx = 0
                        this.compound.applyLinkedVelocity(MOVING_FRAMES, [vx * this.compound.compoundEN, -vy * this.compound.compoundEN])
                    }
                }
                else if (pushApart) {
                    if ((this.middleBottom.getY > window_height - 20 || this.onLineFloor) && vy < 0) vy = 0

                    if (character.compound == undefined) character.applyVelocity(MOVING_FRAMES, [vx, vy / 2])
                    else {
                        character.compound.applyLinkedVelocity(MOVING_FRAMES, [vx, vy / 2])
                    }

                    if (Math.abs(this.middlePos.getX - character.middlePos.getX) < MULTIPLIER / 2 && (!character.moveLeft || !character.moveRight)) this.applyVelocity(MOVING_FRAMES, [-vx * 10, 0])

                    if ((character.compound == undefined && this.compound == undefined)) this.applyVelocity(MOVING_FRAMES, [-vx, vy])
                    else if (this.compound != undefined) {
                        if (Math.abs(this.compound.getClosestElement(character).middlePos.getX - this.middlePos.getX) < MULTIPLIER / 2 && (!this.compound.canMoveLeft() || !this.compound.canMoveRight())) {vx = 0; vy = 0}
                        if (!this.compound.canMoveLeft() && vx > 0) vx = 0
                        if (!this.compound.canMoveRight() && vx < 0) vx = 0
                        this.compound.applyLinkedVelocity(MOVING_FRAMES, [-vx, vy])
                    }
                }
            }
        });
        
    }

    /**
     * @description method to be ran every frame
     */
    tickFunctions() {
        this.onGround = this.isGrounded()
        this.draw()
        this.applyGravity()
        this.collisionPhysics()
        this.elementMovement()
    }
}
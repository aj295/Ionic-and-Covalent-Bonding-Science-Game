import Character from "./character/character.js"
import Compound from "./compound.js"
import { fps } from "./script.js"

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
    
    aroundElectron() {
        this.level.characters.forEach(character => {
            // console.log(this.middlePos.getX - character.middlePos.getX)
            // console.log(this.middlePos.getY - character.middlePos.getY)
            let xDistance = Math.abs(this.middlePos.getX - character.middlePos.getX)
            let yDistance = Math.abs(this.middlePos.getY - character.middlePos.getY)

            if (xDistance <= character.width && xDistance != 0 && !character.isPlayer) {
                //console.log(this instanceof Element)
                // let newCompund = new Compound(this, character)
                // this.compound = newCompund
                // character.compound = newCompund
                return 0
            }
            else if (xDistance < 10 && xDistance != 0 && character.isPlayer) {
                //console.log("collided  with player")
                //put end game logic here <--
            }

            let range = 400
            const MUTLI_FACTOR = 30 //higher number makes the element move faster in general
            const EXPONENTIAL_FACTOR = 0.25 //lower number makes elements speed up as they get closer together
            const MOVING_FRAMES = 1 //the amount of animation frames the velocity is applied - more frames = smoother movement for more lag and faster movement

            // console.log(xDistance)
            // console.log(yDistance)
            if ((xDistance <= range && xDistance > 0) && (yDistance <= range)) { //checks if the electrons are within a certain range of pixels
                let pullTogether = false
                let pushApart = false
                if (character.isPlayer || character instanceof Element) {
                    if (this.electronegativity < 1 || character.electronegativity < 1) return 0
                    pullTogether = (character.isPlayer && this.positive) || ((character.negative && this.positive) || (character.positive && this.negative))
                    pushApart = (character.isPlayer && this.negative) || ((character.positive && this.positive) || (character.negative && this.negative))
                }
                if (pullTogether) {                                                                                                                                                      //expression is used to make the element move slower if it is further away in terms of y distance
                    let positiveXVel = (xDistance > 10) ? (-(1 / ((this.middlePos.getX - character.middlePos.getX) * (EXPONENTIAL_FACTOR))) * (MUTLI_FACTOR * this.electronegativity)) / (((yDistance * (0.000999 * MUTLI_FACTOR * this.electronegativity)) + 1) / 1.2): 0
                    let positiveYVel = (this.middlePos.getY - character.middlePos.getY) * 0.01 //velocities applied if the element is positive
                    if ((this.middleBottom.getY > window_height - 20 || this.onLineFloor) && positiveYVel < 0) positiveYVel = 0 //stops it from going through floor
                    //if (!this.moveLeft && positiveXVel < 0) positiveXVel = -positiveXVel * 10
                    //if (!this.moveRight && positiveXVel > 0) positiveXVel = -positiveXVel * 10
                    if (!this.moveUp && positiveYVel > 0) positiveYVel = 0
                    
                    if (character.compound == undefined) this.applyVelocity(MOVING_FRAMES, [positiveXVel, positiveYVel])
                    else character.compound.applyVelocity(MOVING_FRAMES, [positiveXVel, positiveYVel])
                }
                else if (pushApart) {
                    let negativeXVel = (xDistance > 10) ? ((1 / ((this.middlePos.getX - character.middlePos.getX) * (EXPONENTIAL_FACTOR))) * (MUTLI_FACTOR * this.electronegativity)) / (((yDistance * (0.000999 * MUTLI_FACTOR * this.electronegativity)) + 1) / 2.2): 0
                    let negativeYVel = -(this.middlePos.getY - character.middlePos.getY) * 0.01 * this.electronegativity  //velocities applied if the element is positive
                    if ((this.middleBottom.getY > window_height - 20 || this.onLineFloor) && negativeYVel < 0) negativeYVel = 0 //stops it from going through floor
                    if (!this.moveLeft && negativeXVel < 0) negativeXVel = -negativeXVel * 10
                    if (!this.moveRight && negativeXVel > 0) negativeXVel = -negativeXVel * 10
                    if (!this.moveUp && negativeYVel > 0) negativeYVel = 0
                    if (character.compound == undefined) this.applyVelocity(MOVING_FRAMES, [negativeXVel, negativeYVel])
                    else character.compound.applyVelocity(MOVING_FRAMES, [negativeXVel, negativeYVel])
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
        this.aroundElectron()
    }
}
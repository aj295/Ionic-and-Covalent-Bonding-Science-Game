import Character from "./character/character.js"

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
    }
    
    aroundElectron() {
        this.level.characters.forEach(character => {
            // console.log(this.middlePos.getX - character.middlePos.getX)
            // console.log(this.middlePos.getY - character.middlePos.getY)
            let xDistance = Math.abs(this.middlePos.getX - character.middlePos.getX)
            let yDistance = Math.abs(this.middlePos.getY - character.middlePos.getY)
            let range = 500
            // console.log(xDistance)
            // console.log(yDistance)
            if ((xDistance <= range && xDistance > 0) && (yDistance <= range)) { //checks if the electrons are within a certain range of pixels
                if (this.positive) {
                    //var B = (A ==="red") ? "hot":"cool";
                    let positiveXVel = (xDistance > 10) ? -(1 / (this.middlePos.getX - character.middlePos.getX)) * (100 * this.electronegativity) : 0
                    let positiveYVel = (this.middlePos.getY - character.middlePos.getY) * 0.01 //velocities applied if the element is positive
                    if ((this.middleBottom.getY > window_height - 20 || this.onLineFloor) && positiveYVel < 0) positiveYVel = 0 //stops it from going through floor
                    if (!this.moveLeft && positiveXVel < 0) positiveXVel = 0 //stops it from going through walls (doesn't really work if it goes too fast)
                    if (!this.moveRight && positiveXVel > 0) positiveXVel = 0
                    if (!this.moveUp && positiveYVel > 0) positiveYVel = 0
                    this.applyVelocity(60, [positiveXVel, positiveYVel])
                }
                else if (this.negative) {
                    let negativeXVel = (xDistance > 10) ? (1 / (this.middlePos.getX - character.middlePos.getX)) * (100 * this.electronegativity) : 0
                    let negativeYVel = -(this.middlePos.getY - character.middlePos.getY) * 0.01 //velocities applied if the element is positive
                    if ((this.middleBottom.getY > window_height - 5 || this.onLineFloor) && negativeYVel < 0) negativeYVel = 0 //stops it from going through floor
                    if ((!this.moveLeft) && negativeXVel < 0) negativeXVel = 0 //stops it from going through walls (doesn't really work if it goes too fast)
                    if ((!this.moveRight) && negativeXVel > 0) negativeXVel = 0
                    if ((!this.moveUp) && negativeYVel > 0) negativeYVel = 0
                    this.applyVelocity(60, [negativeXVel, negativeYVel])
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
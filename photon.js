import Character from "./character/character.js";

let window_height = window.screen.height
let window_width = window.screen.width

const RANDOM_MULTIPLIER = 0.5
const RANDOM_ADDITIONAL = 0.2

export default class Photon extends Character {
    constructor(context, level, spriteMap, xpos, ypos, stylesClass, gravity = 0.03) {
        super(context, level, spriteMap, xpos, ypos, stylesClass, gravity)
        this.directionX = Math.ceil((Math.random() * 2) - 1) //calculates a random number of 0 or 1
        this.directionY = Math.ceil((Math.random() * 2) - 1) //0 is for a negative direction, 1 is for a positive direction
        this.velX = (this.directionX == 0) ? -((Math.random() * RANDOM_MULTIPLIER) + RANDOM_ADDITIONAL) : (Math.random() * RANDOM_MULTIPLIER) + RANDOM_ADDITIONAL
        this.velY = (this.directionY == 0) ? -((Math.random() * RANDOM_MULTIPLIER) + RANDOM_ADDITIONAL) : (Math.random() * RANDOM_MULTIPLIER) + RANDOM_ADDITIONAL
    }

    #calcRandDirection() {
        this.directionX = Math.ceil((Math.random() * 2) - 1) //calculates a random number of 0 or 1
        this.directionY = Math.ceil((Math.random() * 2) - 1) //0 is for a negative direction, 1 is for a positive direction
        this.velX = (this.directionX == 0) ? -((Math.random() * RANDOM_MULTIPLIER) + RANDOM_ADDITIONAL) : (Math.random() * RANDOM_MULTIPLIER) + RANDOM_ADDITIONAL
        this.velY = (this.directionY == 0) ? -((Math.random() * RANDOM_MULTIPLIER) + RANDOM_ADDITIONAL) : (Math.random() * RANDOM_MULTIPLIER) + RANDOM_ADDITIONAL
        //console.log(this.velX)
    }

    idleMoving() {
        let xMultiplier = 1
        let yMultiplier = 1
        if (this.upperLeft.getX < 0 || this.upperRight.getX > window_width) this.velX = -this.velX
        if (this.upperLeft.getY < 0 || this.bottomLeft.getY > window_height) this.velY = -this.velY
        switch(Math.floor((Math.random() * 350) + 1)) {
            case 1:
                this.#calcRandDirection()
                this.applyVelocity(1, [this.velX * xMultiplier, this.velY * yMultiplier])
                //console.log(this.velX)
                break
            default:
                this.applyVelocity(1, [this.velX * xMultiplier, this.velY * yMultiplier])
                //console.log(this.velX)
                break
        }
    }

    tickFunctions() {
        if (this.init) {
            this.draw()
            this.init = false
        }
        this.updateDivPos()
        this.idleMoving()
    }
}
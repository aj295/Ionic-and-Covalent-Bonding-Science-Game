import Character from "./character/character";

export default class Photon extends Character {
    constructor(context, level, spriteMap, xpos, ypos, gravity = 0.03, width = -1, height = -1) {
        super(context, level, spriteMap, xpos, ypos, gravity, width, height)
    }

    calcRandDirection() {
        this.directionX = Math.ceil((Math.random() * 2) - 1) //calculates a random number of 0 or 1
        this.directionY = Math.ceil((Math.random() * 2) - 1) //0 is for a negative direction, 1 is for a positive direction
        this.velX = (this.directionX == 0) ? -((Math.random * 10) + 1) : (Math.random * 10) + 1
        this.velY = (this.directionY == 0) ? -((Math.random * 10) + 1) : (Math.random * 10) + 1
    }

    idleMoving() {
        switch((Math.random() * 5) + 1) {
            case 1: 
                this.calcRandDirection()
                this.applyVelocity(1, [this.velX, this.velY])
                break
            default:
                break
        }
    }

    tickFunctions() {
        this.onGround = this.isGrounded()
        this.draw()
        this.idleMoving()
        this.collisionPhysics()
    }
}
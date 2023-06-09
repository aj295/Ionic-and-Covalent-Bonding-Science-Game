import { window_height, window_width, sounds} from "../script.js"

let availableId = 1

export default class Character {
    /**
     * 
     * @param {spriteMap} spriteMap the spriteMap object that declares the different poses of the character
     * @param {Level} level the current level of the character
     * @param {number} xpos origin x position of the character
     * @param {number} ypos origin y position of the character
     * @param {String} stylesClass name of the css styles class that goes with this character
     * @param {number} gravity effects how fast or slow the character falls
     */
    constructor(level, spriteMap, xpos, ypos, stylesClass, gravity = 0.03) {
        this.xpos = xpos
        this.ypos = ypos
        this.spriteMap = spriteMap
        this.stylesClass = stylesClass
        this.level = level
        if (this.spriteMap != undefined) this.sprite = spriteMap.idle

        this.gravity = gravity
        this.airTime = 0
        this.fallingVelocity = -(gravity) //-(gravity * mass)

        this.disableInput = false

        this.id = "characterImg " + availableId
        availableId++

        this.moveLeft = true
        this.moveRight = true
        this.moveUp = true
        this.moveDown = true

        this.onLineFloor = false //is true if the current floor that the character is on is a line
        this.overthrowIsGrounded = false

        this.beginningXPos = xpos
        this.beginningYPos = ypos

        this.isPlayer = false
        this.characterController = undefined

        level.addCharacter(this)

        this.divElem = document.createElement("div")
        this.imageElement = document.createElement("img")

        this.init = true

        this.width = 0
        this.height = 0

        this.playAudio = true
        this.hitGroundAudio = sounds[1]
    }

    /**
     * @description declares the positions for the corner of the character's bounding box, not to be manually implemented
     * @param {number} width width of the character 
     * @param {number} height height of the character
     */
    declareCorners(width, height) {
        this.upperLeft = {
            getX: this.xpos,
            getY: this.ypos,
            coordinateList: [this.xpos, this.ypos]
        }

        this.upperRight = {
            getX: this.xpos + width,
            getY: this.ypos,
            coordinateList: [this.xpos + width, this.ypos]
        }

        this.bottomLeft = {
            getX: this.xpos,
            getY: this.ypos + height,
            coordinateList: [this.xpos, this.ypos + height]
        }

        this.bottomRight = {
            getX: this.xpos + width,
            getY: this.ypos + height,
            coordinateList: [this.xpos + width, this.ypos + height]
        }

        this.middleBottom = {
            getX: this.xpos + (width / 2),
            getY: this.ypos + height,
            coordinateList: [this.xpos + (width / 2)]
        }

        this.middlePos = {
            getX: this.xpos + (this.width / 2),
            getY: this.ypos - (this.height / 2),
            coordinateList: [this.xpos + (this.width / 2), this.ypos - (this.height / 2)]
        }

        this.width = width
        this.height = height
    }

    /**
     * @description draws character onto screen
     */
    draw() {
        this.imageElement.src = this.sprite
        this.imageElement.id = this.id
        document.body.appendChild(this.divElem)
        this.divElem.appendChild(this.imageElement)

        this.divElem.classList.add(this.stylesClass)
        this.divElem.style.left = this.xpos + "px"
        this.divElem.style.top = this.ypos + "px"

        this.divElem.style.position = "absolute"
        this.imageElement.style.position = "relative"
        this.imageElement.style.left = 0
        this.imageElement.style.top = 0

        // this.divElem.style.border = "3px solid red"

        this.divStyle = window.getComputedStyle(this.divElem)
        this.imageStyle = window.getComputedStyle(this.imageElement)
        this.declareCorners(parseInt(this.divStyle.getPropertyValue("width").replace(/[^0-9]/g,"")), parseInt(this.divStyle.getPropertyValue("height").replace(/[^0-9]/g,"")))
    }

    /**
     * @description clears the character and draws it onto a new location
     * @param {number} x new x coordinate
     * @param {number} y new y coordinate
     */
    setPos(x, y) {
        this.xpos = x
        this.ypos = y
        this.divElem.style.left = x + "px"
        this.divElem.style.top = y + "px"
        this.declareCorners(parseInt(this.divStyle.getPropertyValue("width").replace(/[^0-9]/g,"")), parseInt(this.divStyle.getPropertyValue("height").replace(/[^0-9]/g,"")))
    }

    /**
     * @description sets the character to an offset of x and y
     * @param {number} offSetX 
     * @param {number} offSetY 
     */
    update(offSetX, offSetY) {

        if ((!this.moveLeft || this.xpos <= 0) && offSetX < 0) offSetX = 0 
        if ((!this.moveRight || this.upperRight.getX >= window_width) && offSetX > 0) offSetX = 0
        if (!this.moveUp && offSetY > 0) {
            offSetY = 0
            console.log("hi")
        }
        
        this.setPos(this.xpos + offSetX, this.ypos - offSetY)
    }

    /**
     * @description gets whether or not the character is within 5 pixels of a floor object and snaps the character to the floor object
     * @returns if the character is touching a floor object
     */
    isGrounded() {
        for (let i = this.bottomLeft.getX; i <= this.bottomRight.getX; i++) {
            let distanceToFloor = Math.abs(this.middleBottom.getY - window_height)
            //console.log(distanceToFloor)
            let collidedWithLine = this.level.collidingWithLine(i, this.bottomLeft.getY, 3) != undefined
            var distanceToLine = -1 //distance to line object acting as floor -1 if not found

            for (let j = this.middleBottom.getY + 1; j <= window_height; j++) {
                if (this.level.collidingWithLine(i, j, 1) != undefined) {
                    distanceToLine = j - this.bottomLeft.getY
                }
            }
            
            if (distanceToLine < 10 && distanceToLine >= 0) {
                this.onLineFloor = true
                return true
            }

            else if (distanceToFloor <= 5) { //increase range of how far the character has to be to a floor for it to be snapped to that floor (5 seems to be the least buggy value)
                if (this.airTime > 0) {
                    this.setPos(this.xpos, window_height - this.height)
                    this.onLineFloor = false
                }

                return true
            }
            
            this.onLineFloor = false
            return false
        }
    }
    
    collisionPhysics() { //im tellin u right now, dont try diagonal lines, they will not work, yet...
        let range = 5
        let offsetY = 0

        for (let i = this.upperLeft.getX; i <= this.upperRight.getX; i++) {
            //console.log(this.level.collidingWithLine(i, this.upperLeft.getY, 2))
            let line = this.level.collidingWithLine(i, this.bottomLeft.getY, range)
            if (line != undefined && line.horizontal) {
                this.overthrowIsGrounded = true
                this.onGround = true
                this.onLineFloor = true
                break
            }
            else {
                this.overthrowIsGrounded = false
                this.onLineFloor = false
                this.onGround = false
            }
        }

        for (let i = this.bottomLeft.getY - offsetY; i >= this.upperLeft.getY; i--) {
            if (this.level.collidingWithLine(this.bottomLeft.getX, i, range) != undefined) {
                if (this.onLineFloor && this.level.collidingWithLine(this.bottomLeft.getX, i, range).horizontal) {
                    this.moveLeft = true
                    break
                }
                this.moveLeft = false
                break
            }
            else this.moveLeft = true
        }
        for (let i = this.bottomRight.getY - offsetY; i >= this.upperRight.getY; i--) {
            if (this.level.collidingWithLine(this.bottomRight.getX, i, range) != undefined) {
                if (this.onLineFloor && this.level.collidingWithLine(this.bottomRight.getX, i, range).horizontal) {
                    this.moveRight = true
                    break
                }
                this.moveRight = false
                break
            }
            else this.moveRight = true
        }
        for (let i = this.upperLeft.getX; i <= this.upperRight.getX; i++) {
            for (let j = 0; j <= 4; j++) {
                if (this.level.collidingWithLine(i, this.upperLeft.getY - j, 1) != undefined) {
                    this.moveUp = false
                    return
                }
            }
            //console.log(this.level.collidingWithLine(i, this.upperLeft.getY, 2))
            // if (this.level.collidingWithLine(i, this.upperLeft.getY + 1, range) != undefined) {
            //     this.moveUp = false
            //     break
            // }
            // else this.moveUp = true
        }
        this.moveUp = true
    }

    /**
     * @description offsets the characters y position downwards if the method .isGrounded() returns false
     */
    applyGravity() {
        if (!this.onGround) {
            this.applyVelocity(1, [0, this.fallingVelocity * this.airTime])
            this.airTime++
        }
        else {
            if (this.airTime > 300) this.hitGroundAudio.play()
            this.airTime = 0
        }
    }

    /**
     * @description offset the character's x and y values with the distance parameter over a certain amount of time
     * @param {number} time 
     * @param {number[]} distance an array with the x and y velocity values 
     */
    applyVelocity(time, distance) {
        let applyVel = true
        let isColliding = this.level.collidingWithCharacter(this) != undefined
        if (isColliding) {
            let collidingWith = this.level.collidingWithCharacter(this)
            let toLeft = collidingWith.middlePos.getX < this.middlePos.getX
            let toRight = !toLeft
            // let above = collidingWith.middlePos.getY > this.middlePos.getY
            // let below = !above

            if ((toLeft && distance[0] < 0) || (toRight && distance[0] > 0)/* || (above && distance[1] < 0) || (below && distance[1] > 0)*/) applyVel = false
        }
        if (applyVel) {
            if (distance[0] != undefined && distance[1] != undefined) {
                let XVelocity = distance[0] / time
                let YVelocity = distance[1] / time

                if (this.spriteMap != undefined) {
                    if (YVelocity > 0) {
                        if (XVelocity > 0) {
                            this.imageElement.src = this.spriteMap.upRightFacing
                        }
                        else if (XVelocity < 0) {
                            this.imageElement.src = this.spriteMap.upLeftFacing
                        }
                        else {
                            this.imageElement.src = this.spriteMap.upFacing
                        }
                    }

                    if (XVelocity > 0) {
                        this.imageElement.src = this.spriteMap.rightFacing
                    }
                    else if (XVelocity < 0) {
                        this.imageElement.src = this.spriteMap.leftFacing
                    }
                }

                if (this.onGround && YVelocity < 0) YVelocity = 0 //prevents going through floor

                //console.log(XVelocity + ", " + YVelocity)
                    let updateThis = () => {
                    this.update(XVelocity, YVelocity)
                    time--
                    if (time > 0) requestAnimationFrame(updateThis)
                    }
                updateThis()
            }
            else {
                return -1
            }
        }
    }

    /**
     * @param {String} pathToImage path to new sprite image
     */
    setSprite(pathToImage) {
        this.sprite = pathToImage
        this.draw()
    }

    /**
     * @param {spriteMap} spriteMap new spriteMap
     */
    setSpriteMap(spriteMap) {
        this.spriteMap = spriteMap
        this.sprite = spriteMap.idle
        this.draw()
    }

    isColliding(character) {
        if (
            this.upperRight.getX >= character.xpos &&
            this.xpos <= character.upperRight.getX &&
            this.ypos <= character.bottomLeft.getY &&
            this.bottomLeft.getY >= character.ypos
        ) return true
        else return false
    }

    // soundManager() {
    //     if ((!this.moveLeft || !this.moveRight) && this.playAudio) {
    //         this.hitWallSound.play()
    //         this.playAudio = false
    //     }
    //     else if (this.moveLeft && this.moveRight) this.playAudio = true
    // }

    clearCharacter() {
        this.level.characters.splice(this.level.characters.indexOf(this), 1)
        this.divElem.remove()
    }

    /**
     * @description method to be ran every frame
     */
    tickFunctions() {
        if (this.init) {
            this.draw()
            this.init = false
        }

        if (!this.overthrowIsGrounded) this.onGround = this.isGrounded()

        this.applyGravity()
        this.collisionPhysics()
    }
}
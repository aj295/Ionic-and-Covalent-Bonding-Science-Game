export default class Level {
    /**
     * 
     * @param {number} level the number of the current level 
     */
    constructor(level) {
        this.level = level
        this.collisionLines = []
        this.levelFinished = false
        this.characters = []
    }

    addCollisionLine(line) {
        this.collisionLines.push(line)
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
}
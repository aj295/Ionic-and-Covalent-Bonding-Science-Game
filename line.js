import { window_height } from "../script.js"
import { window_width } from "../script.js"

export default class Line {
    /**
     * 
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {*} context context of the canvas
     * @param {Level} level the level the line is contained in, leave undifined if not part of level
     */
    constructor(x1, y1, x2, y2, level = undefined) { //coordinate pairs are an array of two numbers [x, y]
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.thickness = 5
        this.vertical = x1 == x2
        this.horizontal = y1 == y2
        this.diagonal = !this.vertical && !this.horizontal
        if (level != undefined) {
            level.addCollisionLine(this)
        }
    }

    update(x1, y1, x2, y2) {

        this.x1 += x1
        this.y1 += y1
        this.x2 += x2
        this.y2 += y2
        
        this.draw()
    }
}
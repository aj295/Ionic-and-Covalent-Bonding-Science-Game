//import { window_height, window_width } from "../script.js"

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
        // this.divElem = document.createElement("div")
        // this.divElem.style.width = Math.abs(x1 - x2) + "px"
        // this.divElem.style.height = Math.abs(y1 - y2) + "px"
        // this.divElem.style.border = this.thickness + "px solid red"
        // this.divElem.style.top = y1
        // this.divElem.style.left = x1
    }

    update(x1, y1, x2, y2) {

        this.x1 += x1
        this.y1 += y1
        this.x2 += x2
        this.y2 += y2
        
        this.draw()
    }
}
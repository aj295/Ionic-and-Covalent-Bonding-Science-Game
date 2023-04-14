import Character from "./character/character.js"
import Element from "./element.js"

export default class Compound {
    /**
     * 
     * @param {Element} element1
     * @param {Element} element2 
     */
    constructor(element1, element2) {
        element1.compound = this
        element2.compound = this
        this.elementList = [element1, element2]
    }

    applyLinkedVelocity(time, distance) {
        this.elementList.forEach((element) => {
            element.applyVelocity(time, distance)
        })
    }

    /**
     * @description adds an element to this compund object
     * @param {Element} element
     */
    addElement(element) {
        element.compound = this
        this.elementList.push(element)
    }

    /**
     * @description returns the element that the closest to the given character
     * @param {Character} character
     */
    getClosestElement(character) {
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

    canMoveLeft() {
        let retVal = true
        this.elementList.forEach((element) => {
            //console.log(element.moveLeft)
            if (!element.moveLeft) retVal = false
        })
        return retVal
    }

    canMoveRight() {
        let retVal = true
        this.elementList.forEach((element) => {
            //console.log(element.moveLeft)
            if (!element.moveRight) retVal = false
        })
        return retVal
    }
}
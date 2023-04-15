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

        /**
         * compound electonegativity
         */
        this.compoundEN = Math.abs(element1.electronegativity - element2.electronegativity) 

        this.elementList = [element1, element2]

        this.compoundCharge = element1.ionCharge + element2.ionCharge

        if (this.compoundCharge < 0) {
            this.positive = false
            this.negative = true
        }
        else if (this.compoundCharge > 0) {
            this.positive = true
            this.negative = false
        }
        else {
            this.positive = false
            this.negative = false
        }
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
        this.updateCharge(element)
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

    updateCharge(element) {
        let additionalCharge = element.ionCharge
        this.compoundCharge += additionalCharge

        if (this.compoundCharge < 0) {
            this.positive = false
            this.negative = true
        }
        else if (this.compoundCharge > 0) {
            this.positive = true
            this.negative = false
        }
        else {
            this.positive = false
            this.negative = false
        }

        this.compoundEN = Math.abs(this.compoundEN - element.electronegativity)
    }
}
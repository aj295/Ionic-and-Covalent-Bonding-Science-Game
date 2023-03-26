import Element from "./element.js";

export default class Compound {
    /**
     * 
     * @param {Element} element1
     * @param {Element} element2 
     */
    constructor(element1, element2) {
        this.elementList = [element1, element2]
        element1.compound = this
        element2.compound = this
    }

    applyVelocity(time, distance) {
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
}
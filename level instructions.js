import Line from "./line.js"
import Element from "./element.js"
import spriteMap from "./character/spriteMap.js"
import { vhToPx, pxToVh, vwToPx, pxToVw } from "./script.js"

const chlorineSprite = new spriteMap("./Element Symbols/Chlorine.jpg")
const sodiumSprite = new spriteMap("./Element Symbols/Sodium.jpg")

export let testLevelIni = function(thisLevel) {
    // let element = new Element(thisLevel, -6, 0.9, electron, window_width - 400, window_height - 1000, "element")
    // element.draw()
    
    // let element2 = new Element(thisLevel, 9, 1.5, positive, 20, window_height - characterHeight - 1000, "element")
    // element2.draw()
    
    // let element3 = new Element(thisLevel, 7, 0.4, positive, window_width - 100, window_height - characterHeight - 1000, "element")
    // element3.draw()
    
    // let testFloor = new Line(10, window_height - 25, 500, window_height - 25, thisLevel)
    
    // let testFloorWithWall = new Line(10, 100, 10, window_height - 25, thisLevel)

    let redBookline1 = new Line(vwToPx(29.83), vhToPx(85.86), vwToPx(32.44), vhToPx(85.86), thisLevel)
    let redBookline2 = new Line(vwToPx(29.83), vhToPx(99.43), vwToPx(32.44), vhToPx(99.43), thisLevel)
    let redBookline3 = new Line(vwToPx(29.83), vhToPx(85.86), vwToPx(29.83), vhToPx(99.43), thisLevel)
    let redBookline4 = new Line(vwToPx(32.44), vhToPx(85.86), vwToPx(32.44), vhToPx(99.43), thisLevel)

    let chairline1 = new Line(vwToPx(79.38060309698452), vhToPx(87.115165336374), vwToPx(86.96006519967399), vhToPx(87.115165336374), thisLevel)
    let chairline2 = new Line(vwToPx(79.38060309698452), vhToPx(99.54389965792474), vwToPx(86.96006519967399), vhToPx(99.54389965792474), thisLevel)
    let chairline3 = new Line(vwToPx(79.38060309698452), vhToPx(87.115165336374), vwToPx(79.38060309698452), vhToPx(99.54389965792474), thisLevel)
    let chairline4 = new Line(vwToPx(86.96006519967399), vhToPx(87.115165336374), vwToPx(86.96006519967399), vhToPx(99.54389965792474), thisLevel)

    let blueBookline2 = new Line(vwToPx(27.87286063569682), vhToPx(99.77194982896236), vwToPx(29.991850040749796), vhToPx(99.77194982896236), thisLevel)
    let blueBookline1 = new Line(vwToPx(27.87286063569682), vhToPx(89.85176738882555), vwToPx(29.991850040749796), vhToPx(89.85176738882555), thisLevel)
    let blueBookline3 = new Line(vwToPx(27.87286063569682), vhToPx(89.85176738882555), vwToPx(27.87286063569682), vhToPx(99.77194982896236), thisLevel)
    let blueBookline4 = new Line(vwToPx(29.991850040749796), vhToPx(89.85176738882555), vwToPx(29.991850040749796), vhToPx(99.77194982896236), thisLevel)
}

export let kitchenLevel = function(thisLevel) {
    // let Sodium = new Element(thisLevel, 1, 0.93, sodiumSprite, )
    


    let Sodium = new Element(thisLevel, 1, 0.93, sodiumSprite, vwToPx(21.434392828035858), vhToPx(1.0262257696693273), "element")
    Sodium.draw()
    let Chlorine = new Element(thisLevel, -1, 3.16, chlorineSprite, vwToPx(96.65851670741647), vhToPx(41.163055872291906), "element")
    Chlorine.draw()
}
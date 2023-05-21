import Line from "./line.js"
import Element from "./element.js"
import { vhToPx, pxToVh, vwToPx, pxToVw } from "./script.js"

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
    let chair1Part1line1 = new Line(vwToPx(23.879380603096983), vhToPx(67.38882554161916), vwToPx(26.32436837815811), vhToPx(67.38882554161916), thisLevel)
    let chair1Part1line2 = new Line(vwToPx(23.879380603096983), vhToPx(99.54389965792474), vwToPx(26.32436837815811), vhToPx(99.54389965792474), thisLevel)
    let chair1Part1line3 = new Line(vwToPx(23.879380603096983), vhToPx(67.38882554161916), vwToPx(23.879380603096983), vhToPx(99.54389965792474), thisLevel)
    let chair1Part1line4 = new Line(vwToPx(26.32436837815811), vhToPx(67.38882554161916), vwToPx(26.32436837815811), vhToPx(99.54389965792474), thisLevel)

    let chair1Part2line1 = new Line(vwToPx(27.302363488182557), vhToPx(83.92246294184721), vwToPx(34.800325998370006), vhToPx(83.92246294184721), thisLevel)
    let chair1Part2line2 = new Line(vwToPx(27.302363488182557), vhToPx(99.54389965792474), vwToPx(34.800325998370006), vhToPx(99.54389965792474), thisLevel)
    let chair1Part2line3 = new Line(vwToPx(27.302363488182557), vhToPx(83.92246294184721), vwToPx(27.302363488182557), vhToPx(99.54389965792474), thisLevel)
    let chair1Part2line4 = new Line(vwToPx(34.800325998370006), vhToPx(83.92246294184721), vwToPx(34.800325998370006), vhToPx(99.54389965792474), thisLevel)

    let chair2Part1line1 = new Line(vwToPx(75.63162184189079), vhToPx(68.18700114025086), vwToPx(72.94213528932355), vhToPx(68.18700114025086), thisLevel)
    let chair2Part1line2 = new Line(vwToPx(75.63162184189079), vhToPx(99.65792474344356), vwToPx(72.94213528932355), vhToPx(99.65792474344356), thisLevel)
    let chair2Part1line3 = new Line(vwToPx(75.63162184189079), vhToPx(68.18700114025086), vwToPx(75.63162184189079), vhToPx(99.65792474344356), thisLevel)
    let chair2Part1line4 = new Line(vwToPx(72.94213528932355), vhToPx(68.18700114025086), vwToPx(72.94213528932355), vhToPx(99.65792474344356), thisLevel)

    let chair2Part2line1 = new Line(vwToPx(65.60717196414018), vhToPx(85.74686431014823), vwToPx(72.29013854930724), vhToPx(85.74686431014823), thisLevel)
    let chair2Part2line2 = new Line(vwToPx(65.60717196414018), vhToPx(99.42987457240594), vwToPx(72.29013854930724), vhToPx(99.42987457240594), thisLevel)
    let chair2Part2line3 = new Line(vwToPx(65.60717196414018), vhToPx(85.74686431014823), vwToPx(65.60717196414018), vhToPx(99.42987457240594), thisLevel)
    let chair2Part2line4 = new Line(vwToPx(72.29013854930724), vhToPx(85.74686431014823), vwToPx(72.29013854930724), vhToPx(99.42987457240594), thisLevel)

    let tableline1 = new Line(vwToPx(37.815810920945395), vhToPx(74.9144811858609), vwToPx(61.93969030154849), vhToPx(74.9144811858609), thisLevel)
    let tableline2 = new Line(vwToPx(37.815810920945395), vhToPx(99.31584948688712), vwToPx(61.93969030154849), vhToPx(99.31584948688712), thisLevel)
    let tableline3 = new Line(vwToPx(37.815810920945395), vhToPx(74.9144811858609), vwToPx(37.815810920945395), vhToPx(99.31584948688712), thisLevel)
    let tableline4 = new Line(vwToPx(61.93969030154849), vhToPx(74.9144811858609), vwToPx(61.93969030154849), vhToPx(99.31584948688712), thisLevel)

    let drawer1line1 = new Line(vwToPx(9.372453137734311), vhToPx(81.87001140250855), vwToPx(21.352893235533823), vhToPx(81.87001140250855), thisLevel)
    let drawer1line2 = new Line(vwToPx(9.372453137734311), vhToPx(99.54389965792474), vwToPx(21.352893235533823), vhToPx(99.54389965792474), thisLevel)
    let drawer1line3 = new Line(vwToPx(9.372453137734311), vhToPx(81.87001140250855), vwToPx(9.372453137734311), vhToPx(99.54389965792474), thisLevel)
    let drawer1line4 = new Line(vwToPx(21.352893235533823), vhToPx(81.87001140250855), vwToPx(21.352893235533823), vhToPx(99.54389965792474), thisLevel)

    let drawer2line1 = new Line(vwToPx(82.07008964955175), vhToPx(82.32611174458381), vwToPx(93.96903015484924), vhToPx(82.32611174458381), thisLevel)
    let drawer2line2 = new Line(vwToPx(82.07008964955175), vhToPx(99.65792474344356), vwToPx(93.96903015484924), vhToPx(99.65792474344356), thisLevel)
    let drawer2line3 = new Line(vwToPx(82.07008964955175), vhToPx(82.32611174458381), vwToPx(82.07008964955175), vhToPx(99.65792474344356), thisLevel)
    let drawer2line4 = new Line(vwToPx(93.96903015484924), vhToPx(82.32611174458381), vwToPx(93.96903015484924), vhToPx(99.65792474344356), thisLevel)

    let cabinetline1 = new Line(vwToPx(31.458842705786473), vhToPx(46.18015963511973), vwToPx(46.291768541157296), vhToPx(46.18015963511973), thisLevel)
    let cabinetline2 = new Line(vwToPx(31.458842705786473), vhToPx(62.59977194982896), vwToPx(46.291768541157296), vhToPx(62.59977194982896), thisLevel)
    let cabinetline3 = new Line(vwToPx(31.458842705786473), vhToPx(46.18015963511973), vwToPx(31.458842705786473), vhToPx(62.59977194982896), thisLevel)
    let cabinetline4 = new Line(vwToPx(46.291768541157296), vhToPx(46.18015963511973), vwToPx(46.291768541157296), vhToPx(62.59977194982896), thisLevel)

    let windowline1 = new Line(vwToPx(27.87286063569682), vhToPx(44.58380843785633), vwToPx(2.037489812550937), vhToPx(44.58380843785633), thisLevel)
    let windowline2 = new Line(vwToPx(27.87286063569682), vhToPx(8.779931584948688), vwToPx(2.037489812550937), vhToPx(8.779931584948688), thisLevel)
    let windowline3 = new Line(vwToPx(27.87286063569682), vhToPx(44.58380843785633), vwToPx(27.87286063569682), vhToPx(8.779931584948688), thisLevel)
    let windowline4 = new Line(vwToPx(2.037489812550937), vhToPx(44.58380843785633), vwToPx(2.037489812550937), vhToPx(8.779931584948688), thisLevel)

    let shelfline1 = new Line(vwToPx(84.67807660961695), vhToPx(47.32041049030787), vwToPx(99.83700081499592), vhToPx(47.32041049030787), thisLevel)
    let shelfline2 = new Line(vwToPx(84.67807660961695), vhToPx(49.48688711516533), vwToPx(99.83700081499592), vhToPx(49.48688711516533), thisLevel)
    let shelfline3 = new Line(vwToPx(84.67807660961695), vhToPx(47.32041049030787), vwToPx(84.67807660961695), vhToPx(49.48688711516533), thisLevel)
    let shelfline4 = new Line(vwToPx(99.83700081499592), vhToPx(47.32041049030787), vwToPx(99.83700081499592), vhToPx(49.48688711516533), thisLevel)
}
/**
 * @typedef ItemType
 * @type {object}
 * @property {string} letter - Letter name [a-zA-z]
 * @property {number} priority - Letter priority [1-52]
 */

import {split} from '../lib.js'

/**
 * @typedef {('a' | 'b')} CompartmentId
 */

/**
 * @type {ItemType[]}
 */
export const itemTypes = [...new Array(52)]
    .map((_, i) => {
        if (i >= 26) return String.fromCharCode(i + 39)
        return String.fromCharCode(i + 97)
    })
    .map((letter, i) => {
        return {letter, priority: i + 1}
    })

export const itemFromLetter = (letter) =>
    itemTypes.find((i) => i.letter === letter)

class Compartment {
    /**
     * @type {ItemType[]}
     */
    items = []

    /**
     * Add item to compartmet
     * @param {ItemType} item - Item to add
     */
    addItem(item) {
        this.items.push(item)
    }

    static fromString(stringValue) {
        const compartment = new Compartment()
        const letters = stringValue.split('')
        letters.map((letter) => compartment.addItem(itemFromLetter(letter)))
        return compartment
    }
}

export class Rucksack {
    compartments = [new Compartment(), new Compartment()]

    findSharedItem() {
        for (const item of this.compartments[0].items) {
            for (const itemB of this.compartments[1].items) {
                if (item.letter === itemB.letter) return item
            }
        }
    }

    static fromString(stringValue) {
        const rucksack = new Rucksack()
        const [a, b] = split(stringValue)
        rucksack.compartments[0] = Compartment.fromString(a)
        rucksack.compartments[1] = Compartment.fromString(b)
        return rucksack
    }
}

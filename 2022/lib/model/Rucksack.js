import {split} from '../lib.js'

export class Item {
    letter = '_'
    priority = 0

    /**
     * @param {string} letter
     * @param {number} priority
     */
    constructor(letter, priority) {
        Object.assign(this, {letter, priority})
    }

    static types = [...new Array(52)]
        .map((_, i) => {
            if (i >= 26) return String.fromCharCode(i + 39)
            return String.fromCharCode(i + 97)
        })
        .map((letter, i) => {
            return new Item(letter, i + 1)
        })

    static fromLetter(letter) {
        return Item.types.find((i) => i.letter === letter)
    }
}

class Compartment {
    /**
     * @type {Item[]}
     */
    items = []

    /**
     * Add item to compartmet
     * @param {Item} item - Item to add
     */
    addItem(item) {
        this.items.push(item)
    }

    static fromString(stringValue) {
        const compartment = new Compartment()
        const letters = stringValue.split('')
        letters.map((letter) => compartment.addItem(Item.fromLetter(letter)))
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

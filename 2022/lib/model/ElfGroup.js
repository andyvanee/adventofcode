import {Model} from '../lib.js'
import {Elf} from './Elf.js'

export class ElfGroup extends Model {
    /**
     * @type Elf[]
     */
    #elves = []

    /**
     * @type Array<Elf>
     */
    get elves() {
        return this.#elves
    }

    /**
     * @param {Elf[]} elves array of elves
     */
    set elves(elves) {
        this.#elves = elves
    }

    /**
     * @param {Elf} elf The elf to add to the group
     */
    add(elf) {
        this.#elves.push(elf)
    }

    /**
     * Find an elf by ID
     * @param {Number} id The id of the elf to find
     * @returns {Elf | undefined}
     */
    find(id) {
        return this.#elves.find((elf) => elf.id === id)
    }

    sortByCalories() {
        return this.#elves
            .slice(0)
            .sort((a, b) => (a.totalCalories > b.totalCalories ? -1 : 1))
    }
}

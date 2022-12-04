export class Section {
    min = 0
    max = 0
    constructor(min, max) {
        Object.assign(this, {min, max})
    }

    get ID() {
        return `${this.min}-${this.max}`
    }

    /**
     * Determine whether this section includes another
     * @param {Section} other section to compare against
     * @returns {boolean}
     */
    includes(other) {
        return this.min <= other.min && this.max >= other.max
    }

    static fromString(rangeString) {
        const [min, max] = rangeString.split('-')
        return new Section(parseInt(min, 10), parseInt(max, 10))
    }
}

export class Camp {
    /** @type {Section[]} */
    sections = []
}

import {sum} from '../../lib.js'

export class Location {
    start = false
    end = false
    height = -1
    x = 0
    y = 0

    /** @type {Location[][] | null} */
    pathsTo = []

    /** @type {Location[]} */
    #neighbours = []

    cost = Infinity

    /**
     * @type {Location[]}
     */
    get neighbours() {
        return this.#neighbours
    }

    /**
     * @param locations {Location[]}
     */
    set neighbours(locations) {
        this.#neighbours = locations
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} height
     * @param {boolean} start
     * @param {boolean} end
     */
    constructor(x, y, height, start, end) {
        Object.assign(this, {x, y, height, start, end})
    }

    get ID() {
        return `${this.x}-${this.y}`
    }
    static fromString(x, y, char) {
        if (char == 'S') {
            return new Location(x, y, 1, true, false)
        }
        if (char == 'E') {
            return new Location(x, y, 26, false, true)
        }
        const height = char.charCodeAt() - 96
        return new Location(x, y, height, false, false)
    }
}

export class HeightMap {
    /** @type {Location[][]} */
    rows = []

    /**
     * @param {Location[][]} rows
     */
    constructor(rows) {
        Object.assign(this, {rows})
    }

    /** @type {Location[]} */
    get locations() {
        return this.rows.flat()
    }

    get shortestPath() {
        const start = this.locations.find(l => l.start)
        const end = this.locations.find(l => l.end)
        this.locations.map(l => (l.neighbours = this.neighbours(l)))
        end.cost = 0

        while (true) {
            let exhausted = true
            for (const location of this.locations) {
                for (const neighbour of location.neighbours) {
                    if (neighbour.cost > location.cost + 1) {
                        neighbour.cost = location.cost + 1
                        exhausted = false
                    }
                }
            }
            if (exhausted) break
        }
        return start.cost
    }

    get shortestToA() {
        let length = this.shortestPath
        for (const location of this.locations) {
            if (location.height == 1 && location.cost < length) {
                length = location.cost
            }
        }
        return length
    }

    /**
     * @param {Location} location
     * @returns {Location[]}
     */
    neighbours(location) {
        return this.locations.filter(l => {
            const diff = l.height - location.height
            if (diff < -1) return false
            const xd = Math.abs(location.x - l.x)
            const yd = Math.abs(location.y - l.y)
            return (xd == 0 && yd == 1) || (xd == 1 && yd == 0)
        })
    }

    static fromString(str) {
        const rows = str.split('\n').map((row, y) => {
            return row.split('').map((loc, x) => Location.fromString(x, y, loc))
        })
        return new HeightMap(rows)
    }
}

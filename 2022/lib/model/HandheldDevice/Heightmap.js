export class Location {
    static START = 1
    static END = 28
    height = -1
    x = 0
    y = 0

    /** @type {Location[] | null} */
    shortestPath = null

    /** @type {Location[]} */
    #neighbours = []

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
     */
    constructor(x, y, height) {
        Object.assign(this, {x, y, height})
        if (this.height == Location.START) this.cost = 0
    }

    get ID() {
        return `${this.x}-${this.y}`
    }
    static fromString(x, y, char) {
        const height = {S: Location.START, E: Location.END}[char] || char.charCodeAt() - 95
        return new Location(x, y, height)
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
        // maxLength will visit every node
        const maxLength = this.locations.length
        const start = this.locations.find(l => l.height === Location.START)
        const end = this.locations.find(l => l.height === Location.END)
        start.shortestPath = [start]
        this.locations.map(l => (l.neighbours = this.neighbours(l)))

        for (let len = 0; len < maxLength; len++) {
            const prev = this.locations.filter(l => l.shortestPath && l.shortestPath.length == len)

            for (const loc of prev) {
                const path = loc.shortestPath.slice(0)
                const tail = path.pop()
                for (const neigbour of tail.neighbours) {
                    if (!(path.includes(neigbour) || neigbour.shortestPath)) {
                        neigbour.shortestPath = [...path, tail, neigbour]
                        if (neigbour === end) return neigbour.shortestPath
                    }
                }
            }
        }
    }

    /**
     * @param {Location} location
     * @returns {Location[]}
     */
    neighbours(location) {
        return this.locations.filter(l => {
            const diff = l.height - location.height
            if (diff > 1) return false
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

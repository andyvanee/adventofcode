const id = (x, y) => (x + 1) * (y + 2)
export class Location {
    static START = 1
    static END = 28
    height = -1
    x = 0
    y = 0

    /** @type {{[key:string]: Location[] | null}} */
    shortestPath = {
        [id(0, 1)]: null,
        [id(0, -1)]: null,
        [id(1, 0)]: null,
        [id(-1, 0)]: null,
    }

    get paths() {
        return [this.shortestPath[0], this.shortestPath[1], this.shortestPath[3], this.shortestPath[4]].filter(x => x)
    }

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

        // Set neighbours
        this.locations.map(l => (l.neighbours = this.neighbours(l)))

        start.shortestPath = {
            0: [start],
            1: [start],
            3: [start],
            4: [start],
        }

        for (let len = 0; len < maxLength; len++) {
            const prev = this.locations
                .map(l => l.paths)
                .flat()
                .filter(path => path.length === len)

            for (const path of prev) {
                const tail = path.slice(0).pop()
                for (const neighbour of tail.neighbours) {
                    const pathId = id(tail.x - neighbour.x, tail.y - neighbour.y)
                    if (!(path.includes(neighbour) || neighbour.shortestPath[pathId])) {
                        neighbour.shortestPath[pathId] = [...path, neighbour]
                        if (neighbour === end) return neighbour.shortestPath[pathId]
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

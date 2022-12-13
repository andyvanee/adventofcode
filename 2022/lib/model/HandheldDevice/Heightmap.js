export class Location {
    static START = 1
    static END = 27
    height = -1
    x = 0
    y = 0

    constructor(x, y, height) {
        Object.assign(this, {x, y, height})
    }

    get ID() {
        return `${this.x}-${this.y}`
    }
    static fromString(x, y, char) {
        const height = {S: 1, E: 27}[char] || char.charCodeAt() - 96
        return new Location(x, y, height)
    }
}

export class Fragment {
    /** Location[] */
    chain = []
    stepped = false
    toString() {
        return this.chain.map(loc => loc.ID).join(':')
    }
    get ID() {
        return this.tail.ID
    }
    get complete() {
        return this.tail.height == Location.END
    }
    constructor(chain) {
        Object.assign(this, {chain: [...chain]})
    }
    get tail() {
        return this.chain[this.chain.length - 1]
    }
    get visited() {
        return new Set(this.chain.map(loc => loc.ID))
    }
    get length() {
        return this.chain.length
    }

    step(map) {
        if (this.stepped) return []
        this.stepped = true
        const {tail, visited} = this
        const neighbours = map.neighbours(tail).filter(loc => !visited.has(loc.ID))

        return neighbours.map(n => new Fragment([...this.chain, n]))
    }
}

/**
 * Prune only the shortest paths ending at a location
 * @param {Fragment[]} fragments
 */
const onlyShortest = (fragments = []) => {
    const ends = {}
    for (const fragment of fragments) {
        const {ID} = fragment.tail
        if (!ends[ID]) {
            ends[ID] = fragment
        } else {
            ends[ID] = fragment.length < ends[ID].length ? fragment : ends[ID]
        }
    }
    return Object.values(ends)
}

export class HeightMap {
    rows = []
    constructor(rows) {
        Object.assign(this, {rows})
    }

    get locations() {
        return this.rows.flat()
    }

    get shortestFragment() {
        // maximum path length visits every node
        const maxLength = this.locations.length
        const target = this.locations.find(l => l.height == Location.END)
        if (!target) throw `target not found`
        const start = new Fragment([this.locations.find(l => l.height === Location.START)])
        const pathsTo = {[start.ID]: start}
        for (let len = 0; len < maxLength; len++) {
            for (const fragment of Object.values(pathsTo)) {
                for (const next of fragment.step(this)) {
                    const {ID} = next
                    if (!pathsTo[ID]) pathsTo[ID] = next
                }
            }
            if (pathsTo[target.ID]) return pathsTo[target.ID]
        }
        const highestShortest = Object.values(pathsTo)
            .sort((a, b) => {
                if (a.tail.height == b.tail.height) return a.length < b.length ? -1 : 1
                if (a.tail.height > b.tail.height) return -1
                return 1
            })
            .shift()
        return highestShortest
    }

    get shortestPath() {
        return this.shortestFragment.length - 1
    }

    neighbours(location) {
        return this.locations.filter(l => {
            const diff = Math.abs(location.height - l.height)
            if (diff > 1) return false
            const xd = Math.abs(location.x - l.x)
            const yd = Math.abs(location.y - l.y)
            // return (xd == 1 && yd == 1) || (xd == 0 && yd == 1) || (xd == 1 && yd == 0)
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

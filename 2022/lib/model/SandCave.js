import {max} from '../lib.js'

class Coordinate {
    x = 0
    y = 0
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        Object.assign(this, {x, y})
    }
    equals(other) {
        return this.x == other.x && this.y == other.y
    }
    navigateTo(other) {
        if (this.x > other.x) this.x--
        if (this.x < other.x) this.x++
        if (this.y > other.y) this.y--
        if (this.y < other.y) this.y++
    }
}
export class Material {
    solid = false
    coordinates = new Coordinate(0, 0)
    icon = '~'
    falling = false

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        Object.assign(this, {coordinates: new Coordinate(x, y)})
    }
}
export class Air extends Material {
    icon = '.'
    solid = false
}
export class Sand extends Air {
    icon = 'o'
    falling = true
    solid = true
}
export class Rock extends Air {
    icon = '#'
    solid = true
}

export class SandCave {
    /** @type {Material[]} */
    entities = [new Air(0, 0)]

    get width() {
        return max(this.entities.map(e => e.coordinates.x))
    }
    get height() {
        return max(this.entities.map(e => e.coordinates.y))
    }
    /**
     * Add item at location, resizing if necessary
     * @param {Material} item
     */
    add(item) {
        const {width, height} = this
        const maxX = item.coordinates.x + 1
        const maxY = item.coordinates.y + 1
        if (maxX > width || maxY > height) {
            const xTo = maxX > width ? maxX : width
            const yTo = maxY > height ? maxY : height
            for (let y = 0; y <= yTo; y++) {
                for (let x = 0; x <= xTo; x++) {
                    this.place(new Air(x, y), false)
                }
            }
        }
        this.place(item)
    }

    /**
     * Add item at location, replacing any material in that location
     * @param {Material} item
     */
    place(item, replace = true) {
        const {x, y} = item.coordinates
        if (!replace && this.at(x, y)) return
        const newEntities = this.entities.filter(i => !i.coordinates.equals({x, y}))
        this.entities = [...newEntities, item]
    }

    at(x, y) {
        return this.entities.find(e => e.coordinates.equals({x, y}))
    }

    static fromString(str) {
        const lines = str.split('\n')
        const cave = new SandCave()
        for (const line of lines) {
            /** @type {Coordinate[]} */
            const instructions = line
                .split(' -> ')
                .filter(x => x)
                .map(pair => {
                    const [x, y] = pair.split(',')
                    return new Coordinate(parseInt(x), parseInt(y))
                })
                .reverse()
            let from = instructions.pop()
            let to = instructions.pop()
            while (to) {
                cave.add(new Rock(from.x, from.y))
                while (!from.equals(to)) {
                    from.navigateTo(to)
                    cave.add(new Rock(from.x, from.y))
                }
                to = instructions.pop()
            }
        }
        return cave
    }

    toString() {
        const {width, height} = this
        let str = ''
        for (let y = 0; y < height; y++) {
            let line = ''
            for (let x = 0; x < width; x++) {
                line += this.at(x, y).icon
            }
            str += `${line.split('').slice(490).join('')}\n`
        }
        return str.trim()
    }

    run() {
        let count = 0
        while (true) {
            this.place(new Sand(500, 0))
            let sand = this.entities.find(e => e.falling)
            while (sand) {
                const {x, y} = sand.coordinates
                if (y + 1 > this.height) return count
                const targets = [this.at(x, y + 1), this.at(x - 1, y + 1), this.at(x + 1, y + 1)]
                const next = targets.find(t => t.solid == false)
                if (next) {
                    sand.coordinates.x = next.coordinates.x
                    sand.coordinates.y = next.coordinates.y
                    next.coordinates.x = x
                    next.coordinates.y = y
                } else {
                    sand.falling = false
                }
                sand = this.entities.find(e => e.falling)
            }
            count++
        }
    }
}

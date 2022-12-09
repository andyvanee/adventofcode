class Vector {
    x = 0
    y = 0
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        Object.assign(this, {x, y})
    }

    /**
     * @param {Vector} other
     * @returns {boolean}
     */
    adjacentTo(other) {
        return Math.abs(other.x - this.x) <= 1 && Math.abs(other.y - this.y) <= 1
    }

    clamp() {
        // I'm sure there's a better formula for this!
        if (this.x > 1) this.x = 1
        if (this.x < -1) this.x = -1
        if (this.y > 1) this.y = 1
        if (this.y < -1) this.y = -1
    }

    /**
     * @param {Vector} other
     */
    follow(other) {
        const diff = new Vector(other.x - this.x, other.y - this.y)
        diff.clamp()
        if (this.adjacentTo(other)) return
        return this.move(diff.x, diff.y)
    }

    move(x, y) {
        this.x += x
        this.y += y
    }

    toString() {
        return `${this.x}:${this.y}`
    }
}

class Instruction {
    static DIRECTIONS = {
        R: new Vector(1, 0),
        L: new Vector(-1, 0),
        U: new Vector(0, -1),
        D: new Vector(0, 1),
    }
    direction = new Vector(0, 0)
    steps = 0

    constructor(direction, steps) {
        Object.assign(this, {direction, steps})
    }

    static fromString(str) {
        const [_, dir, steps] = /(\w)\s+(\d+)/.exec(str)
        return new Instruction(Instruction.DIRECTIONS[dir], parseInt(steps))
    }
}
export class Rope {
    head = new Vector(0, 0)
    tail = new Vector(0, 0)

    /** @type {Instruction[]} */
    instructions = []

    /** @type {Set<string>} */
    #tailVisited = new Set()

    get tailVisited() {
        return Array.from(this.#tailVisited).length
    }

    readInstructions(str) {
        this.instructions = str.split('\n').map(i => Instruction.fromString(i))
    }

    exec() {
        this.instructions.map(instruction => {
            for (let i = 0; i < instruction.steps; i++) {
                this.go(instruction.direction.x, instruction.direction.y)
            }
        })
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    go(x, y) {
        this.head.move(x, y)
        this.tail.follow(this.head)
        this.#tailVisited.add(this.tail.toString())
    }
}

class Vector {
    x = 0
    y = 0
    constructor(x, y) {
        this.init = {x, y}
        this.x = x
        this.y = y
        this.increment()
    }
    increment() {
        this.x++
        if (this.x >= this.init.x) {
            this.x = 0
            this.y++
        }
        if (this.y >= this.init.y) {
            this.y = 0
        }
    }
}

export class Screen {
    static WIDTH = 40
    static HEIGHT = 6
    currentPosition = new Vector(40, 6)
    output = []

    constructor() {
        this.output = [...new Array(Screen.HEIGHT)].map(_ => [...new Array(Screen.WIDTH)].map(_ => '.'))
    }

    draw(char) {
        const pos = this.currentPosition
        this.output[pos.y][pos.x] = char
    }
    tick() {
        this.currentPosition.increment()
    }

    toString() {
        return this.output.map(row => row.join('')).join('\n')
    }
}

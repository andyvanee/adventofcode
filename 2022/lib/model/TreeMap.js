class TreeLocation {
    x = 0
    y = 0
    height = 0
    belongsTo = new TreeMap([[]])
    /**
     *
     * @param {*} param0
     */
    constructor({x, y, height, belongsTo}) {
        Object.assign(this, {x, y, height, belongsTo})
    }

    /**
     * @param {TreeLocation} other
     * @returns {boolean}
     */
    tallAs(other) {
        return this.height >= other.height
    }

    set map(map) {
        this.belongsTo = map
    }
    get map() {
        return this.belongsTo
    }

    /** @type {boolean} */
    get isVisible() {
        const visible = {
            left: true,
            right: true,
            top: true,
            bottom: true,
        }
        const row = this.map.getRow(this.y)
        const col = this.map.getColumn(this.x)
        for (const other of row) {
            if (other.x == this.x) continue
            if (other.x < this.x && other.tallAs(this)) {
                visible.left = false
            }
            if (other.x > this.x && other.tallAs(this)) {
                visible.right = false
            }
        }
        for (const other of col) {
            if (other.y == this.y) continue
            if (other.y < this.y && other.tallAs(this)) {
                visible.top = false
            }
            if (other.y > this.y && other.tallAs(this)) {
                visible.bottom = false
            }
        }
        return visible.left || visible.right || visible.top || visible.bottom
    }
}

/**
 * A map of trees
 */
export class TreeMap {
    /** @type {TreeLocation[][]} */
    #map = [[]]

    /**
     * Construct a treeMap from a string
     * @param {string} str puzzle input
     * @returns {TreeMap}
     */
    static fromString(str) {
        const trees = str.split('\n').map((row, y) => {
            return row.split('').map((height, x) => {
                return new TreeLocation({
                    x,
                    y,
                    height: parseInt(height, 10),
                })
            })
        })
        const map = new TreeMap(trees)
        for (const tree of map) tree.map = map
        return map
    }

    /**
     * @param {number[][]} map
     */
    constructor(map) {
        this.#map = map
    }

    /**
     * iterate through the map yielding TreeLocation for each tree
     */
    *[Symbol.iterator]() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                yield this.treeLocation(x, y)
            }
        }
    }

    get width() {
        return this.#map[0].length
    }

    get height() {
        return this.#map.length
    }

    get visibleTrees() {
        const output = []
        for (const tree of this) {
            if (tree.isVisible) {
                output.push(tree)
            }
        }
        return output
    }

    /**
     * @param {number} y
     * @returns {TreeLocation[]}
     */
    getRow(y) {
        const output = []
        for (const tree of this) if (tree.y == y) output.push(tree)
        return output
    }
    /**
     * @param {number} x
     * @returns {TreeLocation[]}
     */
    getColumn(x) {
        const output = []
        for (const tree of this) if (tree.x == x) output.push(tree)
        return output
    }

    treeLocation(x, y) {
        return this.#map[y][x]
    }
}

export const scenicScore = (tree, map) => {}

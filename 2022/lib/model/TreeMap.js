class TreeLocation {
    x = 0
    y = 0
    height = 0
    /**
     *
     * @param {*} param0
     */
    constructor({x, y, height}) {
        Object.assign(this, {x, y, height})
    }

    /**
     * @param {TreeLocation} other
     * @returns {boolean}
     */
    tallAs(other) {
        return this.height >= other.height
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
        const map = str.split('\n').map((row, y) => {
            return row.split('').map((height, x) => {
                return new TreeLocation({
                    x,
                    y,
                    height: parseInt(height, 10),
                })
            })
        })
        return new TreeMap(map)
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
            if (isVisible(tree, this)) {
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

/**
 * Determine whether the tree is visible in the given map
 * @param {TreeLocation} tree
 * @param {TreeMap} map
 * @returns
 */
export const isVisible = (tree, map) => {
    const visible = {
        left: true,
        right: true,
        top: true,
        bottom: true,
    }
    const row = map.getRow(tree.y)
    const col = map.getColumn(tree.x)
    for (const other of row) {
        if (other.x == tree.x) continue
        if (other.x < tree.x && other.tallAs(tree)) {
            visible.left = false
        }
        if (other.x > tree.x && other.tallAs(tree)) {
            visible.right = false
        }
    }
    for (const other of col) {
        if (other.y == tree.y) continue
        if (other.y < tree.y && other.tallAs(tree)) {
            visible.top = false
        }
        if (other.y > tree.y && other.tallAs(tree)) {
            visible.bottom = false
        }
    }
    return visible.left || visible.right || visible.top || visible.bottom
}

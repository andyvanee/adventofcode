import {sum} from '../../lib.js'

const isInt = val => typeof val == 'number'
const isPacket = p => p instanceof Packet

export class Packet {
    #values = []

    constructor(values) {
        this.#values = values
    }
    get values() {
        return this.#values
    }

    /**
     * @param {Packet} other packet to compare against
     * @returns {Boolean}
     */
    compare(other) {
        for (const [i, value] of this.values.entries()) {
            // If the right list runs out of items first, the inputs are not in the right order
            if (!(other.values.length > i)) return false
            const compareOther = other.values[i]

            if (isInt(value)) {
                if (isInt(compareOther)) {
                    if (value == compareOther) continue
                    return value < compareOther
                }
                if (isPacket(compareOther)) {
                    if (!new Packet([value]).compare(compareOther)) return false
                    continue
                }
            } else if (isPacket(value)) {
                if (isInt(compareOther)) {
                    if (!value.compare(new Packet([compareOther]))) return false
                    continue
                }
                if (isPacket(compareOther)) {
                    if (!value.compare(compareOther)) return false
                    continue
                }
            } else {
                console.error({value})
                throw new Error('unhandled type')
            }
        }
        // left list ran out of items before determination was made
        return true
    }

    toObj() {
        return this.values.map(v => (v instanceof Packet ? {P: v.toObj()} : v))
    }
    toString() {
        return JSON.stringify(this.toObj())
    }

    static fromString(str) {
        const values = JSON.parse(str).map(v => {
            if (typeof v == 'number') return v
            if (v instanceof Array) return Packet.fromString(JSON.stringify(v))
            throw new Error('unknown type', v)
        })
        return new Packet(values)
    }
}

export class PacketPair {
    index = 0
    left = new Packet([])
    right = new Packet([])

    constructor(left, right, index) {
        Object.assign(this, {left, right, index})
    }

    /** @type {Boolean} */
    get ordered() {
        return this.left.compare(this.right)
    }

    static fromString(str, index) {
        const [left, right] = str.split('\n')
        return new PacketPair(Packet.fromString(left), Packet.fromString(right), index)
    }
}

export class DistressSignal {
    /** @type {PacketPair[]} */
    pairs = []

    get sumCorrect() {
        const correct = this.pairs
            .filter(p => p.ordered)
            .map(p => {
                // console.warn({index: p.index, left: p.left.toString(), right: p.right.toString()})
                return p
            })
            .map(p => p.index)
        return sum(correct)
    }

    /**
     * @param {PacketPair[]} pairs
     */
    constructor(pairs) {
        this.pairs = pairs
    }

    /**
     * @param {string} str
     * @returns {DistressSignal}
     */
    static fromString(str) {
        return new DistressSignal(str.split('\n\n').map((pairStr, i) => PacketPair.fromString(pairStr, i + 1)))
    }
}

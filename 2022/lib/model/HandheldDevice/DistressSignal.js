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
     * true=right order, false=wrong order, null=undecided
     * @param {Packet} other packet to compare against
     * @returns {Boolean?}
     */
    compare(other) {
        for (const [i, value] of this.values.entries()) {
            // If the right list runs out of items first, the inputs are not in the right order
            if (!(other.values.length > i)) return false
            const compareOther = other.values[i]

            if (isInt(value) && isInt(compareOther)) {
                if (value == compareOther) continue
                return value < compareOther
            }

            const {a, b} = {
                a: isPacket(value) ? value : new Packet([value]),
                b: isPacket(compareOther) ? compareOther : new Packet([compareOther]),
            }

            const result = a.compare(b)
            if (typeof result == 'boolean') return result
        }
        if (this.values.length == other.values.length) return null
        // left list ran out of items
        return true
    }

    toObj() {
        return this.values.map(v => (v instanceof Packet ? v.toObj() : v))
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

    constructor(left, right, index = 1) {
        Object.assign(this, {left, right, index})
    }

    /** @type {Boolean} */
    get ordered() {
        const result = this.left.compare(this.right)
        return typeof result == 'boolean' ? result : true
    }

    static fromString(str, index) {
        const [left, right] = str.split('\n')
        return new PacketPair(Packet.fromString(left), Packet.fromString(right), index)
    }
}

export class DistressSignal {
    /** @type {PacketPair[]} */
    pairs = []

    /** @type {Packet[]} */
    get packets() {
        return this.pairs.map(p => [p.left, p.right]).flat()
    }

    /** @type {number} */
    get decoderKey() {
        const packets = this.packets
            .sort((a, b) => {
                const result = new PacketPair(a, b).ordered
                return result === true ? -1 : result === false ? 1 : 0
            })
            .map(p => p.toString())
        return (packets.indexOf('[[2]]') + 1) * (packets.indexOf('[[6]]') + 1)
    }

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

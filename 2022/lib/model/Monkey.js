import {uniq} from '../lib.js'

export class Item {
    static DIVISOR = 3
    worryLevel = 0

    inspectedBy = []

    /**
     * @param {number} worryLevel
     */
    constructor(worryLevel) {
        Object.assign(this, {worryLevel})
    }
}

export class Monkey {
    id = 0

    /** @type {Item[]} */
    items = []

    divisor = 1
    factor = 1
    operationDef = a => 0

    /** @type {Monkey?} */
    trueTarget = null

    /** @type {Monkey?} */
    falseTarget = null

    /**
     * @param {number} id
     * @param {Item[]} items
     * @param {number} divisor
     * @param {Function} operationDef
     * @param {number} trueTarget
     * @param {number} falseTarget
     */
    constructor(id, items, divisor, operationDef, trueTarget, falseTarget) {
        Object.assign(this, {id, items, divisor, operationDef, trueTarget, falseTarget})
    }

    throwItems() {
        const targets = {}
        for (const item of this.items) {
            let newLevel = Math.floor(this.operationDef(item.worryLevel) / Item.DIVISOR)
            const target = newLevel % this.divisor === 0 ? this.trueTarget : this.falseTarget
            item.worryLevel = newLevel % this.factor
            item.inspectedBy.push(this.id)
            targets[target] = targets[target] || []
            targets[target].push(item)
        }
        this.items = []
        return targets
    }

    static fromString(str) {
        const [id_str, item_str, op_str, test_str, true_str, false_str] = str.split('\n')
        const [_a, id] = /Monkey (\d+):/.exec(id_str)
        const [_b, items] = /Starting items: (.*)/.exec(item_str)
        const [_c, operation] = /Operation: new = (.*)/.exec(op_str)
        const [_d, testDivisble] = /\s*Test: divisible by (\d+)/.exec(test_str)
        const [_e, trueTarget] = /\s*If true: throw to monkey (\d+)/.exec(true_str)
        const [_f, falseTarget] = /\s*If false: throw to monkey (\d+)/.exec(false_str)

        const divisor = parseInt(testDivisble, 10)
        const operationParsed = operation.replace(/old/g, 'a')
        const operationDef = new Function('a', `return ${operationParsed}`)
        const itemList = items.split(', ').map(i => new Item(parseInt(i, 10)))
        return new Monkey(
            parseInt(id, 10),
            itemList,
            divisor,
            operationDef,
            parseInt(trueTarget, 10),
            parseInt(falseTarget, 10)
        )
    }
}

export class MonkeyGroup {
    /** @type {Monkey[]} */
    monkeys = []
    static fromString(str) {
        const group = new MonkeyGroup()
        group.monkeys = str.split('\n\n').map(str => Monkey.fromString(str))
        const factor = group.commonFactor
        group.monkeys.map(m => (m.factor = factor))
        return group
    }

    getMonkey(id) {
        return this.monkeys.find(m => m.id == id)
    }

    get items() {
        return this.monkeys.map(m => m.items).flat()
    }

    get factors() {
        return uniq(this.monkeys.map(m => m.divisor)).sort()
    }

    get commonFactor() {
        const factors = this.factors
        const multiplier = this.factors.pop()
        let ceiling = multiplier
        while (true) {
            if (factors.filter(f => ceiling % f === 0).length === factors.length) {
                break
            }
            ceiling += multiplier
        }
        return ceiling
    }

    round() {
        for (const monkey of this.monkeys) {
            const thrown = monkey.throwItems()
            for (const [k, items] of Object.entries(thrown)) {
                const monkey = this.getMonkey(k)
                for (const item of items) {
                    monkey.items.push(item)
                }
            }
        }
    }

    rounds(number) {
        for (let i = 0; i < number; i++) {
            this.round()
        }
    }

    get topMonkeys() {
        const sums = {}
        this.items.map(item => {
            item.inspectedBy.map(monkeyId => {
                sums[monkeyId] = sums[monkeyId] || 0
                sums[monkeyId]++
            })
        })
        const sorted = Object.entries(sums).sort((a, b) => {
            return a[1] > b[1] ? -1 : 1
        })
        return sorted[0][1] * sorted[1][1]
    }
}

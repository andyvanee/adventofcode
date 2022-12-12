export class Item {
    static DIVISOR = BigInt(3)
    worryLevel = BigInt(0)

    inspectedBy = []

    /**
     * @param {number} worryLevel
     */
    constructor(worryLevel) {
        Object.assign(this, {worryLevel: BigInt(worryLevel)})
    }
}

export class Monkey {
    id = 0

    /** @type {Item[]} */
    items = []

    testDef = i => false
    operationDef = a => 0

    /** @type {Monkey?} */
    trueTarget = null

    /** @type {Monkey?} */
    falseTarget = null

    /**
     * @param {number} id
     * @param {Item[]} items
     * @param {Function} testDef
     * @param {Function} operationDef
     * @param {number} trueTarget
     * @param {number} falseTarget
     */
    constructor(id, items, testDef, operationDef, trueTarget, falseTarget) {
        Object.assign(this, {id, items, testDef, operationDef, trueTarget, falseTarget})
    }

    throwItems() {
        const targets = {}
        for (const item of this.items) {
            let newLevel = BigInt(this.operationDef(item.worryLevel))
            if (Item.DIVISOR > BigInt(1)) newLevel = newLevel / Item.DIVISOR
            const target = this.testDef(newLevel) ? this.trueTarget : this.falseTarget
            item.worryLevel = newLevel
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

        const testDef = i => i % BigInt(testDivisble) === BigInt(0)
        const operationParsed = operation.replace(/old/g, 'a').replace(/(\d+)/g, 'BigInt($1)')
        const operationDef = new Function('a', `return ${operationParsed}`)
        const itemList = items.split(', ').map(i => new Item(parseInt(i, 10)))
        return new Monkey(
            parseInt(id, 10),
            itemList,
            testDef,
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
        return group
    }

    getMonkey(id) {
        return this.monkeys.find(m => m.id == id)
    }

    get items() {
        return this.monkeys.map(m => m.items).flat()
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

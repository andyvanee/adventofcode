import {example} from '../../day_11/data/index.js'
import {Monkey, MonkeyGroup} from './Monkey.js'

describe('Monkey', () => {
    test('fromString', () => {
        const group = MonkeyGroup.fromString(example)
        expect(group.monkeys[0].id).toBe(0)
        expect(group.monkeys[3].id).toBe(3)
        group.monkeys[0].throwItems()
    })
    test('throw items', () => {
        const group = MonkeyGroup.fromString(example)
        const items = group.monkeys[0].throwItems()
        expect(items[3][0].worryLevel).toBe(500)
        expect(items[3][1].worryLevel).toBe(620)
        expect(items[3][0].inspectedBy[0]).toBe(0)
    })
    test('round', () => {
        const group = MonkeyGroup.fromString(example)
        group.round()
        expect(group.getMonkey(0).items.length).toBe(4)
        expect(group.getMonkey(1).items.length).toBe(6)
        expect(group.getMonkey(2).items.length).toBe(0)
        expect(group.getMonkey(3).items.length).toBe(0)
    })
    test('items', () => {
        const group = MonkeyGroup.fromString(example)
        group.rounds(20)
        expect(group.topMonkeys).toBe(10605)
    })

    test('factors', () => {
        const group = MonkeyGroup.fromString(example)
        expect(group.factors.length).toBe(4)
        expect(group.commonFactor).toBe(96577)
    })
})

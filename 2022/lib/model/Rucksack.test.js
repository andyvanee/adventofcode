import {Item, Rucksack} from './Rucksack.js'

describe('Item.fromLetter', () => {
    test('item values', () => {
        expect(Item.fromLetter('a').priority).toBe(1)
        expect(Item.fromLetter('p').priority).toBe(16)
        expect(Item.fromLetter('P').priority).toBe(42)
        expect(Item.fromLetter('Z').priority).toBe(52)
    })

    test('item Equality', () => {
        const item1 = Item.fromLetter('a')
        const item2 = Item.fromLetter('a')
        const item3 = Item.fromLetter('b')
        expect(item1.equals(item2)).toBe(true)
        expect(item1.equals(item3)).toBe(false)
    })
})

describe('Rucksack', () => {
    test('fromString & get items', () => {
        const rucksack = Rucksack.fromString('aBcD')
        expect(rucksack.items.length).toBe(4)
        expect(rucksack.items[3].letter).toBe('D')
    })

    test('findBadge', () => {
        const [a, b, c] = [
            Rucksack.fromString('abcd'),
            Rucksack.fromString('bbbb'),
            Rucksack.fromString('ddbd'),
        ]
        const badge = a.findBadge([b, c])
        expect(badge.letter).toBe('b')
    })
})

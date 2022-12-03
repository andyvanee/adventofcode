import {Item} from './Rucksack.js'

describe('Item.fromLetter', () => {
    test('item values', () => {
        expect(Item.fromLetter('a').priority).toBe(1)
        expect(Item.fromLetter('p').priority).toBe(16)
        expect(Item.fromLetter('P').priority).toBe(42)
        expect(Item.fromLetter('Z').priority).toBe(52)
    })
})

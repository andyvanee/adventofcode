import {readFile} from '../lib/lib.js'
import {part1} from './index.js'
import {itemFromLetter, itemTypes} from '../lib/model/Rucksack.js'

describe('part1', () => {
    test('item values', () => {
        expect(itemFromLetter('a').priority).toBe(1)
        expect(itemFromLetter('p').priority).toBe(16)
        expect(itemFromLetter('P').priority).toBe(42)
        expect(itemFromLetter('Z').priority).toBe(52)
    })

    test('example.txt', async () => {
        const puzzleInput = await readFile('day_03/data/example.txt')
        expect(part1(puzzleInput)).toBe(157)
    })

    test('day_03.txt', async () => {
        const puzzleInput = await readFile('day_03/data/day_03.txt')
        expect(part1(puzzleInput)).toBe(7908)
    })
})

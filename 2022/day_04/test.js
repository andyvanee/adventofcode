import {readFile} from '../lib/lib.js'
import {part1, part2} from './index.js'

describe('part1', () => {
    test('example.txt', async () => {
        const puzzleInput = await readFile('day_04/data/example.txt')
        expect(part1(puzzleInput)).toBe(2)
    })

    test('day_04.txt', async () => {
        const puzzleInput = await readFile('day_04/data/day_04.txt')
        expect(part1(puzzleInput)).toBe(487)
    })
})

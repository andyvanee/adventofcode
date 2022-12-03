import {readFile} from '../lib/lib.js'
import {part1} from './index.js'

describe('part1', () => {
    test('example.txt', async () => {
        const puzzleInput = await readFile('day_03/data/example.txt')
        expect(part1(puzzleInput)).toBe(157)
    })

    test('day_03.txt', async () => {
        const puzzleInput = await readFile('day_03/data/day_03.txt')
        expect(part1(puzzleInput)).toBe(7908)
    })
})

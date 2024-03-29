import {part1, part2} from './index.js'
import {readFile} from '../lib/lib.js'

describe('part1', () => {
    test('example', async () => {
        const puzzleInput = await readFile('day_02/data/example.txt')
        expect(part1(puzzleInput)).toBe(15)
    })

    test('puzzle', async () => {
        const puzzleInput = await readFile('day_02/data/day_02.txt')
        expect(part1(puzzleInput)).toBe(15337)
    })
})

describe('part2', () => {
    test('example', async () => {
        const puzzleInput = await readFile('day_02/data/example.txt')
        expect(part2(puzzleInput)).toBe(12)
    })

    test('puzzle', async () => {
        const puzzleInput = await readFile('day_02/data/day_02.txt')
        expect(part2(puzzleInput)).toBe(11696)
    })
})

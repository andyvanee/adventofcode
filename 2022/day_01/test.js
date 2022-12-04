import {readFile} from '../lib/lib.js'
import {part1, part2} from './index.js'

describe('day1', () => {
    describe('part1', () => {
        test('example', async () => {
            const puzzleInput = await readFile('day_01/data/example.txt')
            const result = part1(puzzleInput)
            expect(result).toBe(24_000)
        })

        test('puzzle', async () => {
            const puzzleInput = await readFile('day_01/data/day_01.txt')
            const result = part1(puzzleInput)
            expect(result).toBe(70_369)
        })
    })

    describe('part2', () => {
        test('example', async () => {
            const puzzleInput = await readFile('day_01/data/example.txt')
            const result = part2(puzzleInput)
            expect(result).toBe(45_000)
        })

        test('puzzle', async () => {
            const puzzleInput = await readFile('day_01/data/day_01.txt')
            const result = part2(puzzleInput)
            expect(result).toBe(203_002)
        })
    })
})

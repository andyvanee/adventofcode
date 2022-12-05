import {part1, part2} from './index.js'
import {example, puzzleInput} from './data/index.js'

describe('day_05', () => {
    describe('part 1', () => {
        test('example', async () => {
            expect(part1(example)).toBe('CMZ')
        })
        test('puzzleInput', async () => {
            expect(part1(puzzleInput)).toBe('BSDMQFLSP')
        })
    })

    describe('part 2', () => {
        test('example', async () => {
            expect(part2(example)).toBe('MCD')
        })
        test('puzzleInput', async () => {
            expect(part2(puzzleInput)).toBe('PGSQBFLDP')
        })
    })
})

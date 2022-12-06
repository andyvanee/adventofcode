import {example, puzzleInput} from './data/index.js'
import {part1, part2} from './index.js'

describe('part1', () => {
    test('example', () => {
        expect(part1(example)).toBe(7)
    })
    test('puzzle', () => {
        expect(part1(puzzleInput)).toBe(1623)
    })
})
describe('part2', () => {
    test('example', () => {
        expect(part2(example)).toBe(19)
    })
    test('puzzle', () => {
        expect(part2(puzzleInput)).toBe(3774)
    })
})

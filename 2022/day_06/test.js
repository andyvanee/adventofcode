import {example, puzzleInput} from './data/index.js'
import {part1, part2} from './index.js'

describe('part1', () => {
    test('example', () => {
        expect(part1(example)).toBe('-\n')
    })
    test('puzzle', () => {
        expect(part1(puzzleInput)).toBe('-\n')
    })
})
describe('part2', () => {
    test('example', () => {
        expect(part2(example)).toBe('-\n')
    })
    test('puzzle', () => {
        expect(part2(puzzleInput)).toBe('-\n')
    })
})

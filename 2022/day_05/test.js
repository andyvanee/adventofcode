import {part1} from './index.js'
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
})

import {part1, part2} from './index.js'
import {example, data} from './data/index.js'

describe('day_11', () => {
    describe('part 1', () => {
        test('example', async () => {
            expect(part1(example)).toBe(10_605)
        })
        test('data', async () => {
            expect(part1(data)).toBe(58_322)
        })
    })

    describe('part 2', () => {
        test.skip('example', async () => {
            expect(part2(example)).toBe(2713310158)
        })
        test.skip('data', async () => {
            expect(part2(data)).toBe(true)
        })
    })
})

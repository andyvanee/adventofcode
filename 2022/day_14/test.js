import {part1, part2} from './index.js'
import {example, data} from './data/index.js'

describe('day_14', () => {
    describe('part 1', () => {
        test('example', async () => {
            expect(part1(example)).toBe(24)
        })
        test.skip('data', async () => {
            expect(part1(data)).toBe(805)
        })
    })

    describe('part 2', () => {
        test.skip('example', async () => {
            expect(part2(example)).toBe(true)
        })
        test.skip('data', async () => {
            expect(part2(data)).toBe(true)
        })
    })
})

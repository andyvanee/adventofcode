import {part1, part2} from './index.js'
import {example, data} from './data/index.js'

describe('day_09', () => {
    describe('part 1', () => {
        test('example', async () => {
            expect(part1(example)).toBe(13)
        })
        test('data', async () => {
            expect(part1(data)).toBe(6098)
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

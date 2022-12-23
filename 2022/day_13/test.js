import {part1, part2} from './index.js'
import {example, data} from './data/index.js'

describe('day_13', () => {
    describe('part 1', () => {
        test('example', async () => {
            expect(part1(example)).toBe(13)
        })
        test('data', async () => {
            expect(part1(data)).toBe(5625)
        })
    })

    describe('part 2', () => {
        test('example', async () => {
            expect(part2(example)).toBe(140)
        })
        test('data', async () => {
            expect(part2(data)).toBe(23111)
        })
    })
})

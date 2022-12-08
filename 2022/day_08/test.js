import {data, example} from './data/index.js'
import {part1, part2} from './index.js'

describe('day_08', () => {
    describe('part1', () => {
        test('example', () => {
            expect(part1(example)).toBe(21)
        })
        test('puzzle', () => {
            expect(part1(data)).toBe(1807)
        })
    })
    describe('part2', () => {
        test('example', () => {
            expect(part2(example)).toBe(8)
        })
        test('puzzle', () => {
            expect(part2(data)).toBe(480000)
        })
    })
})

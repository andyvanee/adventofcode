import {part1, part2} from './index.js'
import {example, data, crt} from './data/index.js'

const crtOut = `
####.###..#..#.###..#..#.####..##..#..#.
#....#..#.#..#.#..#.#..#....#.#..#.#..#.
###..###..#..#.#..#.####...#..#....####.
#....#..#.#..#.###..#..#..#...#....#..#.
#....#..#.#..#.#.#..#..#.#....#..#.#..#.
#....###...##..#..#.#..#.####..##..#..#.
`.trim()

describe('day_10', () => {
    describe('part 1', () => {
        test('example', async () => {
            expect(part1(example)).toBe(13140)
        })
        test('data', async () => {
            expect(part1(data)).toBe(13720)
        })
    })

    describe('part 2', () => {
        test('example', async () => {
            expect(part2(example)).toBe(crt)
        })
        test('data', async () => {
            expect(part2(data)).toBe(crtOut)
        })
    })
})

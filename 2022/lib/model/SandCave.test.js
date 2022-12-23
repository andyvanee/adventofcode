import {example} from '../../day_14/data/index.js'
import {Air, Rock, Sand, SandCave} from './SandCave.js'

describe('SandCave', () => {
    test('fromString', () => {
        const cave = SandCave.fromString(example)
        cave.place(new Sand(500, 0))
        expect(cave.width).toBe(504)
        expect(cave.height).toBe(10)
        expect(cave.at(502, 4)).toBeInstanceOf(Rock)
        expect(cave.at(501, 4)).toBeInstanceOf(Air)
        expect(cave.at(500, 0)).toBeInstanceOf(Sand)
    })

    test('run', () => {
        const cave = SandCave.fromString(example)
        const count = cave.run()
        expect(count).toBe(24)
    })
})

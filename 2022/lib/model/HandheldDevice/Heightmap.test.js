import {example} from '../../../day_12/data/index.js'
import {HeightMap, Location} from './Heightmap.js'

describe('HeightMap', () => {
    test('fromString', () => {
        const map = HeightMap.fromString('SazE')
        expect(map.locations[0].height).toBe(Location.START)
        expect(map.locations[1].height).toBe(2)
        expect(map.locations[2].height).toBe(27)
        expect(map.locations[3].height).toBe(Location.END)
        expect(map.locations[3].x).toBe(3)
        expect(map.locations[3].y).toBe(0)
    })

    test('neigbours', () => {
        const map = HeightMap.fromString('SazE')
        const neigbours = map.neighbours(map.locations.find(l => l.height == Location.END))
        expect(map.locations.length).toBe(4)
        expect(neigbours.length).toBe(1)
        expect(neigbours[0].height).toBe(27)
    })

    test('shortestPath', () => {
        const map = HeightMap.fromString(example)
        expect(map.shortestPath.length).toBe(32)
    })
})

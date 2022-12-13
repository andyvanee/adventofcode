import {example} from '../../../day_12/data/index.js'
import {HeightMap, Location} from './Heightmap.js'

describe('HeightMap', () => {
    test('fromString', () => {
        const map = HeightMap.fromString('SazE')
        expect(map.locations[0].height).toBe(Location.START)
        expect(map.locations[1].height).toBe(1)
        expect(map.locations[2].height).toBe(26)
        expect(map.locations[3].height).toBe(Location.END)
        expect(map.locations[3].x).toBe(3)
        expect(map.locations[3].y).toBe(0)
    })

    test('neigbours', () => {
        const map = HeightMap.fromString('SazE')
        const neigbours = map.neighbours(map.locations.find(l => l.height == 27))
        expect(neigbours.length).toBe(1)
        expect(neigbours[0].height).toBe(26)
    })

    test('paths', () => {
        const map = HeightMap.fromString(example)
        expect(map.locations.length).toBe(40)
        expect(map.shortestPath).toBe(31)
    })
})

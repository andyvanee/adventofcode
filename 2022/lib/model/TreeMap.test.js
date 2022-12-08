import {data, example} from '../../day_08/data/index.js'
import {isVisible, TreeMap} from './TreeMap.js'

describe('TreeMap', () => {
    test('fromString', () => {
        const map = TreeMap.fromString('1')
        expect(map.width).toBe(1)
        expect(map.height).toBe(1)
    })

    describe('example', () => {
        const map = TreeMap.fromString(example)
        test('fromString example', () => {
            expect(map.width).toBe(5)
            expect(map.height).toBe(5)
        })

        test('treeLocation', () => {
            expect(map.treeLocation(4, 3).height).toBe(9)
        })

        test('getRow', () => {
            const row = map.getRow(3)
            expect(row.length).toBe(5)
            expect(row[0].height).toBe(3)
            expect(row[4].height).toBe(9)
        })
        test('getColumn', () => {
            const column = map.getColumn(4)
            expect(column.length).toBe(5)
            expect(column[0].height).toBe(3)
            expect(column[4].height).toBe(0)
        })
        test('isVisible', () => {
            expect(isVisible(map.treeLocation(0, 0), map)).toBe(true)
            expect(isVisible(map.treeLocation(1, 1), map)).toBe(true)
            expect(isVisible(map.treeLocation(1, 3), map)).toBe(false)
            expect(isVisible(map.treeLocation(3, 3), map)).toBe(false)
        })
        test('visibleTrees', () => {
            expect(map.visibleTrees.length).toBe(21)
        })
    })
})

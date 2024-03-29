import {split, group, uniq, max} from './lib.js'

describe('lib', () => {
    describe('split', () => {
        test('empty', () => {
            const result = split('')
            expect(result[0]).toBe('')
            expect(result[1]).toBe('')
        })

        test('ab', () => {
            const result = split('ab')
            expect(result[0]).toBe('a')
            expect(result[1]).toBe('b')
        })

        test('abc', () => {
            const result = split('abc')
            expect(result[0]).toBe('a')
            expect(result[1]).toBe('bc')
        })

        test('array', () => {
            const result = split(['a', 'b', 'c'])
            expect(result[0][0]).toBe('a')
            expect(result[1][0]).toBe('b')
            expect(result[1][1]).toBe('c')
        })
    })

    describe('group', () => {
        test('4/2', () => {
            const result = JSON.stringify(group(2, ['a', 'b', 'c', 'd']))
            const expected = JSON.stringify([
                ['a', 'b'],
                ['c', 'd'],
            ])
            expect(result).toBe(expected)
        })
        test('6/2', () => {
            const result = JSON.stringify(group(2, ['a', 'b', 'c', 'd', 'e', 'f']))
            const expected = JSON.stringify([
                ['a', 'b'],
                ['c', 'd'],
                ['e', 'f'],
            ])
            expect(result).toBe(expected)
        })
    })

    test('uniq', () => {
        expect(uniq(['a']).length).toBe(1)
        expect(uniq(['a', 'a']).length).toBe(1)
        expect(uniq(['a', 'b', 'c']).length).toBe(3)
    })

    test('max', () => {
        expect(max([0, 1, 2])).toBe(2)
        expect(max([-10, 900, 12])).toBe(900)
    })
})

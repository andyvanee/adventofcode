import {split} from './lib.js'

describe('lib', () => {
    test('split empty', () => {
        const result = split('')
        expect(result[0]).toBe('')
        expect(result[1]).toBe('')
    })

    test('split ab', () => {
        const result = split('ab')
        expect(result[0]).toBe('a')
        expect(result[1]).toBe('b')
    })

    test('split abc', () => {
        const result = split('abc')
        expect(result[0]).toBe('a')
        expect(result[1]).toBe('bc')
    })

    test('split array', () => {
        const result = split(['a', 'b', 'c'])
        expect(result[0][0]).toBe('a')
        expect(result[1][0]).toBe('b')
        expect(result[1][1]).toBe('c')
    })
})

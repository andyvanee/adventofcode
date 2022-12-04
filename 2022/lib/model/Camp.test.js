import {Section} from './Camp.js'

describe('Section', () => {
    test('fromString 2-4', () => {
        const section = Section.fromString('2-4')
        expect(section.min).toBe(2)
        expect(section.max).toBe(4)
    })

    test('2-8 includes 3-7', () => {
        const [a, b] = [Section.fromString('2-8'), Section.fromString('3-7')]
        expect(a.includes(b)).toBe(true)
    })
    test('2-4 includes 2-4', () => {
        const [a, b] = [Section.fromString('2-4'), Section.fromString('3-4')]
        expect(a.includes(b)).toBe(true)
    })
    test('2-3 does not include 2-4', () => {
        const [a, b] = [Section.fromString('2-3'), Section.fromString('2-4')]
        expect(a.includes(b)).toBe(false)
    })
    test('3-4 does not include 2-4', () => {
        const [a, b] = [Section.fromString('3-4'), Section.fromString('2-4')]
        expect(a.includes(b)).toBe(false)
    })
})

import {Section} from './Camp.js'

describe('Section', () => {
    describe('fromString', () => {
        test('2-4', () => {
            const section = Section.fromString('2-4')
            expect(section.min).toBe(2)
            expect(section.max).toBe(4)
        })
    })

    describe('includes', () => {
        test('2-8 includes 3-7', () => {
            const [a, b] = [
                Section.fromString('2-8'),
                Section.fromString('3-7'),
            ]
            expect(a.includes(b)).toBe(true)
        })

        test('2-4 includes 2-4', () => {
            const [a, b] = [
                Section.fromString('2-4'),
                Section.fromString('3-4'),
            ]
            expect(a.includes(b)).toBe(true)
        })

        test('2-3 does not include 2-4', () => {
            const [a, b] = [
                Section.fromString('2-3'),
                Section.fromString('2-4'),
            ]
            expect(a.includes(b)).toBe(false)
        })

        test('3-4 does not include 2-4', () => {
            const [a, b] = [
                Section.fromString('3-4'),
                Section.fromString('2-4'),
            ]
            expect(a.includes(b)).toBe(false)
        })
    })

    describe('overlaps', () => {
        test('5-7 overlaps 7-9', () => {
            const [a, b] = [
                Section.fromString('5-7'),
                Section.fromString('7-9'),
            ]
            expect(a.overlaps(b)).toBe(true)
        })

        test('1-2 does not overlap 3-4', () => {
            const [a, b] = [
                Section.fromString('1-2'),
                Section.fromString('3-4'),
            ]
            expect(a.overlaps(b)).toBe(false)
        })

        test('3-4 does not overlap 1-2', () => {
            const [a, b] = [
                Section.fromString('3-4'),
                Section.fromString('1-2'),
            ]
            expect(a.overlaps(b)).toBe(false)
        })
    })
})

import { expect, test } from 'bun:test'
import { calibrationValue } from './calibrationValue'

const day01Sample = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`

test('2 + 2', () => {
    expect(calibrationValue(day01Sample)).toBe(142)
})

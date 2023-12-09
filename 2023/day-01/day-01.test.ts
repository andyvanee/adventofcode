import { expect, test } from 'bun:test'
import { calibrateWithText, calibrationValue } from './calibrationValue'

const day01Sample = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`

test('day01Sample', () => {
    expect(calibrationValue(day01Sample)).toBe(142)
})

test('day01Input', async () => {
    const input = await Bun.file('./day-01/input').text()
    expect(calibrationValue(input)).toBe(54630)
})

const day01SampleB = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`

test('day01SampleB', () => {
    expect(calibrateWithText(day01SampleB)).toBe(281)
})

test('day01InputB', async () => {
    const input = await Bun.file('./day-01/input').text()
    expect(calibrateWithText(input)).toBe(54770)
})

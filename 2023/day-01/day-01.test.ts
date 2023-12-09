import { expect, test } from 'bun:test'
import { calibrateWithText, calibrationValue } from './calibrationValue'

const input = await Bun.file('./day-01/input').text()
const sampleA = await Bun.file('./day-01/sampleA').text()
const sampleB = await Bun.file('./day-01/sampleB').text()

test('day01Sample', () => {
    expect(calibrationValue(sampleA)).toBe(142)
})

test('day01Input', async () => {
    expect(calibrationValue(input)).toBe(54630)
})

test('day01SampleB', () => {
    expect(calibrateWithText(sampleB)).toBe(281)
})

test('day01InputB', async () => {
    expect(calibrateWithText(input)).toBe(54770)
})

import { expect, test } from 'bun:test'
import { Schematic } from './Schematic'

const input = await Bun.file('./day-03/input.txt').text()
const sample = await Bun.file('./day-03/sample.txt').text()

test('find parts', () => {
    const parts = Schematic.fromString(sample)
    expect(parts.value).toBe(4361)
})
test('day03 input', () => {
    const parts = Schematic.fromString(input)
    expect(parts.value).toBe(546563)
})

test('day03.1 sample', () => {
    const parts = Schematic.fromString(sample)
    expect(parts.gearRatio).toBe(467835)
})

test('day03.1 input', () => {
    const parts = Schematic.fromString(input)
    expect(parts.gearRatio).toBe(91031374)
})

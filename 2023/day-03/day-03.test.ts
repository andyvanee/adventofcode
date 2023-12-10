import { expect, test } from 'bun:test'
import { partListFromInput } from './PartList'

const input = await Bun.file('./day-03/input.txt').text()
const sample = await Bun.file('./day-03/sample.txt').text()

test('find parts', () => {
    const parts = partListFromInput(sample)
    expect(parts.value).toBe(4361)
})
test('day03 input', () => {
    const parts = partListFromInput(input)
    expect(parts.value).toBe(546563)
})

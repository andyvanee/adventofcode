import {part1} from './part1.js'
import {readFile} from '../lib/lib.js'

test('it is cool', async () => {
    const puzzleInput = await readFile('day_02/data/example.txt')
    expect(part1(puzzleInput)).toBe('Player B score: 15')
})

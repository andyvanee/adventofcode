import {SandCave} from '../lib/model/SandCave.js'

/**
 * Solution for part 1
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part1 = puzzleInput => {
    const cave = SandCave.fromString(puzzleInput)
    return cave.run()
}

/**
 * Solution for part 2
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part2 = puzzleInput => {
    return -1
}

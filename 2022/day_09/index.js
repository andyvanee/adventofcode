import {Rope} from '../lib/model/Rope.js'

/**
 * Solution for part 1
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part1 = puzzleInput => {
    const rope = new Rope()
    rope.readInstructions(puzzleInput)
    rope.exec()
    return rope.tailVisited
}

/**
 * Solution for part 2
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part2 = puzzleInput => {
    const rope = new Rope(10)
    rope.readInstructions(puzzleInput)
    rope.exec()
    return rope.tailVisited
}

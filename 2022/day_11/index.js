import {MonkeyGroup} from '../lib/model/Monkey.js'

/**
 * Solution for part 1
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part1 = puzzleInput => {
    const group = MonkeyGroup.fromString(puzzleInput)
    group.rounds(20)
    return group.topMonkeys
}

/**
 * Solution for part 2
 * @param {string} puzzleInput
 * @returns {string}
 */
export const part2 = puzzleInput => {
    return ''
}

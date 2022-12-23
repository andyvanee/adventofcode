import {DistressSignal} from '../lib/model/HandheldDevice/DistressSignal.js'

/**
 * Solution for part 1
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part1 = puzzleInput => {
    const signal = DistressSignal.fromString(puzzleInput)
    return signal.sumCorrect
}

/**
 * Solution for part 2
 * @param {string} puzzleInput
 * @returns {string}
 */
export const part2 = puzzleInput => {
    return ''
}

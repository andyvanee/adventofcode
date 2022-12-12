import {Item, MonkeyGroup} from '../lib/model/Monkey.js'

/**
 * Solution for part 1
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part1 = puzzleInput => {
    Item.DIVISOR = BigInt(3)
    const group = MonkeyGroup.fromString(puzzleInput)
    group.rounds(20)
    return group.topMonkeys
}

/**
 * Solution for part 2
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part2 = puzzleInput => {
    Item.DIVISOR = BigInt(1)
    const group = MonkeyGroup.fromString(puzzleInput)
    group.rounds(10_000)
    return group.topMonkeys
}

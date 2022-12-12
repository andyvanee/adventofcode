import {HandheldDevice} from '../lib/model/HandheldDevice.js'

/**
 * Solution for part 1
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part1 = puzzleInput => {
    const device = new HandheldDevice()
    const {cpu} = device
    cpu.parseInstructions(puzzleInput)
    const sum = cpu.sumOfTickSequence([20, 60, 100, 140, 180, 220])
    return sum
}

/**
 * Solution for part 2
 * @param {string} puzzleInput
 * @returns {string}
 */
export const part2 = puzzleInput => {
    let cpu = new HandheldDevice().cpu
    cpu.parseInstructions(puzzleInput)
    cpu.runTicks(Infinity)
    return cpu.screen.toString()
}

import {HandheldDevice} from '../lib/model/HandheldDevice.js'

/**
 * Solution for part 1
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part1 = puzzleInput => {
    const device = new HandheldDevice()
    device.storage.driveFromCLI(puzzleInput)
    return device.storage.deletionCandidateSize
}

/**
 * Solution for part 2
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part2 = puzzleInput => {
    return 0
}

import {HandheldDevice} from '../lib/model/HandheldDevice.js'

/**
 * Solution for part 1
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part1 = puzzleInput => {
    const device = new HandheldDevice()
    device.comm.bufferFromString(puzzleInput)
    return device.comm.startOfPacketMarker
}

/**
 * Solution for part 2
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part2 = puzzleInput => {
    const device = new HandheldDevice()
    device.comm.bufferFromString(puzzleInput)
    return device.comm.startOfMessageMarker
}

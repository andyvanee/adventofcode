import {HandheldDevice} from '../lib/model/HandheldDevice.js'

export const part1 = puzzleInput => {
    const device = new HandheldDevice()
    device.comm.bufferFromString(puzzleInput.trim())
    return device.comm.startOfPacketMarker
}

export const part2 = puzzleInput => {
    return puzzleInput
}

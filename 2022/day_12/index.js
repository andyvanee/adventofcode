import {HeightMap} from '../lib/model/HandheldDevice/Heightmap.js'

/**
 * Solution for part 1
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part1 = puzzleInput => {
    const map = HeightMap.fromString(puzzleInput)
    return map.shortestPath
}

/**
 * Solution for part 2
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part2 = puzzleInput => {
    const map = HeightMap.fromString(puzzleInput)
    return map.shortestToA
}

import {HeightMap} from '../lib/model/HandheldDevice/Heightmap.js'

/**
 * Solution for part 1
 * @param {string} puzzleInput
 * @returns {number}
 */
export const part1 = puzzleInput => {
    const map = HeightMap.fromString(puzzleInput)
    // Subtract 1 since we want steps between nodes, not number of nodes
    return map.shortestPath.length - 1
}

/**
 * Solution for part 2
 * @param {string} puzzleInput
 * @returns {string}
 */
export const part2 = puzzleInput => {
    return ''
}

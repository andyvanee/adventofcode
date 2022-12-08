import {TreeMap} from '../lib/model/TreeMap.js'

export const part1 = puzzleInput => {
    const map = TreeMap.fromString(puzzleInput)
    return map.visibleTrees.length
}

export const part2 = puzzleInput => {
    throw new Error('not implemented')
}

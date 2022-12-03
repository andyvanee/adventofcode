import {Rucksack} from '../lib/model/Rucksack.js'

export const part1 = (puzzleInput) => {
    const lines = puzzleInput.split('\n').filter((x) => x)

    let prioritySum = 0

    for (const line of lines) {
        const rucksack = Rucksack.fromString(line)
        const sharedItem = rucksack.findSharedItem()
        prioritySum += sharedItem.priority
    }

    return prioritySum
}

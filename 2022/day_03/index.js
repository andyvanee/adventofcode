import {group} from '../lib/lib.js'
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

export const part2 = (puzzleInput) => {
    const lines = puzzleInput.split('\n').filter((x) => x)

    const groups = group(3, lines)

    let prioritySum = 0

    for (const group of groups) {
        const [first, ...others] = group.map((line) =>
            Rucksack.fromString(line)
        )
        const badge = first.findBadge(others)
        prioritySum += badge.priority
    }

    return prioritySum
}

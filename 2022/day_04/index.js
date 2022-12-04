import {Section} from '../lib/model/Camp.js'

const loadGroups = (puzzleInput) => {
    const groups = []
    for (const group of puzzleInput.split('\n')) {
        if (!group) continue
        const [_a, _b] = group.split(',')
        const a = Section.fromString(_a)
        const b = Section.fromString(_b)
        groups.push([a, b])
    }
    return groups
}

export const part1 = (puzzleInput) => {
    const groups = loadGroups(puzzleInput)
    let pairs = 0

    for (const group of groups) {
        const [a, b] = group
        if (a.includes(b) || b.includes(a)) {
            pairs++
        }
    }
    return pairs
}

export const part2 = (puzzleInput) => {
    const groups = loadGroups(puzzleInput)
    let pairs = 0

    for (const group of groups) {
        const [a, b] = group
        if (a.overlaps(b) || b.overlaps(a)) {
            pairs++
        }
    }
    return pairs
}

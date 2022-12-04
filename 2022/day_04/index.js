import {Section} from '../lib/model/Camp.js'

export const part1 = (puzzleInput) => {
    let pairs = 0

    for (const group of puzzleInput.split('\n')) {
        if (!group) continue
        const [_a, _b] = group.split(',')
        const a = Section.fromString(_a)
        const b = Section.fromString(_b)
        if (a.includes(b) || b.includes(a)) {
            pairs++
        }
    }
    return pairs
}

export const part2 = (puzzleInput) => {
    return false
}

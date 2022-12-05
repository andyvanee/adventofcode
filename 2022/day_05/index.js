import {Crate, CrateMover9000, CrateMover9001, LoadingDock} from '../lib/model/LoadingDock.js'

export const part1 = puzzleInput => {
    const dock = LoadingDock.fromString(puzzleInput)
    const mover = new CrateMover9000()
    dock.exec(mover)
    return dock.tops
}

export const part2 = puzzleInput => {
    const dock = LoadingDock.fromString(puzzleInput)
    const mover = new CrateMover9001()
    dock.exec(mover)
    return dock.tops
}

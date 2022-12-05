import {Crate, LoadingDock} from '../lib/model/LoadingDock.js'

export const part1 = puzzleInput => {
    const dock = LoadingDock.fromString(puzzleInput)
    dock.exec()
    return dock.tops
}

// export const part2 = puzzleInput => {
//     return false
// }

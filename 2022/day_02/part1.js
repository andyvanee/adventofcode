import {RockPaperScissors} from '../lib/index.js'

export const part1 = puzzleInput => {
    const game = new RockPaperScissors.Game()
    for (const line of puzzleInput.split('\n')) {
        const [a, b] = line.split(' ')
        if (!(a && b)) continue
        game.roundFromLetters(a, b)
    }
    return `Player B score: ${game.total('b')}`
}

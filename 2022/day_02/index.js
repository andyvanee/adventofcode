import {RockPaperScissors} from '../lib/index.js'

export const part1 = (puzzleInput) => {
    const game = new RockPaperScissors.Game()
    for (const line of puzzleInput.split('\n')) {
        const [a, b] = line.split(' ')
        if (!(a && b)) continue
        game.roundFromLetters(a, b)
    }
    return game.total('b')
}

export const part2 = (puzzleInput) => {
    const game = new RockPaperScissors.Game()
    for (const line of puzzleInput.split('\n')) {
        const [a, b] = line.split(' ')
        if (!(a && b)) continue

        const desiredOutcome = RockPaperScissors.OUTCOMES[b]

        const outcome = [
            RockPaperScissors.Round.fromLetters(a, 'A'),
            RockPaperScissors.Round.fromLetters(a, 'B'),
            RockPaperScissors.Round.fromLetters(a, 'C'),
        ].find((option) => option.outcome()[1] === desiredOutcome)

        game.addRound(outcome)
    }
    return game.total('b')
}

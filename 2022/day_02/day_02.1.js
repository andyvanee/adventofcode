import {readFile, args, RockPaperScissor} from "../lib/index.js"

const puzzleInput = await readFile(args[0])

const game = new RockPaperScissor.Game()
for (const line of puzzleInput.split("\n")) {
    const [a, b] = line.split(" ")
    if (!(a && b)) continue;
    game.roundFromLetters(a, b)
}
console.log('Player B score: ', game.total('b'))

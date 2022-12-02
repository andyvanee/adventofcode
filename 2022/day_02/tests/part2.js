import { RockPaperScissor } from "../../lib/index.js";

export const part2 = (puzzleInput) => {
  const game = new RockPaperScissor.Game();
  for (const line of puzzleInput.split("\n")) {
    const [a, b] = line.split(" ");
    if (!(a && b)) continue;

    const desiredOutcome = RockPaperScissor.OUTCOMES[b];

    const outcome = [
      RockPaperScissor.Round.fromLetters(a, "A"),
      RockPaperScissor.Round.fromLetters(a, "B"),
      RockPaperScissor.Round.fromLetters(a, "C"),
    ].find((option) => option.outcome()[1] === desiredOutcome);

    game.addRound(outcome);
  }
  return `Player B score: ${game.total("b")}`;
};

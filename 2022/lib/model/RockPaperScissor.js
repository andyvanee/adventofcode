import { sum } from "../lib.js"

const SCORES = {
    "LOSE": 0,
    "DRAW": 3,
    "WIN": 6
}

class Choice {
    name = ""
    value = 0

    constructor(name) {
        this.name = name
        this.value = Choice.CHOICE_VALUES[name]
    }

    static CHOICE_VALUES = {
        "ROCK": 1,
        "PAPER": 2,
        "SCISSORS": 3
    }

    static SCORING = {
        "ROCK ROCK": SCORES.DRAW,
        "ROCK PAPER": SCORES.LOSE,
        "ROCK SCISSORS": SCORES.WIN,
        "PAPER ROCK": SCORES.WIN,
        "PAPER PAPER": SCORES.DRAW,
        "PAPER SCISSORS": SCORES.LOSE,
        "SCISSORS ROCK": SCORES.LOSE,
        "SCISSORS PAPER": SCORES.WIN,
        "SCISSORS SCISSORS": SCORES.DRAW,
    }

    static LETTER_CHOICES = {
        "A": "ROCK",
        "B": "PAPER",
        "C": "SCISSORS",
        "X": "ROCK",
        "Y": "PAPER",
        "Z": "SCISSORS",
    }

    static fromLetter(letter) {
        return new Choice(Choice.LETTER_CHOICES[letter])
    }

    score(opponent) {
        const choiceValue = Choice.CHOICE_VALUES[this.name]
        const score = Choice.SCORING[`${this.name} ${opponent.name}`]
        return choiceValue + score
    }
}

class Round {
    constructor(a, b) {
        this.a = a
        this.b = b
    }

    static fromLetters(a, b) {
        return new Round(Choice.fromLetter(a), Choice.fromLetter(b))
    }

    score() {
        return [this.a.score(this.b), this.b.score(this.a)]
    }
}

class Game {
    #rounds = []

    roundFromLetters(a, b) {
        this.#rounds.push(Round.fromLetters(a, b))
    }

    total(player) {
        const playerIndex = ['a', 'b'].indexOf(player)
        return sum(this.scores.map(s => s[playerIndex]))
    }

    get scores() {
        return this.#rounds.map(r => r.score())
    }
}

export const RockPaperScissor = {
    Game,
    Round
}

import {Choice} from './Choice.js'

export class Round {
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

    outcome() {
        return [this.a.outcome(this.b), this.b.outcome(this.a)]
    }
}

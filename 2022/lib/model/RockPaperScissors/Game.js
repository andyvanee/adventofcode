import {sum} from '../../lib.js'
import {Round} from './Round.js'

export class Game {
    #rounds = []

    addRound(round) {
        this.#rounds.push(round)
    }

    roundFromLetters(a, b) {
        this.addRound(Round.fromLetters(a, b))
    }

    total(player) {
        const playerIndex = ['a', 'b'].indexOf(player)
        return sum(this.scores.map(s => s[playerIndex]))
    }

    get scores() {
        return this.#rounds.map(r => r.score())
    }
}

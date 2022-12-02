import {CHOICE_VALUES, LETTER_CHOICES, SCORING} from './constants.js'

export class Choice {
    name = ''
    value = 0

    constructor(name) {
        this.name = name
        this.value = CHOICE_VALUES[name]
    }

    static fromLetter(letter) {
        return new Choice(LETTER_CHOICES[letter])
    }

    get choiceValue() {
        return CHOICE_VALUES[this.name]
    }

    outcome(opponent) {
        return SCORING[`${this.name} ${opponent.name}`]
    }

    score(opponent) {
        return this.choiceValue + this.outcome(opponent)
    }
}

export const SCORES = {
    LOSE: 0,
    DRAW: 3,
    WIN: 6,
}

export const CHOICE_VALUES = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,
}

export const SCORING = {
    'ROCK ROCK': SCORES.DRAW,
    'ROCK PAPER': SCORES.LOSE,
    'ROCK SCISSORS': SCORES.WIN,
    'PAPER ROCK': SCORES.WIN,
    'PAPER PAPER': SCORES.DRAW,
    'PAPER SCISSORS': SCORES.LOSE,
    'SCISSORS ROCK': SCORES.LOSE,
    'SCISSORS PAPER': SCORES.WIN,
    'SCISSORS SCISSORS': SCORES.DRAW,
}

export const OUTCOMES = {
    A: SCORES.LOSE,
    B: SCORES.DRAW,
    C: SCORES.WIN,
    X: SCORES.LOSE,
    Y: SCORES.DRAW,
    Z: SCORES.WIN,
}

export const LETTER_CHOICES = {
    A: 'ROCK',
    B: 'PAPER',
    C: 'SCISSORS',
    X: 'ROCK',
    Y: 'PAPER',
    Z: 'SCISSORS',
}

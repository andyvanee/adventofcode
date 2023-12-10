interface GameValues {
    red: number
    green: number
    blue: number
}

type KeyofGameValues = keyof GameValues

function isKeyofGameValues(key: string): key is KeyofGameValues {
    return ['red', 'green', 'blue'].includes(key)
}

function valuesFromString(input: string) {
    const value: GameValues = { red: 0, green: 0, blue: 0 }
    for (const sample of input.split(',')) {
        const match = /(\d+) (\w+)/.exec(sample)
        if (!match) {
            throw new Error(`Invalid sample: ${sample}`)
        }
        const [_, valueNumber, key] = match
        if (isKeyofGameValues(key)) {
            const valueInt = parseInt(valueNumber)
            if (valueInt > (value[key] as number)) value[key] = valueInt
        } else {
            throw new Error(`Unknown key: ${key}`)
        }
    }
    return value
}

export class Game {
    constructor(public id: string, private values: GameValues) {}

    get value() {
        return parseInt(this.id)
    }

    get red() {
        return this.values.red
    }

    get green() {
        return this.values.green
    }

    get blue() {
        return this.values.blue
    }

    possibleFromGame(other: Game) {
        return other.red >= this.red && other.green >= this.green && other.blue >= this.blue
    }

    sumOfPossible(games: Game[]) {
        return games
            .filter((game) => game.possibleFromGame(this))
            .reduce((prev, curr) => {
                return curr.value + prev
            }, 0)
    }

    static fromString(input: string) {
        const match = /Game (\d+): (.*)/.exec(input)
        if (!match) throw new Error(`Invalid input: ${input}`)
        const [_, id, valueInput] = match
        const values = valueInput.split(';').map(valuesFromString)
        const value = values.reduce(
            (prev, current) => ({
                red: current.red > prev.red ? current.red : prev.red,
                green: current.green > prev.green ? current.green : prev.green,
                blue: current.blue > prev.blue ? current.blue : prev.blue,
            }),
            { red: 0, green: 0, blue: 0 }
        )
        return new Game(id, value)
    }
}

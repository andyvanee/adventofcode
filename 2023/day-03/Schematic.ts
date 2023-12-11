import { Cell } from './Cell'

export class Schematic {
    constructor(private cells: Cell[]) {}

    static fromString(schematic: string) {
        const lines = schematic.split('\n')

        const cells = lines
            .map((line, y) => {
                return line.split('').map((char, x) => {
                    return new Cell(char, x, y)
                })
            })
            .flat()

        cells.map((cell) => cell.initialize(cells))
        cells.map((cell) => cell.calculateValue(cells))

        return new Schematic(cells)
    }

    get value() {
        return this.cells.reduce((prev, cell) => prev + cell.neighbourValues(this.cells), 0)
    }

    get gearRatio() {
        return this.cells.reduce((prev, cell) => prev + cell.gearRatio(this.cells), 0)
    }
}

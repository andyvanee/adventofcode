enum CellType {
    None,
    Number,
    Part,
}

export class Cell {
    type = CellType.None
    value = 0
    valueId = ''

    constructor(public symbol: string, public x: number, public y: number) {}

    get isGear() {
        return this.symbol == '*'
    }

    neighbours(cells: Cell[]) {
        return cells.filter((cell) => {
            if (cell.x == this.x && cell.y == this.y) return false
            if (Math.abs(cell.x - this.x) > 1) return false
            if (Math.abs(cell.y - this.y) > 1) return false
            return true
        })
    }

    neighbourValueCells(cells: Cell[]) {
        if (this.type != CellType.Part) return []
        const valueIds = new Set<string>()

        return this.neighbours(cells).filter((cell) => {
            if (cell.type != CellType.Number) return
            if (valueIds.has(cell.valueId)) return
            valueIds.add(cell.valueId)
            return true
        })
    }

    neighbourValues(cells: Cell[]) {
        return this.neighbourValueCells(cells).reduce((prev, current) => {
            return prev + current.value
        }, 0)
    }

    initialize(cells: Cell[]) {
        if (/\d/.exec(this.symbol)) this.type = CellType.Number
        else if ('.' == this.symbol) this.type = CellType.None
        else this.type = CellType.Part
    }

    calculateValue(cells: Cell[]) {
        if (this.type != CellType.Number) return

        const chars = [this.symbol]
        const rowNums = cells.filter((cell) => cell.type == CellType.Number && cell.y == this.y)
        let start = this.x
        let end = this.x
        let char = null

        while ((char = rowNums.find((c) => c.x == start - 1))) {
            chars.unshift(char.symbol)
            start--
        }

        while ((char = rowNums.find((c) => c.x == end + 1))) {
            chars.push(char.symbol)
            end++
        }

        this.valueId = `${start}|${end}|${this.y}`
        this.value = parseInt(chars.join(''))
    }

    gearRatio(cells: Cell[]) {
        if (!this.isGear) return 0
        const neighbourValueCells = this.neighbourValueCells(cells)
        if (neighbourValueCells.length != 2) return 0
        return neighbourValueCells[0].value * neighbourValueCells[1].value
    }
}

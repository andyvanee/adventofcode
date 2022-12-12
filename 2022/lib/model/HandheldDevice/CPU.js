import {sum} from '../../lib.js'
import {Screen} from './Screen.js'
class Instruction {
    delay = 0
    constructor(arg) {
        this.arg = arg
    }
    tick() {
        this.delay--
    }
    exec(_) {}
}
class ADDX_Instruction extends Instruction {
    delay = 2
    constructor(arg) {
        super(arg)
        this.arg = parseInt(this.arg, 10)
    }
    exec(cpu) {
        cpu.REGISTERS.X += this.arg
    }
}
class NOOP_Instruction extends Instruction {
    delay = 1
}

Instruction.fromString = str => {
    const match = /(\w+)\s*([-\d]*)?/.exec(str)
    if (!match) throw `no match ${str}`
    const [_, op, arg] = match
    return new {
        addx: ADDX_Instruction,
        noop: NOOP_Instruction,
    }[op](arg)
}

export class CPU {
    screen = new Screen()

    REGISTERS = {
        X: 1,
        CLK: 0,
    }
    instructions = []
    parseInstructions(str) {
        this.instructions = str
            .trim()
            .split('\n')
            .map(i => Instruction.fromString(i))
    }
    tick() {
        this.REGISTERS.CLK++
    }

    /**
     * @param {Screen} screen
     */
    attachScreen(screen) {
        this.screen = screen
    }
    get currentInstruction() {
        return this.instructions[0]
    }

    get xPosition() {
        return this.REGISTERS.CLK % 40
    }

    runTicks(untilTick = 0) {
        let instruction = this.currentInstruction
        while (this.REGISTERS.CLK < untilTick && instruction) {
            const pos = this.REGISTERS.CLK % 40
            const offset = this.REGISTERS.X - pos + 1
            this.screen.draw(offset > -1 && offset < 3 ? '#' : '.')
            this.screen.tick()
            this.tick()
            instruction.tick()

            if (instruction.delay <= 0) {
                instruction.exec(this)
                this.instructions.shift()
            }
            instruction = this.currentInstruction
        }
        return this
    }
    runTickSequence(numbers = []) {
        let output = []
        for (const number of numbers) {
            const targetDuringTick = number - 1
            this.runTicks(targetDuringTick)
            output.push(number * this.REGISTERS.X)
        }
        return output
    }
    sumOfTickSequence(numbers = []) {
        return sum(this.runTickSequence(numbers))
    }
}

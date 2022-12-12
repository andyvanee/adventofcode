import {sum} from '../../lib.js'

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
    get currentInstruction() {
        return this.instructions[0]
    }
    runTicks(untilTick = 0) {
        let instruction = this.currentInstruction
        while (this.REGISTERS.CLK < untilTick && instruction) {
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

export class Crate {
    id = '_'
    constructor(id) {
        this.id = id
    }
}

export class Stack {
    /** @type {Crate[]} */
    crates = []
}

export class Instruction {
    count = 0
    fromStack = 0
    toStack = 0

    constructor(count, fromStack, toStack) {
        Object.assign(this, {count, fromStack, toStack})
    }

    static fromString(stringInstruction) {
        const match = /move (\d+) from (\d+) to (\d+)/.exec(stringInstruction)
        if (!match) return
        const [_, count, fromStack, toStack] = match
        return new Instruction(parseInt(count), parseInt(fromStack) - 1, parseInt(toStack) - 1)
    }
}

export class LoadingDock {
    /** @type {Stack[]} */
    stacks = []

    /** @type {Instruction[]} */
    instructions = []

    get tops() {
        return this.stacks
            .map(stack => stack[0].id || '')
            .filter(x => x)
            .join('')
    }

    /**
     * @param {Mover} mover
     */
    exec(mover) {
        for (const instruction of this.instructions) {
            mover.exec(instruction, this)
        }
    }

    static fromString(spec) {
        const loadingDock = new LoadingDock()
        const [crateInput, instructions] = spec.split('\n\n')
        const crateInputLines = crateInput.split('\n')
        const count = crateInputLines.pop().trim().split(/\s+/).length
        loadingDock.stacks = [...new Array(count)].map(() => [])
        for (const line of crateInputLines) {
            for (const id in loadingDock.stacks) {
                const charPosition = id * 4 + 1
                const char = (line[charPosition] || '').trim()
                if (char) {
                    loadingDock.stacks[id].push(new Crate(char))
                }
            }
        }
        instructions.split('\n').map(stringInstruction => {
            const instruction = Instruction.fromString(stringInstruction)
            if (instruction) loadingDock.instructions.push(instruction)
        })
        return loadingDock
    }
}

class Mover {
    exec(instruction, loadingDock) {
        throw `Mover::exec not implemented ${this.constructor.name}`
    }
}

export class CrateMover9000 extends Mover {
    exec(instruction, loadingDock) {
        for (let i = 0; i < instruction.count; i++) {
            const crate = loadingDock.stacks[instruction.fromStack].shift()
            loadingDock.stacks[instruction.toStack].unshift(crate)
        }
    }
}

export class CrateMover9001 extends Mover {
    exec(instruction, loadingDock) {
        const tempStack = []
        for (let i = 0; i < instruction.count; i++) {
            const crate = loadingDock.stacks[instruction.fromStack].shift()
            tempStack.unshift(crate)
        }
        for (const crate of tempStack) {
            loadingDock.stacks[instruction.toStack].unshift(crate)
        }
    }
}

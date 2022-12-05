import {CrateMover9000, LoadingDock} from './LoadingDock.js'
import {example, puzzleInput} from '../../day_05/data/index.js'

describe('LoadingDock', () => {
    describe('fromString', () => {
        describe('example', () => {
            const loadingDock = LoadingDock.fromString(example)
            test('stacks', () => {
                expect(loadingDock.stacks.length).toBe(3)
                expect(loadingDock.stacks[0].length).toBe(2)
                expect(loadingDock.stacks[1].length).toBe(3)
                expect(loadingDock.stacks[2].length).toBe(1)
                expect(loadingDock.stacks[0][0].id).toBe('N')
            })
            test('tops', () => {
                expect(loadingDock.tops).toBe('NDP')
            })
            test('instructions', () => {
                expect(loadingDock.instructions.length).toBe(4)
                expect(loadingDock.instructions[1].count).toBe(3)
                expect(loadingDock.instructions[1].fromStack).toBe(0)
                expect(loadingDock.instructions[1].toStack).toBe(2)
            })
            test('exec', () => {
                const dock = LoadingDock.fromString(example)
                const mover = new CrateMover9000()
                dock.exec(mover)
                expect(dock.tops).toBe('CMZ')
            })
        })
        describe('puzzleInput', () => {
            const loadingDock = LoadingDock.fromString(puzzleInput)

            test('stacks', () => {
                expect(loadingDock.stacks.length).toBe(9)
                expect(loadingDock.stacks[0].length).toBe(4)
                expect(loadingDock.stacks[7].length).toBe(3)
                expect(loadingDock.stacks[0][0].id).toBe('V')
            })

            test('instructions', () => {
                expect(loadingDock.instructions.length).toBe(502)
                expect(loadingDock.instructions[10].count).toBe(24)
                expect(loadingDock.instructions[10].fromStack).toBe(1)
                expect(loadingDock.instructions[10].toStack).toBe(2)
            })
        })
    })
})

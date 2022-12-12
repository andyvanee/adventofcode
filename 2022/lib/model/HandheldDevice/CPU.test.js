import {crt, example} from '../../../day_10/data/index.js'
import {HandheldDevice} from '../HandheldDevice.js'
import {CPU} from './CPU.js'

const sampleOutput1 = `
.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#
........................................
.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#
........................................
.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#
........................................
`.trim()

describe('CPU', () => {
    test('instruction parsing', () => {
        const device = new HandheldDevice()
        device.cpu.parseInstructions('noop\naddx 3\naddx -5')
        expect(device.cpu.instructions.length).toBe(3)
        expect(device.cpu.instructions[0].constructor.name).toBe('NOOP_Instruction')
    })

    describe('example', () => {
        /** @type {CPU} */
        let cpu = new HandheldDevice().cpu

        beforeEach(() => {
            cpu = new HandheldDevice().cpu
            cpu.parseInstructions(example)
        })
        test('instructions', () => {
            expect(cpu.instructions.length).toBe(146)
        })
        test('tick', () => {
            cpu.runTicks(20)
            expect(cpu.REGISTERS.X).toBe(21)
        })
        test('tickSequence', () => {
            const seq = cpu.runTickSequence([20, 60, 100, 140, 180, 220])
            expect(seq[0]).toBe(420)
            expect(seq[5]).toBe(3960)
        })
        test('sumOfTickSequence', () => {
            const sum = cpu.sumOfTickSequence([20, 60, 100, 140, 180, 220])
            expect(sum).toBe(13140)
        })
        test('screen random drawing', () => {
            expect(cpu.screen.output[0][0]).toBe('.')
            expect(cpu.screen.output[5][0]).toBe('.')
            expect(cpu.screen.output[5][39]).toBe('.')
            ;[...new Array(6)].map((_, row) =>
                [...new Array(40)].map((_, col) => {
                    cpu.screen.tick()
                    cpu.screen.draw(row % 2 == 0 && col % 2 == 0 ? '#' : '.')
                })
            )
            expect(cpu.screen.toString()).toBe(sampleOutput1)
        })

        test('screen drawing', () => {
            cpu.runTicks(Infinity)
            expect(cpu.screen.toString()).toBe(crt)
        })
    })
})

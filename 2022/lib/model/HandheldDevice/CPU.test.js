import {example} from '../../../day_10/data/index.js'
import {HandheldDevice} from '../HandheldDevice.js'

describe('CPU', () => {
    test('instruction parsing', () => {
        const device = new HandheldDevice()
        device.cpu.parseInstructions('noop\naddx 3\naddx -5')
        expect(device.cpu.instructions.length).toBe(3)
        expect(device.cpu.instructions[0].constructor.name).toBe('NOOP_Instruction')
    })
    describe('example', () => {
        const device = new HandheldDevice()
        const {cpu} = device
        cpu.parseInstructions(example)
        test('instructions', () => {
            expect(cpu.instructions.length).toBe(146)
        })
        test('tick', () => {
            cpu.runTicks(20)
            expect(cpu.REGISTERS.X).toBe(21)
        })
        test('tickSequence', () => {
            const device = new HandheldDevice()
            const {cpu} = device
            cpu.parseInstructions(example)
            const seq = cpu.runTickSequence([20, 60, 100, 140, 180, 220])
            expect(seq[0]).toBe(420)
            expect(seq[5]).toBe(3960)
        })
        test('sumOfTickSequence', () => {
            const device = new HandheldDevice()
            const {cpu} = device
            cpu.parseInstructions(example)
            const sum = cpu.sumOfTickSequence([20, 60, 100, 140, 180, 220])
            expect(sum).toBe(13140)
        })
    })
})

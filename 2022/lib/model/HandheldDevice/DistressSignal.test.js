import {example} from '../../../day_13/data/index.js'
import {DistressSignal, Packet, PacketPair} from './DistressSignal.js'

describe('Packet', () => {
    describe('fromString', () => {
        test('[]', () => {
            const p = Packet.fromString('[]')
            expect(p.values.length).toBe(0)
        })
        test('[1]', () => {
            const p = Packet.fromString('[1]')
            expect(p.values.length).toBe(1)
            expect(p.values[0]).toBe(1)
        })
        test('[1, [2]]', () => {
            const p = Packet.fromString('[1, [2]]')
            expect(p.values.length).toBe(2)
        })
        test('[[1], [2]]', () => {
            const p = Packet.fromString('[[1], [2]]')
            expect(p.values.length).toBe(2)
        })
        test('[[1], 2]', () => {
            const p = Packet.fromString('[[1], 2]')
            expect(p.values.length).toBe(2)
            expect(p.values[0].values[0]).toBe(1)
            expect(p.values[1]).toBe(2)
        })
    })
})

describe('PacketPair', () => {
    describe('fromString', () => {
        test('[]\n[]', () => {
            const pp = PacketPair.fromString('[]\n[]', 1)
            expect(pp.index).toBe(1)
        })
        test('[1]\n[1]', () => {
            const pp = PacketPair.fromString('[1]\n[1]', 1)
            expect(pp.index).toBe(1)
            expect(pp.ordered).toBe(true)
        })
        test('[2]\n[1]', () => {
            const pp = PacketPair.fromString('[2]\n[1]', 1)
            expect(pp.index).toBe(1)
            expect(pp.ordered).toBe(false)
        })
        test('[1, 1]\n[1]', () => {
            const pp = PacketPair.fromString('[1, 1]\n[1]', 1)
            expect(pp.index).toBe(1)
            expect(pp.ordered).toBe(false)
        })
        test('[1,1,3,1,1]\n[1,1,5,1,1]', () => {
            const pp = PacketPair.fromString('[1,1,3,1,1]\n[1,1,5,1,1]', 1)
            expect(pp.ordered).toBe(true)
        })
        test('[[[]]]\n[[]]', () => {
            const pp = PacketPair.fromString('[[[]]]\n[[]]', 1)
            expect(pp.ordered).toBe(false)
        })
        test('[[],[],[]]\n[[2,8],[],[9]]', () => {
            const pp = PacketPair.fromString('[[],[],[]]\n[[2,8],[],[9]]', 1)
            expect(pp.ordered).toBe(true)
        })
        test('[3,2,1,7,4]\n[3,2,1,7]', () => {
            const pp = PacketPair.fromString('[3,2,1,7,4]\n[3,2,1,7]', 1)
            expect(pp.ordered).toBe(false)
        })
        test('[3,2,1,7]\n[3,2,1,7,4]', () => {
            const pp = PacketPair.fromString('[3,2,1,7]\n[3,2,1,7,4]', 1)
            expect(pp.ordered).toBe(true)
        })
        test('[[1],2,1,[[7]]]\n[1,2,1,7]', () => {
            const pp = PacketPair.fromString('[[1],2,1,[[[7]]]]\n[1,2,1,7]', 1)
            expect(pp.ordered).toBe(true)
        })
        test('[1,2,1,7\n[[[1]],2,1,[[7]]]', () => {
            const pp = PacketPair.fromString('[1,2,1,7]\n[[[1]],2,1,[[7]]]', 1)
            expect(pp.ordered).toBe(true)
        })
        test('[[1,3],[9]]\n[[3,4],[8]]', () => {
            const pp = PacketPair.fromString('[[1,3],[9]]\n[[3,4],[8]]', 1)
            expect(pp.ordered).toBe(true)
        })
    })
})

describe('DistressSignal', () => {
    test('fromString', () => {
        const signal = DistressSignal.fromString(example)
        expect(signal.pairs[0].ordered).toBe(true)
        expect(signal.pairs[1].ordered).toBe(true)
        expect(signal.pairs[2].ordered).toBe(false)
        expect(signal.pairs[3].ordered).toBe(true)
        expect(signal.pairs[4].ordered).toBe(false)
        expect(signal.pairs[5].ordered).toBe(true)
        expect(signal.pairs[6].ordered).toBe(false)
        expect(signal.pairs[7].ordered).toBe(false)
    })

    test('sumCorrect', () => {
        const signal = DistressSignal.fromString(example)
        expect(signal.sumCorrect).toBe(13)
    })
})

import {example} from '../../day_09/data/index.js'
import {Rope} from './Rope.js'

describe('Rope', () => {
    test('constructor', () => {
        const rope = new Rope()
        expect(rope.head.x).toBe(0)
        expect(rope.head.y).toBe(0)
    })

    test('adjacentTo', () => {
        const rope = new Rope()
        expect(rope.head.adjacentTo(rope.tail)).toBe(true)
        rope.head.move(1, 0)
        expect(rope.head.adjacentTo(rope.tail)).toBe(true)
        rope.head.move(1, 0)
        expect(rope.head.adjacentTo(rope.tail)).toBe(false)
    })

    test('go / follow', () => {
        const rope = new Rope()
        expect(rope.head.adjacentTo(rope.tail)).toBe(true)
        rope.go(1, 0) // 1,0
        expect(rope.head.adjacentTo(rope.tail)).toBe(true)
        rope.go(1, 0) // 2,0
        expect(rope.tail.x).toBe(1)
        expect(rope.tail.y).toBe(0)
        rope.go(0, 1) // 2,1
        expect(rope.tail.x).toBe(1)
        expect(rope.tail.y).toBe(0)
        rope.go(0, 1) // 3,1
        expect(rope.tail.x).toBe(2)
        expect(rope.tail.y).toBe(1)
    })

    test('readInstructions', () => {
        const rope = new Rope()
        rope.readInstructions(example)
        expect(rope.instructions.length).toBe(8)
        expect(rope.instructions[0].direction.x).toBe(1)
        expect(rope.instructions[0].direction.y).toBe(0)
        expect(rope.instructions[0].steps).toBe(4)
    })

    test('exec', () => {
        const rope = new Rope()
        rope.readInstructions(example)
        rope.exec()
        expect(rope.head.x).toBe(2)
        expect(rope.head.y).toBe(-2)
        expect(rope.tail.x).toBe(1)
        expect(rope.tail.y).toBe(-2)
    })

    test('tailVisited', () => {
        const rope = new Rope()
        rope.readInstructions(example)
        rope.exec()
        expect(rope.tailVisited).toBe(13)
    })
})

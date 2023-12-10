import { expect, test } from 'bun:test'
import { Game } from './Game'

const input = await Bun.file('./day-02/input.txt').text()
const sampleA = await Bun.file('./day-02/sampleA.txt').text()

test('Game::fromString', () => {
    const game = Game.fromString('Game 1: 12 red')
    expect(game.id).toBe('1')
    expect(game.red).toBe(12)
    expect(game.green).toBe(0)
    expect(game.blue).toBe(0)
})

test('Game::fromString', () => {
    const game = Game.fromString('Game 1: 12 red; 18 red, 12 blue')
    expect(game.id).toBe('1')
    expect(game.red).toBe(18)
    expect(game.green).toBe(0)
    expect(game.blue).toBe(12)
})

test('day02Sample', () => {
    const source = new Game('', { red: 12, green: 13, blue: 14 })
    const lines = sampleA.split('\n').filter((line) => line.length)
    const games = lines.map((line) => Game.fromString(line))
    expect(games[0].id).toBe('1')
    expect(games[0].blue).toBe(6)
    expect(games[0].possibleFromGame(source)).toBe(true)
    expect(games[2].possibleFromGame(source)).toBe(false)
    expect(source.sumOfPossible(games)).toBe(8)
})

test('day02input', () => {
    const source = new Game('', { red: 12, green: 13, blue: 14 })
    const lines = input.split('\n').filter((line) => line.length)
    const games = lines.map((line) => Game.fromString(line))
    expect(source.sumOfPossible(games)).toBe(2679)
})

import { expect, test } from 'bun:test'
import { Game, sumOfPowers } from './Game'

const input = await Bun.file('./day-02/input.txt').text()
const sampleA = await Bun.file('./day-02/sample.txt').text()

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

test('Game::possibleFromGame', () => {
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

test('Game::power sample', () => {
    const lines = sampleA.split('\n').filter((line) => line.length)
    const games = lines.map((line) => Game.fromString(line))
    expect(games[0].power).toBe(48)
    expect(games[1].power).toBe(12)
    expect(games[2].power).toBe(1560)
    expect(games[3].power).toBe(630)
    expect(games[4].power).toBe(36)
})

test('sumOfPowers', () => {
    const lines = sampleA.split('\n').filter((line) => line.length)
    const games = lines.map((line) => Game.fromString(line))
    expect(sumOfPowers(games)).toBe(2286)
})

test('day02.1 input', () => {
    const lines = input.split('\n').filter((line) => line.length)
    const games = lines.map((line) => Game.fromString(line))
    expect(sumOfPowers(games)).toBe(77607)
})

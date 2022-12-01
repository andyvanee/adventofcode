import {readFile} from "node:fs/promises"

const puzzleInput = await readFile('day_01.txt', {encoding: 'utf-8'})

const inventories = puzzleInput.split("\n\n").map(lines => {
    return lines.split("\n")
        .filter(x => x)
        .map(x => parseInt(x))
        .reduce((prev, current) => prev + current, 0)
})
    .map((value, id) => ({id, value}))
    .sort((a, b) => a.value > b.value ? -1: 1)


const calories = inventories.slice(0, 3).reduce((prevItem, currentItem) => {
    return prevItem + currentItem.value
}, 0)

console.log({calories})

import {readFile} from "node:fs/promises"

const puzzleInput = await readFile('day_01.txt', {encoding: 'utf-8'})

const inventories = puzzleInput.split("\n\n").map(lines => {
    return lines.split("\n")
        .filter(x => x)
        .map(x => parseInt(x))
        .reduce((prev, current) => prev + current, 0)
})

const maxElfCalories = inventories.reduce((prevItem, value, id) => {
    const currentItem = {id, value};
    return (currentItem.value > prevItem.value) ? currentItem : prevItem
}, {id: 0, value: -Infinity})

console.log({maxElfCalories})

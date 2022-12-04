import {Elf, ElfGroup, Food} from '../lib/index.js'

export const part1 = (puzzleInput) => {
    const group = new ElfGroup()

    {
        let id = 0

        for (const lines of puzzleInput.split('\n\n')) {
            const elf = new Elf()
            elf.id = ++id
            for (const calories of lines.split('\n').filter((x) => x)) {
                const food = new Food({
                    name: 'Tofu',
                    calories: parseInt(calories, 10),
                })
                elf.inventory.food.push(food)
            }
            group.add(elf)
        }
    }

    const elf = group.sortByCalories()[0]

    return elf.totalCalories
}

export const part2 = (puzzleInput) => {
    const inventories = puzzleInput
        .split('\n\n')
        .map((lines) => {
            return lines
                .split('\n')
                .filter((x) => x)
                .map((x) => parseInt(x))
                .reduce((prev, current) => prev + current, 0)
        })
        .map((value, id) => ({id, value}))
        .sort((a, b) => (a.value > b.value ? -1 : 1))

    const calories = inventories.slice(0, 3).reduce((prevItem, currentItem) => {
        return prevItem + currentItem.value
    }, 0)

    return calories
}

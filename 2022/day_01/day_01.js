import {readFile, Elf, ElfGroup, Food} from '../lib/index.js'

const puzzleInput = await readFile('day_01.txt')

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

console.log(`${elf}`)

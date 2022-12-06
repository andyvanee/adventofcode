import {readFile} from '../../lib/lib.js'

const day = 'day_06'
const example = await readFile(`${day}/data/example.txt`)
const puzzleInput = await readFile(`${day}/data/${day}.txt`)

export {example, puzzleInput}

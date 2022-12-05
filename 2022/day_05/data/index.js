import {dirname, parse} from 'node:path'
import {readFile} from '../../lib/lib.js'

const day = 'day_05'
const example = await readFile(`${day}/data/example.txt`)
const puzzleInput = await readFile(`${day}/data/${day}.txt`)

export {example, puzzleInput}

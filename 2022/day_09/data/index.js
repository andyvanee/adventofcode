import {readFile} from '../../lib/lib.js'

const day = 'day_09'
const example = await readFile(`${day}/data/example.txt`)
const data = await readFile(`${day}/data/data.txt`)

export {example, data}

import {readFile} from '../../lib/lib.js'

const day = 'day_11'
const example = (await readFile(`${day}/data/example.txt`)).trim()
const data = (await readFile(`${day}/data/data.txt`)).trim()

export {example, data}

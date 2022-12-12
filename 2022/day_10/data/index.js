import {readFile} from '../../lib/lib.js'

const day = 'day_10'
const example = await readFile(`${day}/data/example.txt`)
const data = await readFile(`${day}/data/data.txt`)
const crt = (await readFile(`${day}/data/crt.txt`)).trim()

export {example, data, crt}

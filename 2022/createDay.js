import {stat, mkdir, writeFile} from 'node:fs/promises'
import {argv} from 'node:process'
import {join, dirname} from 'node:path'

const __filename = new URL(import.meta.url).pathname
const __dirname = dirname(__filename)
const day = argv.pop()

if (!day.startsWith('day_')) {
    throw new Error('day should match "day_*"')
}
const dayDir = join(__dirname, day)

const write = async (path, content) => {
    const filePath = join(dayDir, path)
    await writeFile(filePath, `${content.trim()}\n`, {encoding: 'utf-8'})
}

class DirectoryExistsError extends Error {}

try {
    const dirStat = await stat(dayDir)
    if (dirStat.isFile() || dirStat.isDirectory()) {
        throw new DirectoryExistsError(`Directory exists: ${dayDir}`)
    }
} catch (err) {
    if (err instanceof DirectoryExistsError) {
        throw err
    }
    // Dir/file does not exist - this is the happy path
    console.log(`Creating directory ${dayDir}`)
    await mkdir(dayDir)
    await mkdir(join(dayDir, 'data'))
}

write('data/data.txt', '')
write('data/example.txt', '')
write(
    'data/index.js',
    `
import {readFile} from '../../lib/lib.js'

const day = '${day}'
const example = await readFile(\`\$\{day\}/data/example.txt\`)
const data = await readFile(\`\$\{day\}/data/data.txt\`)

export {example, data}
`
)

write(
    'index.js',
    `
/**
 * Solution for part 1
 * @param {string} puzzleInput
* @returns {string}
 */
export const part1 = puzzleInput => {
    return '';
}

/**
 * Solution for part 2
 * @param {string} puzzleInput
* @returns {string}
 */
export const part2 = puzzleInput => {
    return '';
}
`
)

write(
    'test.js',
    `
import {part1, part2} from './index.js'
import {example, data} from './data/index.js'

describe('${day}', () => {
    describe('part 1', () => {
        test.skip('example', async () => {
            expect(part1(example)).toBe(true)
        })
        test.skip('data', async () => {
            expect(part1(data)).toBe(true)
        })
    })

    describe('part 2', () => {
        test.skip('example', async () => {
            expect(part2(example)).toBe(true)
        })
        test.skip('data', async () => {
            expect(part2(data)).toBe(true)
        })
    })
})
`
)
